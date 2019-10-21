import React, { Component } from "react";
import { Button } from "react-bootstrap";

import firebase from "firebase";
import "./page.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      formData: {}
    };
  }

  handleForm = event => {
    let formData = { ...this.state.formData };
    formData[event.target.name] = event.target.value;
    this.setState({
      formData
    });
  };

  handleSubmit = () => {
    const { formData } = this.state;
    const validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gim;
    let checkEmail = formData.email.match(validEmail);
    if (checkEmail == null) {
      alert("Email not valid");
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(result => {
          localStorage.setItem("userId", result.user.uid);
          localStorage.setItem("username", result.user.displayName);
          alert("Login Success");
          window.location = "/";
        });
    }
  };

  render() {
    return (
      <div className="login">
        <div className="modalContain col-lg-6">
          <div className="title1">SilverTracker Login</div>
          <div className="title2">Login with your SilverTracker account</div>
          <div className="modalLogin col-lg-9">
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
            <Button
              block
              className="col-lg-7 butLogin"
              onClick={this.handleSubmit}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
