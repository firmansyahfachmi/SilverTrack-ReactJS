import React, { Component, Fragment } from "react";

import "./gamecard.css";

class GameCard extends Component {
  render() {
    return (
      <Fragment>
        <div className="gcard">
          <div className="gimg"></div>
          <div className="gtitle">Game</div>
        </div>
      </Fragment>
    );
  }
}

export default GameCard;
