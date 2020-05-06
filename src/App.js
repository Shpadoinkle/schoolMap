import React, { Component } from "react";
import "./App.scss";
import Navbar from "./components/Navbar";
import Page from "./components/Page";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SchoolSearch from "./pages/Dashboard/SchoolSearch";

toast.configure({
  autoClose: 2000,
});

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
