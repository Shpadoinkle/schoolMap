import Grid from "@material-ui/core/Grid";
import React, { Component } from "react";
import styled from "styled-components";
import AddressSearch from "../../components/AddressSearch";
import Btn from "../../components/Button";
import Input from "../../components/Input";
import Loader from "../../components/Loader";
import Padder from "../../components/Padder";
import Page, { PageInnerCentered } from "../../components/Page";
import Row from "../../components/Row";
import Slider from "../../components/Slider";
import { toastError } from "../../toastHelper";
import SearchResults from "./SearchResults";

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
      defaultRange: 5,
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

  handleDistanceChange = (val) => {
    this.setState({ defaultRange: val });
  };

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
      radius: Number(defaultRange * 1000),
      // locationBias: {
      //   radius: defaultRange,
      //   center: { lat: defaultLat, lng: defaultLong },
      // },
      type: "school",
    };
    console.log("@@Query", request);

    let service = new google.maps.places.PlacesService(this.map, {
      center: { lat: defaultLat, lng: defaultLong },
      zoom: 15,
    });

    service.textSearch(request, (res, status) => {
      if (status === "OVER_QUERY_LIMIT") {
        toastError("Query Limit Hit - Inital Places Fetch");
        this.setState({ loading: false });
      } else {
        console.log(res);
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

  handleAddressSelected = (address) => {
    console.log("@ address", address);

    if (!address) return;

    const lat = address.geometry.location.lat();
    const lng = address.geometry.location.lng();

    this.setState({
      defaultLat: lat,
      defaultLong: lng,
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
      defaultRange,
    } = this.state;
    return (
      <Page className="fill">
        <Styles>
          <div style={{ padding: `40px 20px` }}>
            <PageInnerCentered>
              <Grid container direction="row" spacing={2}>
                <Grid item xs={12} sm={5} md={4}>
                  <div className="section">
                    <AddressSearch
                      label="Location"
                      placeholder="Using Current Location"
                      onSelectAddress={this.handleAddressSelected}
                    />
                    <Padder />
                    <SliderContainer>
                      <Slider
                        value={defaultRange}
                        onChange={this.handleDistanceChange}
                        min={1}
                      />
                      <Padder horizontal />
                      <span>{defaultRange}km</span>
                    </SliderContainer>
                    <Padder />
                    <Input
                      id="school"
                      label="Search Input"
                      value={school}
                      onChange={(e) => this.handleChange(e)}
                      placeholder="School name, type, address etc"
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

const SliderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Styles = styled.div`
  flex: 1;

  .section {
    border-radius: 6px;
    background-color: white;
    padding: 24px;
    border: 1px solid #e6e6e6;
  }
`;

export default SchoolSearch;
