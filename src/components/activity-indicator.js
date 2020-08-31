import React from 'react'
import {getRandomInt} from '../utils'

const ActivityIndicatorWrapper = ({children}) => (
  <div className='post post-loading'>
    {children}
  </div>
)

const ActivityIndicatorLeft = () => (
  <div className='post-left gradient'>&nbsp;</div>
)

const ActivityIndicatorRight = ({children}) => (
  <div className='post-right'>{children}</div>
)

const ActivityIndicatorLines = ({widths}) => (
  <>
    <div className='post-line post-line-title gradient' style={{top: '12px', width: `${widths[0]}%`}}/>
    <div className='post-line post-line-normal gradient' style={{top: '24px', width: `${widths[1]}%`}}/>
    <div className='post-line post-line-normal gradient' style={{top: '32px', width: `${widths[2]}%`}}/>
    <div className='post-line post-line-normal gradient' style={{top: '40px', width: `${widths[3]}%`}}/>
  </>
)

const ActivityIndicatorItem = ({widths}) => (
  <>
    <ActivityIndicatorLeft/>

    <ActivityIndicatorRight>
      <ActivityIndicatorLines widths={widths}/>
    </ActivityIndicatorRight>
  </>
);

const ActivityIndicator = () => {
  const output = [];
  const len = getRandomInt(12, 7);

  for (let i = 0; i < len; i++) {
    const widths = [
      getRandomInt(50, 100),
      getRandomInt(50, 100),
      getRandomInt(50, 100),
      getRandomInt(50, 100),
    ]

    output.push(
      <ActivityIndicatorWrapper key={`loading-${i}}`}>
        <ActivityIndicatorItem widths={widths}/>
      </ActivityIndicatorWrapper>
    )
  }

  return output;
};

export default ActivityIndicator