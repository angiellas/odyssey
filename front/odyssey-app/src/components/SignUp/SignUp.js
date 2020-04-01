import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { SnackbarContent } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import "./signup.css";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordconf: "",
      flash: "",
      signup: false
    };
  }

  handleFirstNameChange = e => {
    this.setState({
      firstname: e.target.value
    });
  };

  handleLastNameChange = e => {
    this.setState({
      lastname: e.target.value
    });
  };

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

  handlePassConfChange = e => {
    this.setState({
      passwordconf: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    fetch("/auth/signup", {
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

  setSignUp = () => {
    this.setState({ signup: true });
  };

  renderSignUp = () => {
    if (this.state.signup) {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div className="signup">
        <div className="signup-content">
          <h1>Sign up</h1>
          <form onSubmit={this.handleSubmit} className="form">
            <TextField
              type="text"
              id="firstname"
              label="First Name"
              name="firstname"
              fullWidth
              onChange={this.handleFirstNameChange}
              value={this.state.firstname}
            />

            <TextField
              type="text"
              id="lastname"
              label="Last Name"
              name="lastname"
              fullWidth
              onChange={this.handleLastNameChange}
              value={this.state.lastname}
            />
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

            <TextField
              type="password"
              id="passwordconf"
              label="Confirm Password"
              name="passwordconf"
              fullWidth
              onChange={this.handlePassConfChange}
              value={this.state.passwordconf}
            />
            <div className="submitbutton">
              {this.renderSignUp()}
              <Button
                variant="contained"
                color="primary"
                onClick={this.setSignUp}
              >
                Register
              </Button>
            </div>
            <div className="submitbutton">
              <Link to="/signin">
                <Button variant="contained" color="primary">
                  Sign in
                </Button>
              </Link>
            </div>
          </form>

          <div className="snackbar">
            {this.state.flash ? (
              <SnackbarContent
                anchorOrigin={"bottom, center"}
                message={this.state.flash}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
