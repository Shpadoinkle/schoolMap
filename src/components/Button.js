import React from "react";
import styled, { withTheme } from "styled-components";
import Loader from "./Loader";

const ButtonContainer = styled.div`
  position: relative;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  height: ${({ height, theme }) => (height ? `${height}px` : "43px")};
  background-color: ${({ theme, passive, important, primary }) =>
    primary
      ? theme.BLUE
      : important
      ? theme.red
      : passive
      ? "#fff"
      : theme.blue};
  color: ${({ passive, theme }) => (passive ? theme.black : "white")};

  font-size: 1rem;

  border: ${({ passive, theme }) => (passive ? "solid 1px #e6e6e6" : "none")};

  border-top-left-radius: ${({ leftFlat, theme, height }) =>
    leftFlat ? "0px" : height ? `${height / 2}px` : "20px"};
  border-bottom-left-radius: ${({ leftFlat, theme, height }) =>
    leftFlat ? "0px" : height ? `${height / 2}px` : "20px"};

  border-top-right-radius: ${({ rightFlat, theme, height }) =>
    rightFlat ? "0px" : height ? `${height / 2}px` : "20px"};
  border-bottom-right-radius: ${({ rightFlat, theme, height }) =>
    rightFlat ? "0px" : height ? `${height / 2}px` : "20px"};

  /* padding-top: ${({ height, theme }) => (height ? `unset` : "15px")}};
  padding-bottom: ${({ height, theme }) => (height ? `unset` : "15px")}}; */
  padding-left: ${({ padding, theme }) => (padding ? `${padding}px` : "25px")};
  padding-right:  ${({ padding, theme }) =>
    padding ? `${padding}px` : "25px"};

  /* min-width: ${({ noMin = false }) => (noMin ? "0" : "140px")};; */

  width: ${({ fluid }) => (fluid ? "100%" : "auto")};

  font-family: 'Roboto';

  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  text-align: center;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ passive, theme, important }) =>
      important ? theme.warning_dark : passive ? "#fff" : theme.primary_dark};
    border: ${({ passive, theme }) => (passive ? "solid 1px #23232b" : "none")};
  }

  & .icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 9px;
  }

  & .text {
    font-family: 'Roboto';
    font-weight: normal;
    white-space: nowrap;
  }

`;

const Button = ({
  loading,
  icon,
  children,
  pover,
  passive,
  onClick,
  disabled,
  dropdown,
  ...props
}) => {
  function handleClick() {
    if (loading || disabled) {
      return;
    }
    onClick && onClick();
  }

  return (
    <ButtonContainer
      disabled={disabled}
      onClick={handleClick}
      {...{ passive, ...props }}
    >
      {!!icon && <span className="icon">{icon}</span>}
      {loading && <Loader />}
      {!loading && <span className="text">{children}</span>}
    </ButtonContainer>
  );
};

export default withTheme(Button);
