import React, { Fragment } from "react";

import "./cardstats.css";

const CardStats = props => {
  const styles = {
    percent: {
      color: props.colored,
      fontWeight: 500
    },
    statsColor: {
      color: props.statsColor
    }
  };

  return (
    <Fragment>
      <div className="cardStats ml-auto mr-auto">
        <div className="cardTitle">
          {props.title}
          <div className="ml-auto" style={styles.percent}>
            {props.percent}%
          </div>
        </div>
        <div className="cardValue m-auto" style={styles.statsColor}>
          {props.value}
        </div>
      </div>
    </Fragment>
  );
};

export default CardStats;
