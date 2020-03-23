import React, { Component } from "react";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
    this.onChange = this.updateEmailField.bind(this);
  }

  updateEmailField = e => {
    this.setState({
      email: e.target.value
    });
  };

  render() {
    return (
      <div>
        <h1>{this.state.email}</h1>
        <input
          type="email"
          id="email"
          name="email"
          onChange={this.updateEmailField}
          value={this.state.email}
        />

        <button>Sign up</button>
      </div>
    );
  }
}
