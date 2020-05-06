import React from "react";
import styled, { withTheme } from "styled-components";
// import './Loader.scss'

export default withTheme(({ ...props }) => (
  <Loader {...props}>
    <div className="loading-dots">
      <div className="loading-dots--dot"></div>
      <div className="loading-dots--dot"></div>
      <div className="loading-dots--dot"></div>
    </div>
  </Loader>
));

const Loader = styled.div`
  @keyframes dot-keyframes {
    0% {
      opacity: 0.4;
      transform: scale(0.2, 0.2);
    }
    5% {
      opacity: 0.4;
      transform: scale(0.2, 0.2);
    }

    50% {
      opacity: 1;
      transform: scale(1, 1);
    }

    95% {
      opacity: 0.4;
      transform: scale(0.2, 0.2);
    }
    100% {
      opacity: 0.4;
      transform: scale(0.2, 0.2);
    }
  }

  .loading-dots {
    text-align: center;
    width: 100%;

    &--dot {
      animation: dot-keyframes 1.2s infinite ease-in-out;
      background-color: ${({ theme, primary, important, color }) => {
        if (primary) {
          return theme.BLUE;
        }

        // TODO: Maybe add others here?

        return color || "#fff";
      }};
      border-radius: 50%;
      display: inline-block;
      height: 10px;
      width: 10px;
      margin: 0 5px;

      &:nth-child(2) {
        animation-delay: 0.33s;
      }

      &:nth-child(3) {
        animation-delay: 0.66s;
      }
    }
  }
`;

// export default Loader
