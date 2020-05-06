import React, { Component } from "react";
import styled from "styled-components";
import Col from "../../components/Col";
import Row from "../../components/Row";
import { Heading3, Label } from "../../components/Text";

const Styles = styled.div`
  padding: 16px 0px;
  border-top: 1px solid #ccc;

  &:nth-child(1) {
    border-top: none;
    padding-top: 0px;
  }
`;

const SchoolIcon = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 20px;

  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

class SearchResults extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { items } = this.props;
    return (
      <div>
        {items.map((e, i) => {
          return (
            <Styles key={i}>
              <Row ai="center">
                <SchoolIcon style={{ backgroundImage: `url(${e.icon})` }} />
                <Col>
                  <Heading3>{e.name}</Heading3>
                  <Label style={{ marginTop: 4, marginBottom: 4 }}>
                    {e.formatted_address}
                  </Label>
                  {e.website && (
                    <a target="_blank" href={e.website}>
                      {e.website}
                    </a>
                  )}
                </Col>
              </Row>
            </Styles>
          );
        })}
      </div>
    );
  }
}

export default SearchResults;
