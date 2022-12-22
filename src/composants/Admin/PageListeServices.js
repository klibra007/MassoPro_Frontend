import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Alert, Grid, Snackbar } from '@mui/material';
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
import { useSelector } from 'react-redux';
import { selectConnexionData } from '../../app/features/connexionSlice';
import FullScreenDialog from './FullScreenDialog';
import PageServiceForm from './PageServiceForm';
import { useNavigate } from 'react-router-dom';
import { set } from 'date-fns';

export default function PageListeServices() {
    const [servicesTab, setServicesTab] = useState([]);
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);
    const [serviceSelectionne, setServiceSelectionne] = useState("");
    const [service, setService] = useState("");
    const [description, setDescription] = useState("");
    let strDossierServeur = "https://dev.pascalrocher.com";
    const [modificationService, setModificationService] = useState(false);
    const [open3, setOpen3] = useState(false);
    const [boolService, setBoolService] = useState(true);
    
    const connexionData = useSelector(selectConnexionData);

    const [alignment, setAlignment] = useState("");

    //const navigate = useNavigate();

    const handleClickOpen = () => {
        setOpen2(true);
        setModificationService(false);
    };

    //alert(JSON.stringify(connexionData));

    let strNomApplication = strDossierServeur + "/api/services";

    const getServices = () => {
        axios.get(strNomApplication)
            .then((response) => {
                console.log("La réponse : " + JSON.stringify(response.data));
                setServicesTab(response.data);
            })
            .catch(error => alert(error))
    }

    useEffect(() => {
        getServices();
    }, [])

    const handleSearch = () => {
        console.log("Add service")
    }

    const handleAddService = () => {
        console.log("Add service");

        let strNomApplication = strDossierServeur + "/api/services";

        //alert("dans ajout Service " + strNomApplication);

        let data = {
            "nomService": service,
            "description": description,
            "idAdministrateur": connexionData.idAdministrateur,
        }

        //alert(JSON.stringify(data))

        axios.post(strNomApplication, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                alert("La réponse: " + JSON.stringify(response));
                if (response.data.status === true) {
                    getServices();
                    //window.location.reload(false);
                    setOpen2(false);
                }
            })
            .catch((error) => {
                console.log(error.response.data.status);
                //document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
            });
    }

    const handleDisableService = () => {
        console.log("Disable service")

    }

    const handleEnableService = () => {
        console.log("Enable service")
    }

    const handleModifyService = (service) => {
        setAlignment(service.estActif);
        setServiceSelectionne(service);
        //console.log("Modify service");
        setModificationService(true);
        setOpen2(true);
    }

    const handleValidateModification = () => {
        let strNomApplication = strDossierServeur + `/api/services/${serviceSelectionne.id}`;

        //alert("dans modification Service " + strNomApplication);

        let data = {
            "nomService": service === "" ? serviceSelectionne.nomService : service,
            "description": description === "" ? serviceSelectionne.description : description,
            "estActif": alignment,
        }

        //alert(JSON.stringify(data))

        axios.put(strNomApplication, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                //alert("La réponse: " + JSON.stringify(response));
                if (response.data.status === true) {
                    getServices();
                    //window.location.reload(false);
                    setOpen2(false);
                    setOpen3(true);
                }
            })
            .catch((error) => {
                console.log(error.response.data.status);
                //document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
            });
    }

    const handleConfirmDeleteService = (service) => {
        setOpen(true);
        setServiceSelectionne(service);
    }

    const handleDeleteService = () => {
        //alert("Current Service: " + service.id);

        let strNomApplication = strDossierServeur + `/api/services/${serviceSelectionne.id}`;
        axios.delete(strNomApplication)
            .then((response) => {
                //alert("La réponse supression service : " + JSON.stringify(response.data));
                if (response.data.status === true) {
                    console.log("La réponse supression service : " + JSON.stringify(response.data));
                    getServices();
                    //window.location.reload(false);
                }

            })
            .catch(error => alert(error));

        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const handleClose2 = () => {
        setOpen3(false);
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
                    <DialogTitle id='alert-dialog-title'>{`Supprimer le service "${serviceSelectionne.nomService}"`}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id='alert-dialog-description'>
                            &Ecirc;tes-vous sûr de vouloir supprimer ce service?
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
                        <TableCell className="text-center">Actions</TableCell>
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
                                    <Link onClick={() => handleModifyService(srv)}><EditIcon className='idPointerMouse' /></Link>
                                    {/* <Link href='/admin/services/form'><EditIcon /></Link> */}
                                    <Link onClick={() => handleConfirmDeleteService(srv)}><DeleteForeverOutlinedIcon className='idPointerMouse' /></Link>
                                </TableCell>
                            </TableRow>
                        )
                    })}
                </TableBody>
            </Table>
        )
    }   // end listeServices

    return (
        <Container className='mb-5'>
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
                        <h5>Créer un nouveau service<Link pl={5} ><AddCircleOutlineIcon className='app-icon' onClick={handleClickOpen} /></Link></h5>
                    </div>
                    <ListeServices />
                </Grid>
            </Grid>
            <ConfirmDialog />
            
            <FullScreenDialog setOpen={setOpen2} open={open2} setService={setService} setDescription={setDescription} handleAddService={handleAddService} service={service} description={description} modificationService={modificationService} handleModifyService={handleModifyService} alignment={alignment} setAlignment={setAlignment} handleValidateModification={handleValidateModification} serviceSelectionne={serviceSelectionne} boolService={boolService}/>

            <Snackbar sx={{marginTop: 14, marginLeft: 19}} open={open3} autoHideDuration={1000} onClose={handleClose2} anchorOrigin={{vertical: 'top', horizontal: 'center'}} >
                <Alert  severity="success" sx={{ width: '100%' }}>
                    Le service a bien été modifié!
                </Alert>
            </Snackbar>
        </Container >


    )  // end return
}  // end PageListeService    