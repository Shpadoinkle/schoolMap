import React, {Component} from 'react'

const Row = ({
  children,
  flex = 1,
  jc = 'flex-start',
  ai = 'stretch',
  style = {},
  className = '',
  onClick,
  reverse = false,
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: reverse ? 'row-reverse' : 'row',
      flex,
      justifyContent: jc,
      alignItems: ai,
      ...style,
    }}
    className={className}
    onClick={onClick}
  >
    {children}
  </div>
)

export default Row
