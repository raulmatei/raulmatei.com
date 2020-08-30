import React from 'react'
import ContentLoader from 'react-content-loader'
import {getRandomInt} from '../utils'

const ActivityIndicatorItem = ({widths}) => (
  <ContentLoader backgroundOpacity={0.13} foregroundOpacity={0.25} viewBox="0 0 640 108">
    <rect x="0" y="0" width="108" height="108" />
    <rect x="124" y="12" width={widths[0]} height="24" />
    <rect x="124" y="48" width={widths[1]} height="12" />
    <rect x="124" y="68" width={widths[2]} height="12" />
    <rect x="124" y="88" width={widths[3]} height="12" />
  </ContentLoader>
);

const ActivityIndicator = () => {
  const output = [];
  const len = getRandomInt(12, 7);

  for (let i = 0; i < len; i++) {
    const widths = [
      getRandomInt(420, 360),
      getRandomInt(420, 360),
      getRandomInt(420, 360),
      getRandomInt(420, 360),
    ]

    output.push(
      <div className='post-loading' key={`loading-${i}}`}>
        <ActivityIndicatorItem widths={widths}/>
      </div>
    )
  }

  return output;
};

export default ActivityIndicator