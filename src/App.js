import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import { Provider } from "react-redux";
import store from "./Redux/store";

import Home from "./Page/Home";
import Login from "./Page/Login";
import Register from "./Page/Register";
import Profile from "./Page/Profile";
import Csgo from "./Page/TrackerCSGO";

import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Header />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/csgo" component={Csgo} />

          <Footer />
        </Router>
      </Provider>
    );
  }
}

export default App;
