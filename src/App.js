import React, { Component } from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import Page from "./components/Page";
import SchoolSearch from "./pages/Dashboard/SchoolSearch";

class App extends Component {
  render() {
    return (
      <Page>
        <Navbar />
        <SchoolSearch />
      </Page>
    );
  }
}

export default App;
