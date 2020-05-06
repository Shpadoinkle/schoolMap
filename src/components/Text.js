import React from "react";
import styled, { withTheme } from "styled-components";

/**
 * Regular Text
 */
const TextRegular = styled.p`
  font-family: "Roboto";
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  text-align: ${({ center }) => (center ? "center" : "left")};
  color: ${({ theme, color }) => (color ? color : theme.black)};
  ${({ underlined }) => (underlined ? "text-decoration: underline;" : "")}
  ${({ inlineBlock }) => (inlineBlock ? "display: inline-block;" : "")}
`;
const Text = ({ children, ...props }) => (
  <TextRegular {...props}>{children}</TextRegular>
);
export default withTheme(Text);

/**
 * Heading 1
 */
const Heading_1 = styled(TextRegular)`
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;
  margin-bottom: 0px;
`;
export const Heading1 = withTheme(({ children, ...props }) => (
  <Heading_1 {...props}>{children}</Heading_1>
));

/**
 * Heading 2
 */
const Heading_2 = styled(TextRegular)`
  font-weight: 700;
  font-size: 20px;
  line-height: 41px;
  margin-bottom: 0px;
`;
export const Heading2 = withTheme(({ children, ...props }) => (
  <Heading_2 {...props}>{children}</Heading_2>
));

/**
 * Heading 3
 */
const Heading_3 = styled(TextRegular)`
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;
  color: ${({ theme }) => theme.grey_1};
  margin-bottom: 0px;
`;
export const Heading3 = withTheme(({ children, ...props }) => (
  <Heading_3 {...props}>{children}</Heading_3>
));

/**
 * Heading 4
 */
const Heading_4 = styled(TextRegular)`
  font-weight: 500;
  font-size: 15px;
  margin-bottom: 0px;
`;
export const Heading4 = withTheme(({ children, ...props }) => (
  <Heading_4 {...props}>{children}</Heading_4>
));

/**
 * Subtitle
 */
const Sub_title = styled(TextRegular)`
  /* font-weight: 300; */
  margin-bottom: 0px;
`;
export const Subtitle = withTheme(({ children, ...props }) => (
  <Sub_title {...props}>{children}</Sub_title>
));

/**
 * Label
 */

const _Label = styled(TextRegular)`
  font-family: "Roboto";
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.83;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.grey_1};
`;

export const Label = withTheme(_Label);
