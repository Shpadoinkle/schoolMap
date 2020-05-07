import "antd/dist/antd.css";
import Slider from "antd/es/slider";
import React from "react";
import styled from "styled-components";

export default ({ onChange, onAfterChange, ...props }) => (
  <SliderContainer {...props}>
    <Label>Search Radius</Label>
    <Slider onChange={onChange} onAfterChange={onAfterChange} {...props} />
  </SliderContainer>
);

const SliderContainer = styled.div`
  & .ant-slider {
    min-width: 200px;

    & .ant-slider-track {
      background-color: #e73e3f;
    }

    & .ant-slider-handle {
      width: 22px;
      height: 22px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.32);
      border: solid 1px #e6e6e6;
      background-color: #ffffff;
      margin-top: -9px;
      border-color: #fff;
    }
  }

  & .ant-slider:hover .ant-slider-handle:not(.ant-tooltip-open) {
    border-color: #fff;
  }
`;

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
  margin-bottom: 15px;
`;
