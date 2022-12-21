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

export default function PageListeServices() {
    const [servicesTab, setServicesTab] = useState([]);
    const [open, setOpen] = useState(false);
    const [currentService, setCurrentService] = useState({});

    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/services";

    useEffect(() => {
        axios.get(strNomApplication)
            .then((response) => {
                console.log("La réponse : " + JSON.stringify(response.data));
                setServicesTab(response.data);
            })
            .catch(error => alert(error))
    }, [])

    const handleSearch = () => {
        console.log("Add service")
    }

    const handleAddService = () => {
        console.log("Add service")
    }

    const handleDisableService = () => {
        console.log("Disable service")

    }

    const handleEnableService = () => {
        console.log("Enable service")
    }

    const handleModifyService = () => {
        console.log("Modify service")

    }

    const handleConfirmDeleteService = (srv) => {
        setOpen(true);
        setCurrentService(srv);
    }

    const handleDeleteService = () => {
        console.log("Current Service: ", currentService);
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
                    <DialogTitle id='alert-dialog-title'>Suppression de service</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            &Ecirc;tes-vous certain de vouloir supprimer?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Non</Button>
                        <Button autoFocus onClick={handleDeleteService}>Oui</Button>
                    </DialogActions>
                </Dialog>
            </>
        )  // end return    
    }  // end ConfirmDialog


    const ListeServices = () => {
        return (
            <Table className="Table">
                <TableHead >
                    <TableRow className="text-start" >
                        <TableCell className="text-center">ID</TableCell>
                        <TableCell className="text-center">Nom service</TableCell>
                        <TableCell className="text-center">Description</TableCell>
                        <TableCell className="text-center">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {servicesTab.map(srv => {
                        return (
                            <TableRow className="text-start" key={srv.id}>
                                <TableCell className="test-top">{srv.id}</TableCell>
                                <TableCell >{srv.nomService}</TableCell>
                                <TableCell>{srv.description}</TableCell>
                                <TableCell sx={{ whiteSpace: 'nowrap' }}>
                                    {srv.estActif === 1 ? (<Link onClick={() => handleDisableService()}><CheckCircleOutlineOutlinedIcon /></Link>
                                    ) : (<Link onClick={() => handleEnableService()}><HighlightOffIcon /></Link>)
                                    }
                                    <Link onClick={() => handleModifyService()}><EditIcon /></Link>
                                    {/* <Link href='/admin/services/form'><EditIcon /></Link> */}
                                    <Link onClick={() => handleConfirmDeleteService(srv)}><DeleteForeverOutlinedIcon /></Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )
    }   // end listeServices

    return (
        <Container>
            <Grid container className='justify-content-center mtop-20'>
                <Grid item xs={8}>
                    <div className="text-start mtop-40 mb-3">
                        <h2>Services</h2>
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
                        <h5>Créer un nouveau service   <Link pl={5} href='/admin/services/form'><AddCircleOutlineIcon /></Link></h5>
                    </div>
                    <ListeServices />
                </Grid>
            </Grid>
            <ConfirmDialog />
        </Container >
    )  // end return
}  // end PageListeService    