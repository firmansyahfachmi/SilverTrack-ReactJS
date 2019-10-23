import React, { Component } from "react";
import { Spinner, Row } from "react-bootstrap";

import "./page.css";

import firebase from "firebase";

import GameCard from "../Components/GameCard/GameCard";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      category: {},
      isLoading: true
    };
  }

  componentDidMount = async () => {
    firebase
      .database()
      .ref("category")
      .once("value", value => {
        let data = value.val();
        this.setState({ category: data });
        this.setState({ isLoading: false });
      });
  };

  render() {
    const { category, isLoading } = this.state;
    let data = Object.values(category);
    return (
      <div className="home">
        <div className="news col-lg-12 p-0">
          <Row>
            <div className="landing ml-auto mr-auto">RAISE YOUR PERFORMA</div>
          </Row>
          <Row className="mt-2">
            <div className=" m-auto sub">Tracking over 100 million players</div>
          </Row>
        </div>
        {isLoading === false ? (
          <div className="cardContainer col-lg-11 mb-3 pb-3">
            {data.map((item, index) => (
              <GameCard key={index} data={item} />
            ))}
          </div>
        ) : (
          <div className="loading mt-5">
            <Spinner animation="grow" variant="info" />
          </div>
        )}
      </div>
    );
  }
}

export default Home;
