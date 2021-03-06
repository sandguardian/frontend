import React from 'react'
import Svg, { G, Line, Circle, Path } from 'react-native-svg'

const Info = ({ fill = '#333', style = {} }) => (
  <Svg height={28} width={28} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <G fill={fill} stroke={fill} strokeLinecap="round" strokeWidth="1.5">
      <Circle cx="12" cy="12" fill="none" r="11" stroke={fill}/>
			<Line fill="none" x1="12" x2="12" y1="11" y2="17"/>
			<Circle cx="12" cy="7" r="1" stroke="none"/>
    </G>
  </Svg>
)

export default Info
