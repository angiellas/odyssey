import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../SignUp/signup.css";

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      redirect: false
    };
  }

  handleEmailChange = e => {
    this.setState({
      email: e.target.value
    });
  };

  handlePasswordChange = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("/auth/signin", {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json"
      }),
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(
        res => this.setState({ flash: res.flash }),
        err => this.setState({ flash: err.flash })
      );
  };

  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/profile" />;
    }
  };

  render() {
    return (
      <div className="signup">
        <div className="signup-content">
          <h1>Sign In</h1>
          <form onSubmit={this.handleSubmit} className="form">
            <TextField
              type="email"
              id="email"
              label="Email"
              name="email"
              fullWidth
              onChange={this.handleEmailChange}
              value={this.state.email}
            />

            <TextField
              type="password"
              id="password"
              label="Password"
              name="password"
              fullWidth
              onChange={this.handlePasswordChange}
              value={this.state.password}
            />
            <div className="submitbutton">
              {this.renderRedirect()}
              <Button
                variant="contained"
                color="primary"
                onClick={this.setRedirect}
              >
                Sign in
              </Button>
            </div>
            <div className="submitbutton">
              <Link to="/signup">
                <Button variant="contained" color="primary">
                  Register
                </Button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
