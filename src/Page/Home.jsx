import React, { Component } from "react";
import "./page.css";

import GameCard from "../Components/GameCard/GameCard";

class Home extends Component {
  render() {
    return (
      <div className="home">
        <div className="news col-lg-11"></div>
        <div className="cardContainer col-lg-11">
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
        </div>
      </div>
    );
  }
}

export default Home;
