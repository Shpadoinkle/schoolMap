import React, { Component } from "react";
import styled, { withTheme } from "styled-components";
import Zelect from "./Zelect/Zelect";

class AddressSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      autocompleting: false,
      predictions: [],
    };
  }

  searchAddress = async (address) => {
    this.setState({ autocompleting: true });

    try {
      let results = await addressAutocomplete({ address });
      this.setState({
        predictions: results,
        autocompleting: false,
      });
    } catch (err) {
      console.log(err);
      this.setState({ autocompleting: false });
    }
  };

  handleSearchAddress = (e) => {
    const address = e.target.value;

    this.setState({ value: address });

    clearTimeout(this._timeout);

    if (!address) {
      return this.setState({ preditions: [] });
    }

    this._timeout = setTimeout(() => {
      this.searchAddress(address);
    }, 300);
  };

  handleAddressSelected = ({ address }) => {
    const { onSelectAddress } = this.props;

    if (!address || !address.formatted_address) return;

    this.setState({ value: address.formatted_address });

    onSelectAddress && onSelectAddress(address);
  };

  render() {
    const { title, subtitle, label, onSelectAddress, ...props } = this.props;

    const { predictions } = this.state;

    let addresses = predictions.map((prediction) => {
      return {
        label: prediction.formatted_address,
        value: prediction.formatted_address,
        address: prediction,
      };
    });

    return (
      <div>
        {!!label && <Label>{label}</Label>}
        <Zelect
          clearable
          searchable
          noFilter
          onSelect={this.handleAddressSelected}
          onChange={this.handleSearchAddress}
          value={this.state.value}
          {...props}
          data={addresses}
        />
      </div>
    );
  }
}

/**
 *
 *  Helper functions
 */

function addressAutocomplete(data) {
  return new Promise((resolve, reject) => {
    const { address } = data;

    const geocoder = new window.google.maps.Geocoder();
    const OK = window.google.maps.GeocoderStatus.OK;

    geocoder.geocode({ address }, (results, status) => {
      if (status !== OK) {
        return reject(status);
      }
      return resolve(results);
    });
  });
}

const Label = styled.div`
  font-family: "Roboto";
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.grey_1};
  margin-bottom: 7px;
`;

export default withTheme(AddressSearch);
