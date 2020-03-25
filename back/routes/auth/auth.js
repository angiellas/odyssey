const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post("/signup", function(req, res, next) {
  res.send("I am in POST signup");
});

module.exports = router;
