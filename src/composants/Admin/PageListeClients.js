import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container} from 'react-bootstrap';
import { Grid } from '@mui/material';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from "@mui/material/IconButton";
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import ConfirmDialog from './ConfirmDialog';

export default function PageListClients() {
    
    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/client";

    const [clientsTab, setClientsTab] = useState([]);
    const [callbackData, setCallbackData] = useState(null)
    const [open, setOpen] = useState(false)   

    useEffect(() => {
        axios.get(strNomApplication)
          .then((response) => {
            console.log("La réponse : " + JSON.stringify(response.data));
            setClientsTab(response.data['clients']);
          })
          .catch(error => alert(error))
    }, [])

    const openInPopup = (data) => {
        setCallbackData(data);  
        console.log("data="+data);
        console.log("callbackData="+{callbackData})
        setOpen(true);
    }

    const handleSearch = () => {
        console.log("Search Client")
    }

    const handleAddClient = () => {
        console.log("Add Client")
    }

    const disableClient = () => {
        console.log("Disable client")
    }

    const enableClient = () => {
        console.log("Enable client")
    }   

    const modifyClient = () => {
        console.log("Modify client")
    }
    
    const DeleteClient = (id) => {
        console.log("Delete client id: "+id)
    }    

    const ListeClients = () => {   
        return (  
            <Table className="Table">
                <TableHead >
                    <TableRow className="text-start" >
                      <TableCell>ID</TableCell>
                      <TableCell>Prenom</TableCell>
                      <TableCell>Nom</TableCell>
                      <TableCell>Courriel</TableCell>
                      <TableCell className="text-center">Action</TableCell>
                    </TableRow>
                </TableHead>    
                <TableBody>
                {clientsTab.map(item => {
                  return (
                    <TableRow className="text-start" key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.prenom}</TableCell>        
                        <TableCell>{item.nom}</TableCell>      
                        <TableCell>{item.courriel}</TableCell> 
                        <TableCell className="text-center">
                          {item.estActif === 1 ? <CheckCircleOutlineOutlinedIcon className="app-icon app-icon-active" onClick={() => disableClient()}/>
                            : <HighlightOffIcon className="app-icon app-icon-inactive"  onClick={() => enableClient()}/>
                          } 
                          <EditIcon className="app-icon" onClick={() => modifyClient()}/>
                          <DeleteForeverOutlinedIcon className="app-icon" onClick={() => openInPopup(item.id)}/>                                                 
                        </TableCell>                                      
                    </TableRow>                    
                  )                    
                })}                    
                </TableBody>                            
            </Table>                  
        )  // end return          
    }   // end listeClients         

    return (
      <>
      <Container>
        <Grid container className='justify-content-center mtop-20'>
            <Grid item xs={8}>
            <div className="text-start mtop-40 mb-3">
                        <h2>Clients</h2>
                    </div>
                {/* <div className="search">
                    <TextField className="searchBox" size="small"
                        InputProps={{
                        type: 'search',
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton type="submit" aria-label="search" onClick={handleSearch}>
                                    <SearchIcon style={{ fill: "blue" }} />
                                </IconButton>
                            </InputAdornment>
                        )
                        }}
                    />
                </div> */}
                <div className="text-start mtop-40 mb-3">
                    <h5>Ajouter un nouveau client &nbsp;&nbsp;&nbsp; <Link href='/admin/clients/form'><AddCircleOutlineIcon className="app-icon"/></Link></h5>
                </div>
                <ListeClients />
            </Grid>            
        </Grid> 
      </Container>  

      <ConfirmDialog
        title="Supprimer"
        txtCancel="Non"
        txtConfirm="Oui" 
        open={open}
        setOpen={setOpen} 
        callbackData={callbackData}
      >   
     &Ecirc;tes-vous certain de vouloir supprimer?
      </ConfirmDialog>  
      </>             
    )  // end return        
}  // end function