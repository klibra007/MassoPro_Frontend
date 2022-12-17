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

export default function PageListeDurees() {
    const [dureesTab, setDureesTab] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentDuree, setCurrentDuree] = useState({});

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

    const handleModifyDuree = () => {
        console.log("Modify duree")

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
                        <Button onClick={handleClose}>Non</Button>
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
                    <TableRow className="text-start" >
                        <TableCell className="text-start">ID</TableCell>
                        <TableCell className="text-center">Durée</TableCell>
                        <TableCell className="text-center">Prix</TableCell>
                        <TableCell className="text-center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dureesTab.map(duree => {
                        return (
                            <TableRow className="text-center" key={duree.id}>
                                <TableCell className="text-start test-top">{duree.id}</TableCell>
                                <TableCell className="text-center">{duree.duree}</TableCell>
                                <TableCell className="text-center">{duree.prix}</TableCell>
                                <TableCell className="text-center" sx={{ whiteSpace: 'nowrap' }}>
                                    {/* {duree.estActif === 1 ? (<Link onClick={() => handleDisableDuree()}><CheckCircleOutlineOutlinedIcon /></Link>
                                    ) : (<Link onClick={() => handleEnableDuree()}><HighlightOffIcon /></Link>)
                                    } */}
                                    {/* <Link onClick={() => handleModifyDuree()}><EditIcon /></Link> */}
                                    <Link href='/admin/durees/form'><EditIcon /></Link>
                                    <Link onClick={() => handleConfirmDeleteDuree(duree)}><DeleteForeverOutlinedIcon /></Link>
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
            <Grid container className='justify-content-center mtop-20'>
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
                        <h5>Créer une nouvelle durée  &nbsp;&nbsp;&nbsp; <Link href='/admin/durees/form'><AddCircleOutlineIcon /></Link></h5>
                    </div>
                    <ListeDurees />
                </Grid>
            </Grid>
            <ConfirmDialog />
        </Container >
    )  // end return
}  // end PageListeDuree    