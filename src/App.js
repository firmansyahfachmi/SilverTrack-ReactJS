import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";

import Home from "./Page/Home";
import Header from "./Components/Header/Header";
import Footer from "./Components/Footer/Footer";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route exact path="/" component={Home} />
        <Footer />
      </Router>
    );
  }
}

export default App;
