import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";

import "./trackercsgo.css";

import { connect } from "react-redux";
import { getCsgoPlayer } from "../Redux/Action/csgo";

import CardStats from "../Components/CardStats/CardStats";

class TrackerCSGO extends Component {
  constructor() {
    super();
    this.state = {
      playerSegment: {},
      playerPlatform: {}
    };
  }

  componentDidMount = async () => {
    await this.props.dispatch(getCsgoPlayer()).then(() => {
      let data = { ...this.props.player.segments }[0];
      this.setState({
        playerSegment: data.stats,
        playerPlatform: this.props.player.platformInfo
      });
    });
  };

  render() {
    const { playerSegment, playerPlatform } = this.state;
    return (
      <div className="csgo">
        <Row className="col-lg-6 m-auto tope">
          <Col className="col-lg-1 bg-warning">CSGO</Col>
          <Col>
            <input
              type="text"
              placeholder="Search Player"
              className="form-control"
            />
          </Col>
        </Row>
        <Row className="col-lg-10 ml-auto mr-auto mide p-3">
          <Col className="p-0">
            <div className="photo">
              {/* <img
                src={playerPlatform.avatarUrl}
                alt={playerPlatform.platformUserHandle}
                className="imgProfile"
              /> */}
            </div>
          </Col>
          <Col className="col-lg-5 name p-0">
            {/* {playerPlatform.platformUserHandle} */}
          </Col>
          <Col className="cardMide p-0">
            <div className="statTitle"></div>
            <div className="statValue">1000</div>
          </Col>
          <Col className="cardMide p-0 ml-2">
            <div className="statTitle">WINS</div>
            <div className="statValue">100</div>
          </Col>
          <Col className="cardMide p-0 ml-2">
            <div className="statTitle">LOSE</div>
            <div className="statValue">40</div>
          </Col>
        </Row>
        <Row className="col-lg-10 ml-auto mr-auto p-3 botte">
          <CardStats />
          <CardStats />
          <CardStats />
          <CardStats />
          <CardStats />
          <CardStats />
          <CardStats />
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.csgo.csgoPlayer
  };
};

export default connect(mapStateToProps)(TrackerCSGO);
