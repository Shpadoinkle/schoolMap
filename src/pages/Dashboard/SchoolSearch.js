import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import Page, { PageInnerCentered } from "../../components/Page";
import Row from "../../components/Row";
import Text, { Heading4 } from "../../components/Text";
import Input from "../../components/Input";
import Btn from "../../components/Button";
import Padder from "../../components/Padder";

import Grid from "@material-ui/core/Grid";
import Loader from "../../components/Loader";

const Styles = styled.div`
  flex: 1;

  .section {
    border-radius: 6px;
    background-color: white;
    padding: 24px;
    border: 1px solid #e6e6e6;
  }
`;

class SchoolSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false, suburb: "", school: "", results: [] };
  }

  handleChange(event) {
    this.setState({ [event.target.getAttribute("id")]: event.target.value });
  }

  handleSubmit = async (e) => {
    if (e) e.preventDefault();
    this.setState({ loading: true });
    this.gweg();
  };

  getSearchString(string) {
    let returnString = encodeURIComponent(string);
    return returnString.replace(/%20/g, "+");
  }

  gweg = async (base64) => {
    const { loading, suburb, school } = this.state;
    let suburbSearch = this.getSearchString(suburb);
    let schoolSearch = this.getSearchString(school);

    console.log(suburbSearch);
    console.log(schoolSearch);

    // search by name
    // let searchType = "name";
    // let apiUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${searchString}&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry,place_id&key=${placesApi}`;

    // searchType = "area";
    // // search by area and key
    // // Note -- lat first then long
    // const latttt = -(27.466824).toString();
    // const longgg = (153.045959).toString();
    // const radiusInMeters = (10000).toString();

    // apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latttt},${longgg}&radius=${radiusInMeters}&keyword=${searchString}&key=${placesApi}`;

    // // Text string search
    // apiUrl = `https://maps.googleapis.com/maps/api/place/textsearch/json?location=${latttt},${longgg}&radius=${radiusInMeters}&query=${searchString}&key=${placesApi}`;

    // // console.log(apiUrl);
    // // console.log(searchString);
    // console.log("fetching places??......");
    // this.setState({ loadingGoogle: true, testResults: [] });

    // axios({
    //   method: "get",
    //   url: apiUrl,
    // })
    //   .then((res) => {
    //     if (searchType === "name") {
    //       // console.log(res.data.candidates);
    //       // console.log('google response');
    //       this.setState({
    //         loadingGoogle: false,
    //         testResults: res.data.candidates,
    //       });
    //       // this.getImages(searchType);
    //     }
    //     if (searchType === "area") {
    //       // console.log(res.data.results);
    //       // console.log('google response');
    //       let chosenPoint = null;
    //       if (!_.isEmpty(res.data.results)) {
    //         chosenPoint = res.data.results[0].place_id;
    //       }
    //       this.setState({
    //         loadingGoogle: false,
    //         testResults: res.data.results,
    //         chosenPoint,
    //       });
    //       //  this.getImages(searchType);

    //       // const list = {};

    //       // res.data.results.forEach(e => {
    //       //     list[e.place_id] = e;
    //       // });

    //       // axios({
    //       //     method: 'post',
    //       //     url: 'https://us-central1-places-dev-e0bd8.cloudfunctions.net/places-saveplaces',
    //       //     data: {
    //       //         list
    //       //     },
    //       // })
    //       //     .then((res) => {
    //       //         console.log('yepppp')
    //       //     }).catch((err) => {
    //       //         console.log(err)
    //       //         console.log('save error');
    //       //     });
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     console.log("google error");
    //     this.setState({ loadingGoogle: false });
    //   });
  };

  render() {
    const { loading, suburb, school } = this.state;
    return (
      <Page className="fill">
        <Styles>
          <div style={{ padding: `40px 20px` }}>
            <PageInnerCentered>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={12} md={4}>
                  <div className="section">
                    <Input
                      id="suburb"
                      label="Suburb"
                      value={suburb}
                      onChange={(e) => this.handleChange(e)}
                      placeholder="Enter suburb"
                      onSubmit={this.handleSubmit}
                    />
                    <Padder />
                    <Input
                      id="school"
                      label="School name (optional)"
                      value={school}
                      onChange={(e) => this.handleChange(e)}
                      placeholder="School name"
                      onSubmit={this.handleSubmit}
                    />
                    <Padder />
                    <Row jc="flex-end">
                      <Btn primary onClick={this.handleSubmit}>
                        Search
                      </Btn>
                    </Row>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <div className="section">{loading && <Loader primary />}</div>
                </Grid>
              </Grid>
            </PageInnerCentered>
          </div>
        </Styles>
      </Page>
    );
  }
}

export default SchoolSearch;
