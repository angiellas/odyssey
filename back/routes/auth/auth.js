require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const connection = require("../../helpers/db");
const bcrypt = require("bcrypt");
const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = process.env;

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(passport.initialize());

router.post("/signup", function (req, res, next) {
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    name: req.body.name,
    lastname: req.body.lastname,
  };

  connection.query(
    "INSERT INTO users (email, password, name, lastname) VALUES(?,?,?,?)",
    [user.email, user.password, user.lastname, user.name],
    function (error, results, fields) {
      if (error) {
        console.log(error);
        res.status(500).json({ flash: error.message });
        // res.status(500).send("Error in in login");
      } else {
        res.status(200).send(user);
        res.end();
      }
    }
  );
});

passport.use(
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    (email, password, done) => {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        [email],
        (error, results, fields) => {
          const foundUser = results[0];
          if (!foundUser) {
            return done(null, false, {
              message: "Can't find a user with this email",
            });
          }

          bcrypt
            .compare(password, foundUser.password)
            .then((isPasswordCorrect) => {
              if (isPasswordCorrect) {
                done(null, foundUser);
              } else {
                done(null, false, { message: "Wrong password" });
              }
            })
            .catch((error) => console.error(`Compare error: ${error}`));
        }
      );
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    },
    (jwtPayLoad, done) => {
      connection.query(
        "SELECT * FROM users WHERE email = ?",
        [jwtPayLoad.email],
        (error, results) => {
          if (error) {
            return done(error);
          }
          const user = results[0];
          return done(null, user);
        }
      );
    }
  )
);

router.post("/signin", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.status(500).send(err);
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }

    const token = jwt.sign(
      JSON.stringify(user),
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.status(200).send({ user, token });
  })(req, res, next);
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.status(200).send(req.user);
  }
);

module.exports = router;
