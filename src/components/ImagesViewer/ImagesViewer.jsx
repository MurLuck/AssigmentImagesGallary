import React from 'react'
import { GridList, GridListTile } from '@material-ui/core';

export default ({ images = [], cols = 4 } = {}) => {
  return (
    <GridList cellHeight={220} spacing={16} justify={'center'} cols={cols} >
      {
        images.map(image => {
          return (
            <GridListTile
              key={image.id}
              cols={1}
            >
              <img
                src={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}_m.jpg`}
                alt={image.id}
              />
            </GridListTile>
          );
        })
      }
    </GridList >
  )
}
