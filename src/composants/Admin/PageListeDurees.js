import '../../styles.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Grid } from '@mui/material';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'; 
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import EditIcon from '@mui/icons-material/Edit';

import PageAddUpdateDuree from './PageAddUpdateDuree'
import ConfirmDialog from '../ConfirmDialog'

export default function PageListeDurees() {

    const [dureesTab, setDureesTab] = useState([]);

    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [notifyMsg, setNotifyMsg] = useState('');

    const handleCloseSnack = () => {
       setOpenSnackBar(false);
    };

    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/durees";

    useEffect(() => {
        axios.get(strNomApplication)
          .then((response) => {
            console.log("La réponse : " + JSON.stringify(response.data));
            setDureesTab(response.data);
          })
          .catch(error => alert(error))
    }, [])   
    
    const notify = ( msg, isReload ) => {
        setNotifyMsg(msg); 
        setOpenSnackBar(true);

        if (isReload) {   
            setInterval(() => {       
              window.location.reload(false);
            }, 2000); 
        }          
    }   

    const updateDuree = (id, data) => {
        // console.log("Update Duree. id="+data.id+" duree="+data.duree+" prix="+data.prix+" estActif="+data.estActif) 
        let apiStr=strNomApplication+"/"+id;
        // console.log("update duree. id="+id+" duree="+newDuree+" prix="+newPrix+"\nApi: "+apiStr)   
        
        axios.put(apiStr, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log("La réponse: " + JSON.stringify(response));
            if (response.data.status === true) {
               notify('Durée modifié', true);
            }
        })
        .catch((error) => {
            console.log(error.response.data.status);
            notify("Erreur modifié de durée", false)
        });
    }        

    const addDuree = ( data ) => {
        // console.log("Add Duree. duree="+data.duree+" prix="+data.prix+" estActif="+data.estActif) 
        
        axios.post(strNomApplication, JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            console.log("La réponse: " + JSON.stringify(response));
            if (response.data.status === true) {
               notify('Durée ajoutée', true);
            }
        })
        .catch((error) => {
            console.log(error.response.data.status);
            notify("Erreur d'ajout de durée", false)
        });
    }   // end function    

    const deleteDuree = (id) => {
       let apiStr=strNomApplication+"/"+id;
       // console.log("deleteDuree. id="+id+"\nApi: "+apiStr); 
       axios.delete(apiStr)
        .then((response) => {
            console.log("La réponse: " + JSON.stringify(response));
            if (response.data.status === true) {
               notify('Durée est désactivés', true);

            }
        })
        .catch((error) => {
            console.log(error.response.data.status);
            notify("Erreur désactivés durée", false)
        });       
    }

const ListeDurees = () => {
    return (
        <TableContainer component={Paper} style={{backgroundColor: '#f5f5f5'}}>
            <Table className="Table">
              <TableHead >
                <TableRow className="text-start" >
                  <TableCell>Minutes</TableCell>
                  <TableCell>Prix</TableCell>
                  <TableCell>
                    <Grid container className="text-end">
                      <Grid item xs={10}>
                         Action
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              </TableHead>  
              <TableBody>
                {dureesTab.map((item) => { 
                  return (
                    <TableRow className="text-start" key={item.id}>
                      <TableCell>{item.duree}</TableCell>
                      <TableCell>{item.prix}</TableCell>   
                      <TableCell>                        
                        <Grid container className="text-end">
                          <Grid item xs={7}>
                            { item.estActif === 1 ? <CheckCircleOutlineOutlinedIcon className='app-icon app-icon-active cursor-default' />
                              : <HighlightOffIcon className='app-icon app-icon-inactive cursor-default'/>
                            }                            
                          </Grid>
                          <Grid item xs={3}>
                            <PageAddUpdateDuree
                               data={ {id: item.id, duree: item.duree, prix: item.prix, estActif: item.estActif} }
                               txtConfirm="Sauvegarder"
                               icon={<EditIcon className='app-icon'/>}
                               callbackFunc={updateDuree}
                            />                              
                          </Grid>
                          <Grid item xs={2}>
                            <ConfirmDialog
                              title="Supprimer"
                              children="Etes-vous sûr de vouloir le désactiver?"
                              txtCancel="Non"
                              txtConfirm="Oui"
                              icon={<DeleteForeverOutlinedIcon className='app-icon'/>}   
                              callbackFunc={deleteDuree} 
                              callbackData={item.id}                                
                            />   
                          </Grid>
                        </Grid>
                      </TableCell>                                   
                    </TableRow>                                  
                  )              
                })}           
              </TableBody>          
            </Table>
        </TableContainer> 
    )   // end return
}   // end function    

return (
    <Container>
      <Grid container className='justify-content-center mtop-10'>
        <Grid item xs={5}>
           <div className="text-start mb-4">
              <h4>Durée</h4>
           </div>     
           <div className="text-start mb-2">
               Ajouter une Durée&nbsp;&nbsp;&nbsp; 
               <PageAddUpdateDuree
                    data={ {id: 0, duree: '', prix: '', estActif: 1 }} 
                    txtConfirm="Ajouter"
                    icon={<AddCircleOutlineIcon />}
                    callbackFunc={addDuree}
                />                 
            </div>             
            <ListeDurees />    
        </Grid> 
      </Grid>      
      <Snackbar sx={{marginTop: 14, marginLeft: 19}} 
          open={openSnackBar} 
          onClose={handleCloseSnack}
          autoHideDuration={3000} 
          anchorOrigin={{vertical: 'top', horizontal: 'center'}} 
      >
        <Alert severity="success" sx={{ width: '100%' }}>
            {notifyMsg}
        </Alert>
      </Snackbar>      
    </Container>
  )   // end return  

}  // end func    