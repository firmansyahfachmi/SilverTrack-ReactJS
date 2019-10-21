import React, { Component } from "react";
import { Button } from "react-bootstrap";

import firebase from "firebase";

import "./page.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      formData: {},
      rePassword: ""
    };
  }

  handleForm = event => {
    let formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;
    this.setState({
      formData
    });
  };

  handleRePass = event => {
    this.setState({
      rePassword: event.target.value
    });
  };

  handleSubmit = () => {
    const { formData, rePassword } = this.state;
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
    let checkEmail = formData.email.match(validEmail);
    if (formData.username.length < 6) {
      alert("Username must be 6 characters long");
    } else if (checkEmail == null) {
      alert("Email must valid");
    } else if (formData.password.length < 8) {
      alert("Password must be 8 characters long");
    } else if (formData.password !== rePassword) {
      alert("Confirmation Password not match");
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(async ({ user }) => {
          //   setLoading(false);
          await firebase.auth().currentUser.updateProfile({
            displayName: formData.username
          });
          await firebase
            .database()
            .ref(`users/${user.uid}`)
            .set({
              uid: user.uid,
              username: formData.username,
              email: formData.email
            })
            .then(() => {
              alert("succesfuly Registered");
              window.location = "/login";
            });
        });
    }
  };

  render() {
    return (
      <div className="login">
        <div className="modalContain col-lg-6">
          <div className="title1">SilverTracker Register</div>
          <div className="title2">Just need one SilverTracker account</div>
          <div className="modalRegister col-lg-9">
            <input
              type="text"
              placeholder="Username"
              name="username"
              className="p-2 col-lg-10 inputLogin"
              onChange={this.handleForm}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="p-2 col-lg-10 inputLogin"
              onChange={this.handleForm}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="p-2 col-lg-10 inputLogin"
              onChange={this.handleForm}
            />
            <input
              type="password"
              name="rePassword"
              placeholder="Confirm Password"
              className="p-2 col-lg-10 inputLogin"
              onChange={this.handleRePass}
            />
            <Button
              block
              className="col-lg-7 butLogin"
              onClick={this.handleSubmit}
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
