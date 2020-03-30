import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordconf: "",
      flash: ""
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

  render() {
    return (
      <div>
        <h1>{JSON.stringify(this.state)}</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            id="firstname"
            name="firstname"
            onChange={this.handleFirstNameChange}
            value={this.state.firstname}
          />

          <input
            type="text"
            id="lastname"
            name="lastname"
            onChange={this.handleLastNameChange}
            value={this.state.lastname}
          />
          <input
            type="email"
            id="email"
            name="email"
            onChange={this.handleEmailChange}
            value={this.state.email}
          />

          <input
            type="password"
            id="password"
            name="password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />

          <input
            type="password"
            id="passwordconf"
            name="passwordconf"
            onChange={this.handlePassConfChange}
            value={this.state.passwordconf}
          />

          <input type="submit" value="Submit" />
        </form>
        {this.state.flash && <p>{this.state.flash}</p>}
      </div>
    );
  }
}
