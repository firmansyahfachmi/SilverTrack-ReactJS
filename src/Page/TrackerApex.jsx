import React, { Component } from "react";
import { Row, Col, Spinner } from "react-bootstrap";

import t from "typy";

import "./trackerapex.css";

import { connect } from "react-redux";
import { getApexPlayer } from "../Redux/Action/apex";

import CardStats from "../Components/CardStats/CardStats";
import CardLegend from "../Components/CardLegend/cardLegend";

import Character from "../Assets/character.png";

class TrackerApex extends Component {
  constructor() {
    super();
    this.state = {
      playerSegment: {},
      playerPlatform: {},
      playerStats: {},
      search: "",
      playerSegmentAll: {},
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
      .dispatch(getApexPlayer(search))
      .then(() => {
        let data = { ...this.props.player.segments }[0];
        let data2 = this.props.player.segments;
        this.setState({
          playerSegment: data,
          playerPlatform: this.props.player.platformInfo,
          playerStats: data.stats,
          playerSegmentAll: data2
        });
      })
      .catch(() => {
        console.log("alert", this.props.error);
        this.setState({
          playerSegment: {},
          playerPlatform: {},
          playerStats: {},
          playerSegmentAll: {}
        });
      });
  };

  render() {
    const {
      playerSegment,
      playerPlatform,
      playerStats,
      playerSegmentAll,
      character
    } = this.state;
    const data = Object.values(playerStats);
    return (
      <div className="apex">
        <Row className="col-lg-10 m-auto tope">
          <Col className="col-lg-3">
            <img
              src="https://logodownload.org/wp-content/uploads/2019/02/apex-legends-logo-9.png"
              alt="Apex Legends Logo"
              width="100px"
            />
          </Col>
          <Col className="col-lg-6">
            <input
              type="text"
              placeholder="Search Player"
              className="searchApex col-lg-12"
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
                  {
                    t(playerSegment, "stats.matchesPlayed.displayName")
                      .safeObject
                  }
                </div>
                <div className="statValue">
                  {
                    t(playerSegment, "stats.matchesPlayed.displayValue")
                      .safeObject
                  }
                </div>
              </Col>
            </Row>
            <Row className="col-lg-10 ml-auto mr-auto mt-4 typeTitleApex">
              <div className="dotApex mt-auto mb-auto mr-2"></div>
              {playerSegment.type.toUpperCase()}
            </Row>
            <Row className="col-lg-10 ml-auto mr-auto p-0 botte">
              {data.map((item, index) =>
                index === 6 ? null : (
                  <CardStats
                    statsColor="whitesmoke"
                    colored="#ed2828"
                    key={index}
                    title={item.displayName}
                    value={item.displayValue}
                    percent={item.percentile}
                  />
                )
              )}
            </Row>
            <Row className="col-lg-10 ml-auto mr-auto mt-2 mb-2 typeTitleApex">
              <div className="dotApex mt-auto mb-auto mr-2"></div>
              {playerSegmentAll[1].type.toUpperCase()}
            </Row>
            {playerSegmentAll.map((item, index) =>
              index === 0 || index === 4 ? null : (
                <CardLegend key={index} data={item} />
              )
            )}
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    player: state.apex.apexPlayer,
    isLoading: state.apex.isLoading
  };
};

export default connect(mapStateToProps)(TrackerApex);
