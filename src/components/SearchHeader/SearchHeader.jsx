import React from 'react';
import { AppBar, TextField } from '@material-ui/core';

export default ({ onSearchFieldChange }) => {
  return (
    <AppBar position="sticky"
      style={{
        padding: "10px",
        backgroundColor: "#fff"
      }}
    >
      <TextField
        label="Search for image"
        onChange={onSearchFieldChange}
      />
    </AppBar>
  )
}