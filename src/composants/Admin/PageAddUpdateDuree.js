import React, { useState } from 'react';
import Stack from 'react-bootstrap/Stack';
import { Grid, Container } from '@mui/material';
import Link from '@mui/material/Link'; 
import TextField from '@mui/material/TextField';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
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
    const [estActif, setEstActif] = useState(data.estActif);    

    const [dureeError, setDureeError] = useState('');       
    const [prixError, setPrixError] = useState('');           

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => setOpen(true);    
    const handleClose = (event, reason ) => {
      if (reason !== 'backdropClick') {  // Do nothing if click outside Dialog box (backdropClick)
         cancelForm();
      }
    }

    const handleChangeActif = (event, newActif) => {
       // console.log("newActif="+newActif);
       setEstActif(newActif);
    }
    
    const resetFormError = () => {
        setDureeError('');
        setPrixError('');
    }   

    const resetForm = () => {
       setDuree('');
       setPrix('');
       setEstActif(1);
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
           setEstActif(data.estActif);
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
           let data = {
             "duree": duree,
             "prix": prix,
             "estActif": estActif
           }     

           resetForm();
           setOpen(false);  // close popup

           // Callback function with parameters add data
           if (props.data.id === 0) {
              // Add
              callbackFunc(data);   
           } else {
              // Update
              callbackFunc(props.data.id, data);               
           }
        } 
    }     
   
    return (
      <>
        <Link pl={5}
            onClick={handleClickOpen}
        >{icon}</Link> 

        <Dialog
           open={open}
           onClose={handleClose}
           disableEscapeKeyDown={true}  // Disable ESC key
           aria-labelledby='dialog-title'
           aria-describedby='dialog-description'  
           PaperProps={{
            sx: {
               width: "30%",
               maxHeight: 450
            }
         }} 
        > 
          <DialogTitle id='dialog-title'>{props.data.id === 0 ? "Ajouter" : "Modifier"} une durée</DialogTitle>
          <DialogContent>
            <Grid container direction="column">
               <Grid item>Durée</Grid>            
               <Grid item xs={6}>
                 <TextField
                    error={dureeError && dureeError.length ? true : false }
                    required
                    fullWidth
                    id="formDuree"
                    type="number"
                    size='small'
                    value={duree}                   
                    onChange={(e) => {setDuree(e.target.value);}}
                    className="mb-2"
                    helperText={dureeError}   
                  />                     
               </Grid>
               <Grid item>Prix</Grid>                  
               <Grid item xs={6}>
                  <TextField
                    error={prixError && prixError.length ? true : false }
                    required
                    fullWidth
                    id="formPrix"
                    type={'number'}
                    size='small'
                    value={prix}
                    onChange={(e) => {setPrix(e.target.value);}}
                    className="mb-3"                    
                    helperText={prixError}   
                  />                 
               </Grid>
               <Grid item>État d'activité</Grid>   
               <ToggleButtonGroup
                  color="primary"
                  value={estActif}
                  exclusive
                  onChange={handleChangeActif}
                  aria-label="Duree Actif"
               >
                  <ToggleButton value={1} aria-label="1">Actif</ToggleButton>
                  <ToggleButton value={0} aria-label="0">Non Actif</ToggleButton>
               </ToggleButtonGroup>               
            </Grid>               
          </DialogContent> 
          <DialogActions>   
            <Stack direction="horizontal" gap={2} className='mx-auto mb-2'>
              <Button 
               className="btn btn-secondary"
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