import React, { Fragment } from "react";

import CardStats from "../CardStats/CardStats";

import "./cardLegend.css";

const CardLegend = props => {
  let metadata = props.data.metadata;
  let stats = Object.values(props.data.stats);

  console.log("ps", stats);
  return (
    <Fragment>
      <div className="ml-auto mr-auto cardLegend mb-3 col-lg-10 p-3">
        <div className="outerImg col-lg-2 p-0">
          <div className="ImgContainer col-lg-12">
            <img
              src={metadata.imageUrl}
              alt={metadata.name}
              className="imgLegend"
            />
          </div>
          <div className="legendName col-lg-12">{metadata.name}</div>
        </div>
        <div className="col-lg-10 pl-0 ml-3 statContainer">
          {stats.map((item, index) => (
            <CardStats
              statsColor="whitesmoke"
              colored="#ed2828"
              key={index}
              title={item.displayName}
              value={item.displayValue}
              percent={item.percentile}
            />
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default CardLegend;
