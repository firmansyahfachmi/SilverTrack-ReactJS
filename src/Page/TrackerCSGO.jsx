import React, { Component } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

import t from "typy";

import "./trackercsgo.css";

import { connect } from "react-redux";
import { getCsgoPlayer } from "../Redux/Action/csgo";

import CardStats from "../Components/CardStats/CardStats";
import Character from "../Assets/character.png";

class TrackerCSGO extends Component {
  constructor() {
    super();
    this.state = {
      playerSegment: {},
      playerPlatform: {},
      playerStats: {},
      search: "",
      character: false
    };
  }

  handleChange = async e => {
    await this.setState({
      search: e.target.value
    });
  };

  searching = async () => {
    this.setState({ character: true });
    let search = this.state.search;
    this.props
      .dispatch(getCsgoPlayer(search))
      .then(() => {
        let data = { ...this.props.player.segments }[0];
        this.setState({
          playerSegment: data,
          playerPlatform: this.props.player.platformInfo,
          playerStats: data.stats
        });
      })
      .catch(() => {
        console.log("alert", this.props.error);
        this.setState({
          playerSegment: {},
          playerPlatform: {},
          playerStats: {}
        });
      });
  };

  render() {
    const {
      playerSegment,
      playerPlatform,
      playerStats,
      character
    } = this.state;

    const data = Object.values(playerStats);
    return (
      <div className="csgo">
        <Row className="col-lg-10 m-auto tope">
          <Col className="col-lg-3">
            <img
              src="http://www.requitix.io/mypics/max/9/92461_csgo-logo-png.png"
              alt="CSGO Logo"
              width="200px"
            />
          </Col>
          <Col className="col-lg-6">
            <input
              type="text"
              placeholder="Search player"
              className="searchCsgo col-lg-12"
              onChange={this.handleChange}
              onKeyPress={e => {
                if (e.key === "Enter") {
                  e.preventDefault();

                  this.searching();
                }
              }}
            />
          </Col>
        </Row>
        {this.props.isLoading === true ? (
          <div className="loading mt-5">
            <Spinner animation="grow" variant="info" />
          </div>
        ) : data.length < 1 ? (
          character === false ? null : (
            <div className="ml-auto mr-auto col-lg-10 notFound">
              <img src={Character} alt="character" width="170px" />
              &nbsp;&nbsp;Player Not Found!
            </div>
          )
        ) : (
          <>
            <Row className="col-lg-10 ml-auto mr-auto mide p-3">
              <Col className="p-0">
                <div className="photo">
                  <img
                    src={t(playerPlatform, "avatarUrl").safeObject}
                    alt={t(playerPlatform, "platformUserHandle").safeObject}
                    className="imgProfile"
                  />
                </div>
              </Col>
              <Col className="col-lg-5 name p-0">
                {t(playerPlatform, "platformUserHandle").safeObject}
              </Col>
              <Col className="cardMide p-0 mt-auto mb-auto">
                <div className="statTitle">
                  {t(playerStats, "timePlayed.displayName").safeObject}
                </div>
                <div className="statValueCS">
                  {t(playerStats, "timePlayed.displayValue").safeObject}
                </div>
              </Col>
              <Col className="cardMide p-0 ml-2 mt-auto mb-auto">
                <div className="statTitle">
                  {t(playerStats, "wins.displayName").safeObject}
                  <div className="ml-auto percent">
                    {t(playerStats, "wins.percentile").safeObject}%
                  </div>
                </div>
                <div className="statValueCS">
                  {t(playerStats, "wins.displayValue").safeObject}
                </div>
              </Col>
              <Col className="cardMide p-0 ml-2 mt-auto mb-auto">
                <div className="statTitle">
                  {t(playerStats, "losses.displayName").safeObject}
                  <div className="ml-auto percent">
                    {t(playerStats, "losses.percentile").safeObject}%
                  </div>
                </div>
                <div className="statValueCS">
                  {t(playerStats, "losses.displayValue").safeObject}
                </div>
              </Col>
            </Row>
            <Row className="col-lg-10 ml-auto mr-auto mt-4 typeTitleCs">
              <div className="dotCs mt-auto mb-auto mr-2"></div>
              {playerSegment.type.toUpperCase()}
            </Row>
            <Row className="col-lg-10 ml-auto mr-auto p-0 botte">
              {data.map((item, index) =>
                index === 0 || index === 19 || index === 22 ? null : (
                  <CardStats
                    statsColor="whitesmoke"
                    colored="#30c5ff"
                    key={index}
                    title={item.displayName}
                    value={item.displayValue}
                    percent={item.percentile}
                  />
                )
              )}
            </Row>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.csgo.csgoPlayer,
    isLoading: state.csgo.isLoading,
    error: state.csgo.error
  };
};

export default connect(mapStateToProps)(TrackerCSGO);
