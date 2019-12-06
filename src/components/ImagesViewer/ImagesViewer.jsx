import React from 'react'
import { GridList, GridListTile, GridListTileBar, FormLabel } from '@material-ui/core';

export default ({ images = [], cols = 4 } = {}) => {
  return (
    images.length ?
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
                <GridListTileBar title={image.title} />
              </GridListTile>
            );
          })


        }
      </GridList >
      : <FormLabel style={{
        fontSize:"1.5rem",
        fontWight:"700"
      }} >
        No images found
       </FormLabel>
  )
}
