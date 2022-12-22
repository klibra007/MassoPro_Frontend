import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import { Alert, Grid, Snackbar } from '@mui/material';
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
import FullScreenDialog from './FullScreenDialog';
import { useSelector } from 'react-redux';
import { selectConnexionData } from '../../app/features/connexionSlice';

export default function PageListClients() {

    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/client";

    const [clientsTab, setClientsTab] = useState([]);
    const [callbackData, setCallbackData] = useState(null);
    const [open, setOpen] = useState(false);
    const [openAddClient, setOpenAddClient] = useState(false);
    const [openActivationClient, setOpenActivationClient] = useState(false);
    const [openModificationClient, setOpenModificationClient] = useState(false);
    const [openSnackBar, setOpenSnackBar] = useState(false);
    const [openModificationSnackBar, setOpenModificationSnackBar] = useState(false);
    const [boolClient, setBoolClient] = useState(true);

    const [clientSelectionne, setClientSelectionne] = useState("");
    const [boolActivationClient, setBoolActivationClient] = useState(false);
    const [boolModificationClient, setBoolModificationClient] = useState(false);
    const [choixActivation, setChoixActivation] = useState("");


    const connexionData = useSelector(selectConnexionData);

    const handleOpenSnack = () => {
        setOpenSnackBar(true);
    };

    const handleCloseSnack = () => {
        setOpenSnackBar(false);
    };

    const handleOpenModifSnack = () => {
        setOpenModificationSnackBar(true);
    };

    const handleCloseModifSnack = () => {
        setOpenModificationSnackBar(false);
    };

    const handleClickOpen = () => {
        setBoolModificationClient(false);
        setOpenAddClient(true);
        //setOpenModificationClient(false);
    };

    const handleActivateClient = (client) => {
        //setActivationClient(client.estActif);
        setChoixActivation(client.estActif);
        setClientSelectionne(client);
        //console.log("Modify service");
        setBoolActivationClient(true);
        setOpenActivationClient(true);
    }

    const getClients = () => {
        axios.get(strNomApplication)
            .then((response) => {
                console.log("La réponse : " + JSON.stringify(response.data));
                setClientsTab(response.data['clients']);
            })
            .catch(error => alert(error))
    }

    /*const getClientById = (idClient) => {
        console.log(strNomApplication + `/${idClient}`)
        axios.get(strNomApplication + `/${idClient}`)
            .then((response) => {
                console.log("La réponse by Id : " + JSON.stringify(response.data));
                setClientSelectionne(response.data.client);
            })
            .catch(error => alert(error))
    }*/

    useEffect(() => {
        getClients();
    }, [])

    const openInPopup = (client) => {
        console.log("idClient :" + client.id);
        setCallbackData(client);
        setClientSelectionne(client)
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

    const handleModifyClient = (client) => {
        //getClientById(client.id);
        if (client.estActif) {
            setClientSelectionne(client);
            //console.log("Modify service");
            setBoolModificationClient(true);
            setOpenModificationClient(true);
            //setOpenAddClient(false);
        }
        else {
            handleOpenSnack();
        }


    }

    const handleValidateActiveClient = () => {
        let strNomApplication = strDossierServeur + `/api/client/${clientSelectionne.id}`;

        alert("dans activation client " + strNomApplication);

        let data = {
            "estActif": choixActivation,
        }

        alert(JSON.stringify(data))

        axios.put(strNomApplication, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                alert("La réponse: " + JSON.stringify(response));
                if (response.data.status === true) {
                    getClients();
                    //window.location.reload(false);
                    setOpenActivationClient(false);
                }
            })
            .catch((error) => {
                console.log(error.response.data.status);
                //document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
            });
    }

    const handleDesactiveClient = () => {

        let strNomApplication = strDossierServeur + `/api/client/${clientSelectionne.id}`;
        axios.delete(strNomApplication)
            .then((response) => {
                //alert("La réponse supression service : " + JSON.stringify(response.data));
                if (response.data.status === true) {
                    console.log("La réponse supression client : " + JSON.stringify(response.data));
                    getClients();
                    //window.location.reload(false);
                }

            })
            .catch(error => alert(error));
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
                        <TableCell className="text-center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {clientsTab.map(client => {
                        return (
                            <TableRow className="text-start" key={client.id}>
                                <TableCell>{client.id}</TableCell>
                                <TableCell>{client.prenom}</TableCell>
                                <TableCell>{client.nom}</TableCell>
                                <TableCell>{client.courriel}</TableCell>
                                <TableCell className="text-center">
                                    {client.estActif === 1 ? <CheckCircleOutlineOutlinedIcon className="app-icon app-icon-active" onClick={() => disableClient()} />
                                        : <HighlightOffIcon className="app-icon app-icon-inactive" onClick={() => enableClient()} />
                                    }
                                    <EditIcon className="app-icon" onClick={() => (connexionData.idPersonnel) ? handleModifyClient(client) : handleActivateClient(client)} />
                                    {!connexionData.idPersonnel && <DeleteForeverOutlinedIcon className="app-icon" onClick={() => openInPopup(client)} />}
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
            <Container className='mb-5'>
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
                        {(connexionData.idPersonnel) && <div className="text-start mtop-40 mb-3">
                            <h5>Ajouter un nouveau client<AddCircleOutlineIcon className="app-icon" onClick={handleClickOpen} /></h5>
                        </div>}
                        <ListeClients />
                    </Grid>
                </Grid>

                <ConfirmDialog
                    title={`Désactiver le client ${clientSelectionne.prenom} ${clientSelectionne.nom} ?`}
                    txtCancel="Non"
                    txtConfirm="Oui"
                    open={open}
                    setOpen={setOpen}
                    callbackData={handleDesactiveClient}
                >
                    &Ecirc;tes-vous sûr de vouloir le désactiver?
                </ConfirmDialog>

                {<FullScreenDialog openAddClient={openAddClient} openActivationClient={openActivationClient} setOpenActivationClient={setOpenActivationClient} boolClient={boolClient} setOpenAddClient={setOpenAddClient} connexionData={connexionData} boolActivationClient={boolActivationClient} boolModificationClient={boolModificationClient} handleValidateActiveClient={handleValidateActiveClient} clientSelectionne={clientSelectionne} choixActivation={choixActivation} setChoixActivation={setChoixActivation} openModificationClient={openModificationClient} setOpenModificationClient={setOpenModificationClient} getClients={getClients} setOpenModificationSnackBar={setOpenModificationSnackBar} />}

                <Snackbar sx={{ marginTop: 14, marginLeft: 19 }} open={openSnackBar} autoHideDuration={2500} onClose={handleCloseSnack} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Le client est désactivé. Contactez votre administrateur!
                    </Alert>
                </Snackbar>
                <Snackbar sx={{ marginTop: 14, marginLeft: 19 }} open={openModificationSnackBar} autoHideDuration={2500} onClose={handleCloseModifSnack} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        {boolModificationClient ? "Le client a bien été modifié!" : "Le client a bien été ajouté!"}
                    </Alert>
                </Snackbar>
            </Container>


        </>
    )  // end return        
}  // end function