import React from 'react';
import { CircularProgress, Container } from '@material-ui/core';

export default () => {
  return (
    <Container style={{
      backgroundColor:"rgba(0,0,0,0.1)",
      display: 'flex',
      position: "fixed",
      zIndex: 9000,
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
    }}>
      <CircularProgress
        color={'secondary'}
        style={{
          margin: 'auto'
        }}
      />
    </Container>
  )
}