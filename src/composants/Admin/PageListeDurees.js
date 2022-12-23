import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Grid } from '@mui/material';
import Link from '@mui/material/Link';
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from '@mui/material/InputAdornment';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    DialogContent,
    DialogContentText
} from '@mui/material'


import '../../styles.css';



import axios from 'axios';
import AdminMenu from './AdminMenu';

export default function PageListeDurees() {
    const defaultDuree = {
        duree : 0,
        prix : 0
    };
    const [dureesTab, setDureesTab] = useState([]);
    const [openNew, setOpenNew] = useState(false);
    const [open, setOpen] = useState(false);
    const [currentDuree, setCurrentDuree] = useState();
    const [newDuree, setNewDuree] = useState(defaultDuree);


    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/durees";

    useEffect(() => {
        getDataFromApi();
    }, [])

    const getDataFromApi = () => {
        axios.get(strNomApplication)
        .then((response) => {
            console.log("La réponse : " + JSON.stringify(response.data));
            setDureesTab(response.data);
        })
        .catch(error => alert(error))

    }
    const handleSearch = () => {
        console.log("Add Duree")
    }

    const handleAddDuree = () => {
        console.log("Add Duree")
    }

    const handleDisableDuree = () => {
        console.log("Disable duree")

    }

    const handleEnableDuree = () => {
        console.log("Enable duree")
    }

    const handleModifyDuree = (index) => {
        console.log("Modify duree");
        console.log(dureesTab[index]);
        setCurrentDuree(index);
    }
    const updateDuree = (event) => {
        console.log("UpdateDuree OnChange: ", event.target.value);
        dureesTab[currentDuree].duree = event.target.value;
        setDureesTab(dureesTab);
    }

    const updatePrix = (event) => {
        console.log("UpdatePrix OnChange: ", event.target.value);
        dureesTab[currentDuree].prix = event.target.value;
        setDureesTab(dureesTab);
    }

    const handleSaveDuree = () => {
        console.log("Save duree");
        const duree = dureesTab[currentDuree];
        console.log("Duree: ", duree);
        axios.put(strNomApplication + '/' + duree.id, duree)
            .then((response) => {
                console.log("La réponse : ", response.data);
                if (response.data.status === true) {
                    setCurrentDuree(null);                 
                }
                else {
                    alert(response.data.message);
                }
            })
            .catch(error => alert(error))

    }

    const handleNewDureeTextFieldChangeDuree = (event) => {
        console.log("New Duree OnChange: ", event.target.value);
        newDuree.duree = event.target.value;
        setNewDuree(newDuree);
    }

    const handleNewDureeTextFieldChangePrix = (event) => {
        console.log("New Prix OnChange: ", event.target.value);
        newDuree.prix = event.target.value;
        setNewDuree(newDuree);
    }

    const handleSaveNewDuree = () => {
        console.log("New Duree: ", newDuree);
        axios.post(strNomApplication, newDuree)
            .then((response) => {
                console.log("La réponse : ", response.data);
                if (response.data.status === true) {
                    setNewDuree(defaultDuree);
                    dureesTab.push(newDuree);
                    setDureesTab(dureesTab);
                    getDataFromApi(); //temporary until id returned from API response
                }
                else {
                    alert(response.data.message);
                }
            })
            .catch(error => alert(error))
        
        setOpenNew(false);
    }

    const handleCloseNewDuree = () => {
        setNewDuree(defaultDuree);
        setOpenNew(false);
    }
    const handleConfirmDeleteDuree = (duree) => {
        setOpen(true);
        setCurrentDuree(duree);
    }

    const handleDeleteDuree = () => {
        console.log("Current Duree: ", currentDuree);
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const NewDuree = () => {
        return (

            <Dialog open={openNew}>
                <DialogTitle>Ajouter une nouvelle durée</DialogTitle>
                <DialogContent>
                    <Grid container spacing={2}>
                        <Grid item xs={8}>
                            <TextField mt={10}                                
                                id="newDuree"
                                label="Durée: "
                                defaultValue={newDuree.duree}
                                onChange={handleNewDureeTextFieldChangeDuree}
                            />
                        </Grid>
                        
                        <Grid item xs={8}>
                            <TextField
                                id="newPrix"
                                label="Prix: "
                                defaultValue={newDuree.prix}
                                onChange={handleNewDureeTextFieldChangePrix}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseNewDuree}>Annuler</Button>
                    <Button className="primary-button" onClick={handleSaveNewDuree}>Sauvegarder</Button>
                </DialogActions>
            </Dialog>
        )
    }

    const ConfirmDialog = () => {
        return (
            <>

                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'
                >
                    <DialogTitle id='alert-dialog-title'>Suppression d'une durée</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            &Ecirc;tes-vous certain de vouloir supprimer?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button className="btn-secondary" onClick={handleClose}>Non</Button>
                        <Button autoFocus onClick={handleDeleteDuree}>Oui</Button>
                    </DialogActions>
                </Dialog>
            </>
        )  // end return    
    }  // end ConfirmDialog


    const ListeDurees = () => {
        return (
            <Table className="Table">
                <TableHead >
                    <TableRow className="text-start">
                        {/* <TableCell className="text-start">ID</TableCell> */}
                        <TableCell className="text-center">Durée</TableCell>
                        <TableCell className="text-center">Prix</TableCell>
                        <TableCell className="text-center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dureesTab.map((duree, index) => {
                        console.log("Duree: ", duree);
                        return (
                            <TableRow className="text-center" key={duree.id}>
                                {/* <TableCell className="text-start test-top">{duree.id}</TableCell> */}
                                <TableCell className="text-center">
                                    {(currentDuree === index) ?
                                        <TextField className="dureeTextField" defaultValue={duree.duree} inputProps={{ maxLength: 4 }} sx={{ width: '100px' }} onChange={updateDuree}></TextField>
                                        : duree.duree}
                                </TableCell>
                                <TableCell className="text-center">
                                    {(currentDuree === index) ?
                                        <TextField defaultValue={duree.prix} inputProps={{ maxLength: 8 }} sx={{ width: '100px' }} onChange={updatePrix}></TextField>
                                        : duree.prix}
                                </TableCell>
                                <TableCell className="text-center" sx={{ whiteSpace: 'nowrap' }}>
                                    {/* {duree.estActif === 1 ? (<Link onClick={() => handleDisableDuree()}><CheckCircleOutlineOutlinedIcon /></Link>
                                    ) : (<Link onClick={() => handleEnableDuree()}><HighlightOffIcon /></Link>)
                                    } */}
                                    {/* <Link onClick={() => handleModifyDuree()}><EditIcon /></Link> */}
                                    {(currentDuree === index) ?
                                        <SaveIcon className="app-icon" onClick={() => handleSaveDuree(index)}/>
                                        :
                                        <EditIcon className="app-icon" onClick={() => handleModifyDuree(index)}/>
                                    }

                                    <DeleteForeverOutlinedIcon className="app-icon" onClick={() => handleConfirmDeleteDuree(duree)}/>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )
    }   // end listeDurees

    return (
        <Container>
            {/* <Grid container className='justify-content-center mtop-20'>
             */}
             <Grid container className='justify-content-center mtop-20'>
                {/* <Grid item xs={2}>
                    <div className="text-start mtop-40 mb-3">
                <AdminMenu/>
                </div>
                </Grid>
                <Grid item xs={2}></Grid> */}
                <Grid item xs={8}>
                    <div className="text-start mtop-40 mb-3">
                        <h2>Durée</h2>
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
                    <div className="text-start mleft-16 mtop-40 mb-3">
                        <h5>Créer une nouvelle durée  <AddCircleOutlineIcon className="app-icon" pl={5} onClick={() => { setOpenNew(true) }}/></h5>
                    </div>
                    <ListeDurees />
                </Grid>
            </Grid>
            <ConfirmDialog />
            <NewDuree />
      
        </Container >
    )  // end return
}  // end PageListeDuree    