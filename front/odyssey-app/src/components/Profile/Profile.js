import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import "../SignUp/signup.css";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {
        email: "",
        firstname: "",
        lastname: ""
      }
    };
  }
  render() {
    return (
      <div className="profile">
        <h1>This is your profile, {this.state.profile.firstname}</h1>
        <List>
          <ListItem>
            <ListItemText
              primary="Name"
              secondary={this.state.profile.firstname}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Last Name"
              secondary={this.state.profile.lastname}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Email"
              secondary={this.state.profile.email}
            />
          </ListItem>
        </List>
        <div className="submitbutton">
          <Link to="/signin">
            <Button variant="contained" color="primary">
              Sign Out
            </Button>
          </Link>
        </div>
      </div>
    );
  }
}

export default Profile;
