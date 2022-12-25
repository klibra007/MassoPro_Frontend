import React, { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import { Grid } from '@mui/material';
import Link from '@mui/material/Link'; 
import TextField from '@mui/material/TextField';
import { 
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent } from '@mui/material' 
import { isOnlyNumber } from '../../lib/FormValidator';    

export default function PageAddUpdateDuree(props) {
    const { data, txtConfirm, icon, callbackFunc } = props;    

    const [duree, setDuree] = useState(data.duree);
    const [prix, setPrix] = useState(data.prix);    

    const [dureeError, setDureeError] = useState('');       
    const [prixError, setPrixError] = useState('');           

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);    
    const handleClose = (event, reason ) => {
      if (reason !== 'backdropClick') {  // Do nothing if click outside Dialog box (backdropClick)
         cancelForm();
      }
    }
    
    const resetFormError = () => {
        setDureeError('');
        setPrixError('');
    }   

    const resetForm = () => {
       setDuree('');
       setPrix('');
    }
    
    const cancelForm = () => {
        resetFormError();

        if (props.data.id === 0) {
           // Add mode. Reset input fields
           resetForm();
        } else {
           // Modify mode. Restore previous input values
           setDuree(data.duree);
           setPrix(data.prix);
        }

        setOpen(false);    // close popup
    }  

    const validateForm = () => {
        let dureeValid=false;
        let prixValid=false;

        resetFormError(); 

        if (duree.length === 0) {
           setDureeError("Durée est requis");
        } else if (duree < 1 || !isOnlyNumber(duree)) {
           setDureeError("Durée valeur invalide");          
        } else {
           dureeValid=true;
        } 
        
        if (prix.length === 0) {
           setPrixError("Prix est requis");
        } else if (prix < 1) {
           setPrixError("Prix valeur invalide");               
        } else {
           setPrix(parseFloat(prix).toFixed(2));
           prixValid=true;
        } 
        
        return dureeValid && prixValid;
    }

    const submitHandler = (event) => {
        if (validateForm()) {
           event.preventDefault();
           let saveDuree=duree;
           let savePrix=prix;

           resetForm();
           setOpen(false);  // close popup

           // Callback function with parameters add data
           if (props.data.id === 0) {
              // Add
              callbackFunc(saveDuree, savePrix);   
           } else {
              // Update
              callbackFunc(props.data.id, saveDuree, savePrix);               
           }
        } 
    }     
   
    return (
      <>
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
          <DialogTitle id='dialog-title'>Ajouter une durée</DialogTitle>
          <DialogContent>
            <Grid container direction="column" spacing={2}>
               <Grid item xs={6}>
                 <TextField
                    error={dureeError && dureeError.length ? true : false }
                    required
                    id="formDuree"
                    type="number"
                    size='small'
                    label="Durée"
                    value={duree}      
                    margin="dense"               
                    onChange={(e) => {setDuree(e.target.value);}}
                    InputLabelProps={{ shrink: true }}
                    helperText={dureeError}   
                  />                     
               </Grid>
               <Grid item xs={6}>
               <TextField
                    error={prixError && prixError.length ? true : false }
                    required
                    id="formPrix"
                    type={'number'}
                    size='small'
                    label="Prix"
                    value={prix}
                    margin="dense"  
                    onChange={(e) => {setPrix(e.target.value);}}
                    InputLabelProps={{ shrink: true }}
                    helperText={prixError}   
                />                 
               </Grid>
            </Grid>               
          </DialogContent> 
          <DialogActions>   
            <Stack direction="horizontal" gap={2} className='mx-auto mb-2'>
              <Button 
               variant="outlined"
               onClick={handleClose}
               >Annuler</Button>
              <Button 
               variant="contained"       
               onClick={submitHandler}
               className="mleft-6"
              >{txtConfirm}</Button>
            </Stack>
          </DialogActions>
        </Dialog>                 
      </>            
    )   // end return    
}   // end function