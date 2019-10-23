import React, { Component } from "react";
import { Row, Col, Button, Spinner } from "react-bootstrap";

import firebase from "firebase";

import "./page.css";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      user: {},
      isLoading: true
    };
  }

  componentDidMount = async () => {
    firebase.auth().onAuthStateChanged(user => {
      firebase
        .database()
        .ref("users/" + user.uid)
        .once("value", value => {
          let data = value.val();
          this.setState({ user: data });
        })
        .then(() => {
          this.setState({ isLoading: false });
        });
    });
  };

  logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        localStorage.removeItem("userId");
        localStorage.removeItem("username");
        window.location = "/";
      });
  };

  render() {
    const { user, isLoading } = this.state;
    return (
      <div className="profile">
        {isLoading === false ? (
          <>
            <Row className="profileTitle col-lg-8 mt-4">My Profile</Row>
            <Row className="profileContainer col-lg-8">
              <Col className="img col-lg-3 p-0">
                <img
                  src={user.photo}
                  alt="profileimage"
                  className="profileImg m-auto"
                />
              </Col>
              <Col className="desc col-lg-8">
                <div className="nameTitle">{user.username}</div>
                <div className="emailSub">{user.email}</div>
              </Col>
            </Row>
            <Row className="logout col-lg-8">
              <div className="logDiv col-lg-12">
                <Button variant="outline-danger" onClick={this.logout}>
                  Logout
                </Button>
              </div>
            </Row>
          </>
        ) : (
          <div className="loading">
            <Spinner animation="grow" variant="info" />
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
