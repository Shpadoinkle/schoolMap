import React, {Component} from 'react'

const Col = ({
  children,
  flex = 1,
  jc = 'flex-start',
  ai = 'stretch',
  style = {},
  className = '',
}) => (
  <div
    style={{
      display: 'flex',
      flex,
      flexDirection: 'column',
      justifyContent: jc,
      alignItems: ai,
      ...style,
    }}
    className={className}
  >
    {children}
  </div>
)

export default Col
