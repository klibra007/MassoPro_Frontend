import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@mui/material'

const ConfirmDialog = (props) => {
  const { title, children, txtCancel, txtConfirm, open, setOpen, callbackData } = props;
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onClose={closeDialog}
      aria-labelledby='dialog-title'
      aria-describedby='dialog-description'
    >
      <DialogTitle id='dialog-title'>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='dialog-description'>
          {children}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          onClick={closeDialog}
        >{txtCancel}</Button>
        <Button
          variant="contained"
          onClick={() => {
            setOpen(false);
            callbackData();
          }}
        >{txtConfirm}</Button>
      </DialogActions>
    </Dialog>
  )   // end return
}  // end ConfirmDialog

export default ConfirmDialog;