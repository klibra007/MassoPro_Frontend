import React, { useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Typography
} from '@mui/material';

import Link from '@mui/material/Link';


export default function ConfirmDialog(props) {
  const { title, children, txtCancel, txtConfirm, icon, callbackFunc, callbackData } = props;

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {  // Do nothing if click outside Dialog box (backdropClick)
      setOpen(false);
    }
  }

  return (
    <div>
      <Link
        onClick={handleClickOpen}
      >{icon}</Link>

      <Dialog
        open={open}
        onClose={handleClose}
        disableEscapeKeyDown={true}  // Disable ESC key
        aria-labelledby='dialog-title'
        aria-describedby='dialog-description'
      >
        <DialogTitle id='dialog-title'>{title}</DialogTitle>
        <DialogContent dividers>
          <DialogContentText id='dialog-description' >
            {children.map((text) => (
              <Typography gutterBottom>
                {text}
              </Typography>)
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={handleClose}
          >{txtCancel}</Button>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
              callbackFunc(callbackData);
            }}
          >{txtConfirm}</Button>
        </DialogActions>
      </Dialog>
    </div>
  )   // end return
}  // end function
