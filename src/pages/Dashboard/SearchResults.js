import React, { Component } from "react";
import axios from "axios";
import styled, { withTheme } from "styled-components";
import GoogleMapReact from "google-map-react";
import Page, { PageInnerCentered } from "../../components/Page";
import Row from "../../components/Row";
import Text, { Heading4 } from "../../components/Text";
import Input from "../../components/Input";
import Btn from "../../components/Button";
import Padder from "../../components/Padder";

import Grid from "@material-ui/core/Grid";
import Loader from "../../components/Loader";
import { toastError, toastSuccess } from "../../toastHelper";

/**
 *
 *
 * A previous query
 */
import { goo } from "../../mobx/theme";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { items } = this.props;
    return (
      <div>
        {goo.map((e, i) => {
          return <div key={i}>An item</div>;
        })}
      </div>
    );
  }
}

export default SearchResults;
