import React from 'react';
import { Container, Dialog, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';

export default ({ error, handleClosePopup }) => {
  return (
    <Container center>
      <Dialog
        open={error ? true : false}
        onClose={handleClosePopup}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {error}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary" autoFocus>
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}