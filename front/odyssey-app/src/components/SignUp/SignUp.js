import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      passwordconf: ""
    };
    this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    this.handleLastNameChange = this.handleLastNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handlePassConfChange = this.handlePassConfChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    console.log(`A subscription was submitted: ${JSON.stringify(this.state)}`);
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <h1>{JSON.stringify(this.state)}</h1>
        <form>
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

          <button onClick={this.handleSubmit}>Sign up</button>
        </form>
      </div>
    );
  }
}
