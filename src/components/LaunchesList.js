import React from 'react'
import { FixedSizeList as List } from 'react-window'

import LaunchListItem from './LaunchListItem'
// import LaunchItem from './LaunchItem'

const LaunchesList = ({ launches, width }) => {
  return (
    <List
      useIsScrolling
      itemCount={launches.length}
      itemSize={132}
      height={Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      )}
      width={width}
    >
      {({ index, style }) => (
        <LaunchListItem launch={launches[index]} style={style} />
      )}
    </List>
  )
}

export default LaunchesList

/*
<List
  useIsScrollling
  itemData={launches}
  itemCount={launches.length}
  itemSize={200}
  height={height || 1000}
  width={width}
>
  {LaunchListItem}
</List>
*/
