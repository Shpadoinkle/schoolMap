import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import styled from "styled-components";
import Btn from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import Padder from "../../components/Padder";
import Page, { PageInnerCentered } from "../../components/Page";
import Row from "../../components/Row";
import { toastError } from "../../toastHelper";
import SearchResults from "./SearchResults";

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
    this.state = {
      loading: false,
      suburb: "",
      school: "",
      results: [],
      // Brisbane Default
      defaultLat: -27.469705,
      defaultLong: 153.09639,
      defaultRange: 5000,
    };
    this.map = React.createRef();
    this.mapRef = React.createRef();
    this.getLocation = this.getLocation.bind(this);
    this.getUserCoords = this.getUserCoords.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.getUserCoords);
    }
  }

  getUserCoords(position) {
    this.setState({
      displayMap: true,
      center: {
        defaultLat: position.coords.latitude,
        defaultLong: position.coords.longitude,
      },
    });
  }

  componentDidMount() {
    this.getLocation();
    this.map = new google.maps.Map(this.mapRef.current);
  }

  handleChange(event) {
    this.setState({ [event.target.getAttribute("id")]: event.target.value });
  }

  getSearchString(string) {
    let returnString = encodeURIComponent(string);
    return returnString.replace(/%20/g, "+");
  }

  handleSubmit = async (e) => {
    if (e) e.preventDefault();
    const {
      loading,
      school,
      defaultLat,
      defaultLong,
      defaultRange,
    } = this.state;
    if (loading) return;
    this.setState({ loading: true });

    let schoolSearch = this.getSearchString(school);
    var request = {
      query: schoolSearch,
      location: new google.maps.LatLng(defaultLat, defaultLong),
      radius: defaultRange,
      type: "school",
    };

    let service = new google.maps.places.PlacesService(this.map, {
      center: { lat: defaultLat, lng: defaultLong },
      zoom: 15,
    });

    service.textSearch(request, (res, status) => {
      if (status === "OVER_QUERY_LIMIT") {
        toastError("Query Limit Hit - Inital Places Fetch");
        this.setState({ loading: false });
      } else {
        this.setState({ results: res, loading: false }, this.fetchWeb);
      }
    });
  };

  fetchWeb = async () => {
    const { results, defaultLat, defaultLong } = this.state;
    let service = new google.maps.places.PlacesService(this.map, {
      center: { lat: defaultLat, lng: defaultLong },
      zoom: 15,
    });

    for (let place of results) {
      let request = {
        placeId: place.place_id,
        fields: ["website", "place_id"],
      };
      service.getDetails(request, (res2, status) => {
        if (status === "OVER_QUERY_LIMIT") {
          console.log(
            `Query limit hit --> fetching extra website for ${place.name}`
          );
        } else {
          this.updateResultWebsite({ ...res2 });
        }
      });
    }
  };

  updateResultWebsite = (res) => {
    const { results } = this.state;
    this.setState({
      results: results.map((e) => {
        if (e.place_id === res.place_id) {
          e.website = res.website;
        }
        return e;
      }),
    });
  };

  render() {
    const {
      loading,
      suburb,
      school,
      results,
      defaultLat,
      defaultLong,
    } = this.state;
    return (
      <Page className="fill">
        <Styles>
          <div style={{ padding: `40px 20px` }}>
            <PageInnerCentered>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={5} md={4}>
                  <div className="section">
                    {/* <Input
                      id="suburb"
                      label="Suburb"
                      value={suburb}
                      onChange={(e) => this.handleChange(e)}
                      placeholder="Enter suburb"
                      onSubmit={this.handleSubmit}
                    />
                    <Padder /> */}
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
                <Grid item xs={12} sm={7} md={8}>
                  <div className="section">
                    <div style={{ height: 1, width: 1 }}>
                      <div ref={this.mapRef}></div>
                    </div>
                    {loading && <Loader primary />}
                    {!loading && <SearchResults items={results} />}
                  </div>
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
