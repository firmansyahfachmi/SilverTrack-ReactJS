import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import "./gamecard.css";

const GameCard = props => {
  return (
    <Fragment>
      <Link to={"/" + props.data.slug} style={{ textDecoration: "none" }}>
        <div className="gcard">
          <div className="gimg">
            <img
              src={props.data.image}
              alt={props.data.name}
              className="catimage"
            />
          </div>
          <div className="gtitle">{props.data.name}</div>
        </div>
      </Link>
    </Fragment>
  );
};

export default GameCard;
