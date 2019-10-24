import React, { Component } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

import t from "typy";

import "./trackerdivision.css";

import { connect } from "react-redux";
import { getDivisionPlayer } from "../Redux/Action/division";

import CardStats from "../Components/CardStats/CardStats";
import Character from "../Assets/character.png";

class TrackerDivision extends Component {
  constructor() {
    super();
    this.state = {
      playerSegment: {},
      playerPlatform: {},
      playerStats: {},
      search: "",
      character: false,
      platform: "",
      platformColorPs: "",
      platformColorXbox: "",
      platformColorUplay: ""
    };
  }

  handleChange = async e => {
    await this.setState({
      search: e.target.value
    });
  };

  searching = async () => {
    const { platform } = this.state;
    this.setState({ character: true });
    let search = this.state.search;
    this.props
      .dispatch(getDivisionPlayer(platform, search))
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

  changePlatform = data => {
    let color = "";
    if (data === "psn") {
      color = "rgb(2, 100, 228)";
      this.setState({
        platformColorPs: color,
        platformColorXbox: "#50566430",
        platformColorUplay: "#50566430"
      });
    } else if (data === "xbl") {
      color = "rgb(40, 141, 36)";
      this.setState({
        platformColorPs: "#50566430",
        platformColorXbox: color,
        platformColorUplay: "#50566430"
      });
    } else if (data === "uplay") {
      color = "rgb(2, 171, 228)";
      this.setState({
        platformColorPs: "#50566430",
        platformColorXbox: "#50566430",
        platformColorUplay: color
      });
    }
    this.setState({
      platform: data
    });
  };

  render() {
    const {
      playerSegment,
      playerPlatform,
      playerStats,
      character,
      platformColorPs,
      platformColorXbox,
      platformColorUplay
    } = this.state;
    const data = Object.values(playerStats);
    return (
      <div className="division">
        <Row className="col-lg-10 m-auto tope">
          <Col className="col-lg-3">
            <img
              src="https://lordsofgaming.net/wp-content/uploads/2019/03/The-Division-2.png"
              alt="DIVISION Logo"
              width="200px"
            />
          </Col>
          <Col className="butPlatform">
            <div
              className="platButton platPs"
              onClick={() => this.changePlatform("psn")}
              style={{
                backgroundColor: platformColorPs
              }}
            >
              <i className="fab fa-playstation"></i>
            </div>
            <div
              className="platButton platXbox"
              onClick={() => this.changePlatform("xbl")}
              style={{ backgroundColor: platformColorXbox }}
            >
              <i className="fab fa-xbox"></i>
            </div>
            <div
              className="platButton platUbisoft"
              onClick={() => this.changePlatform("uplay")}
              style={{ backgroundColor: platformColorUplay }}
            >
              <img
                src="https://ubistatic2-a.akamaihd.net/legal_portal/prod/images_new/ubilogo.png"
                alt="uplay"
                width="35px"
              />
            </div>
          </Col>
          <Col className="col-lg-6">
            <input
              type="text"
              placeholder="Search Player"
              className="searchDivision col-lg-12"
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
              <Col className="col-lg-8 name p-0">
                {t(playerPlatform, "platformUserHandle").safeObject}
              </Col>
              <Col className="cardMide p-0 mt-auto mb-auto">
                <div className="statTitle">
                  {t(playerSegment, "stats.timePlayed.displayName").safeObject}
                </div>
                <div className="statValue">
                  {t(playerSegment, "stats.timePlayed.displayValue").safeObject}
                </div>
              </Col>
            </Row>
            <Row className="col-lg-10 ml-auto mr-auto mt-4 typeTitle">
              <div className="dot mt-auto mb-auto mr-2"></div>
              {playerSegment.type.toUpperCase()}
            </Row>
            <Row className="col-lg-10 ml-auto mr-auto p-0 botte">
              {data.map((item, index) =>
                index === 0 ? null : (
                  <CardStats
                    statsColor="whitesmoke"
                    colored="orange"
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
    player: state.division.divisionPlayer,
    isLoading: state.division.isLoading,
    error: state.division.error
  };
};

export default connect(mapStateToProps)(TrackerDivision);
