import React, { Fragment } from "react";

import "./cardstats.css";

const CardStats = props => {
  return (
    <Fragment>
      <div className="cardStats">
        <div className="cardTitle">TITLE</div>
        <div className="cardValue m-auto">1000</div>
      </div>
    </Fragment>
  );
};

export default CardStats;
