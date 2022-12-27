import React, { useEffect, useRef, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Stack } from 'react-bootstrap';
import axios from 'axios';

export default function FullScreenDialog(props) {
    
    const [dataClientSelectionne, setDataClientSelectionne] = useState({});

    let strDossierServeur = "https://dev.pascalrocher.com";
    const [nomService, setService] = useState(props.serviceSelectionne === undefined ? "" : props.serviceSelectionne.nomService);

    const handleChange = (event, newAlignment) => {
        props.setAlignment(newAlignment);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    // Pour gérer la fermeture de l'ajout d'un client
    const handleClose2 = () => {
        props.setOpenAddClient(false);
    }

    // Pour gérer la fermeture de la désactivation client
    const handleClose3 = () => {
        props.setOpenActivationClient(false);
    }

    const handleClose4 = () => {
        props.setOpenModificationClient(false);
        //window.location.reload(false); //Soit reload soit infos direct par le back 
    }

    const handleChangeService = (event) => {
        props.setService(event.target.value);
    }

    const handleChangeDescription = (event) => {
        props.setDescription(event.target.value);
    }

    const handleChangeNoteClient = (event) => {
        setNotesClient(event.target.value);
    }


    //Etat composant PageClientForm 
    //const prenom = useRef("");
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [courriel, setCourriel] = useState("");
    const [password, setPassword] = useState("");
    const [telephone, setTelephone] = useState("");
    const [dob, setDob] = useState("");
    const [nam, setNam] = useState("");
    const [parCourrielChecked, setParCourrielChecked] = useState(false);
    const [parSmsChecked, setParSmsChecked] = useState(false);
    const [notesClient, setNotesClient] = useState('');

    const [choixContact, setChoixContact] = useState(() => ['courriel']);

    /*useEffect(() => {
        setDataClientSelectionne(props.clientSelectionne);
        alert(JSON.stringify(props.clientSelectionne));
        prenom.current = props.clientSelectionne.prenom;
    })*/

    const handleChoixContact = (event, newChoix) => {
        setChoixContact(newChoix);
    };

    const handleChoixActivation = (event, newChoix) => {
        props.setChoixActivation(newChoix);
    };

    const handleChangePrenom = (event) => {
        setPrenom(event.target.value);
    }

    const handleChangeNom = (event) => {
        setNom(event.target.value);
    }

    const handleChangeCourriel = (event) => {
        setCourriel(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleChangeTelephone = (event) => {
        setTelephone(event.target.value);
    }

    const handleChangeDob = (event) => {
        setDob(event.target.value);
    }

    const handleChangeNam = (event) => {
        setNam(event.target.value);
    }

    const handleChangeParCourrielChecked = (event) => {
        setParCourrielChecked(event.target.checked);
    }

    const handleChangeParSmsChecked = (event) => {
        setParSmsChecked(event.target.checked);
    }

    const handleClickAjouter = () => {
        let strNomApplication = strDossierServeur + "/api/client";

        //alert("dans ajout Service " + strNomApplication);

        let data = {
            "prenom": prenom,
            "nom": nom,
            "courriel": courriel,
            "motDePasse": password,
            "telephone": telephone,
            "idPersonnel": props.connexionData.idPersonnel,
            "notes": notesClient,
            "dateDeNaissance": dob,
            "numeroAssuranceMaladie": nam,

        }

        //alert(JSON.stringify(data))

        axios.post(strNomApplication, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log("La réponse: " + JSON.stringify(response));
                if (response.data.status === true) {
                    props.getClients();
                    //window.location.reload(false);
                    handleClose2(false);
                    props.setOpenModificationSnackBar(true);
                }
            })
            .catch((error) => {
                console.log(error.response.data.status);
                //document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
            });
    }

    const handleClickModifier = () => {
        let strNomApplication = strDossierServeur + `/api/client/${props.clientSelectionne.id}`;

        //alert("dans modification client personnel " + strNomApplication);

        let data = {
            "prenom": prenom === "" ? props.clientSelectionne.prenom : prenom,
            "nom": nom === "" ? props.clientSelectionne.nom : nom,
            "courriel": courriel === "" ? props.clientSelectionne.courriel : courriel,
            "motDePasse": password,
            "telephone": telephone === "" ? props.clientSelectionne.telephone : telephone,
            "idPersonnel": props.connexionData.idPersonnel,
            "notes": notesClient === "" ? props.clientSelectionne.notes : notesClient,
            "dateDeNaissance": dob === "" ? props.clientSelectionne.dateDeNaissance : dob,
            "numeroAssuranceMaladie": nam === "" ? props.clientSelectionne.numeroAssuranceMaladie : nam,

        }

        //alert(JSON.stringify(data))

        axios.put(strNomApplication, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log("La réponse: " + JSON.stringify(response));
                if (response.data.status === true) {
                    props.getClients();
                    //window.location.reload(false);
                    props.setOpenModificationSnackBar(true);
                    handleClose4(false);
                }
            })
            .catch((error) => {
                console.log(error.response.data.status);
                //document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
            });
    }

    return (
        <>

            {props.boolService && <Modal show={props.open} onHide={handleClose} size={'lg'} className='mtop-100' >
                <Modal.Header closeButton>
                    <Modal.Title>{props.modificationService === false ? "Ajouter un service" : "Modifier un service"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nom Service</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={props.modificationService === false ? "" : props.serviceSelectionne.nomService}
                                placeholder="Votre service"
                                autoFocus
                                onChange={handleChangeService}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={handleChangeDescription} defaultValue={props.modificationService === false ? "" : props.serviceSelectionne.description} />
                        </Form.Group>
                        {props.modificationService && <> <p>État d'activité</p>
                            <ToggleButtonGroup
                                color="primary"
                                value={props.alignment}
                                exclusive
                                onChange={handleChange}
                                aria-label="Platform"
                            >
                                <ToggleButton value={1}>Actif</ToggleButton>
                                <ToggleButton value={0}>Non Actif</ToggleButton>
                            </ToggleButtonGroup>
                        </>
                        }
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={props.modificationService === false ? props.handleAddService : props.handleValidateModification} >
                        {props.modificationService === false ? "Ajouter" : "Modifier"}
                    </Button>
                </Modal.Footer>
            </Modal>}

            {props.boolClient && !props.boolActivationClient && <Modal show={props.boolModificationClient ? props.openModificationClient : props.openAddClient} onHide={props.boolModificationClient ? handleClose4 : handleClose2} size={'lg'} className='mt-5'>
                <Modal.Header closeButton>
                    {<Modal.Title>{props.boolModificationClient ? `Modifier le client ${props.clientSelectionne.prenom} ${props.clientSelectionne.nom} ?` : "Ajouter un client"}</Modal.Title>}
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {/* <div className="text-start mb-3">
                  <h4>Ajouter Client</h4>
              </div>    */}
                        <div className="m-2 text-start">Renseignez les champs</div>
                        <Form.Group className="mt-1">
                            <Form.Control type='text' id="formPrenom" placeholder='Prenom' defaultValue={props.boolModificationClient ? props.clientSelectionne.prenom : ""} onChange={handleChangePrenom}

                                required />
                            <p id='idPrenomErreur'></p>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <Form.Control type='text' id="formNom" placeholder='Nom' onChange={handleChangeNom} defaultValue={props.boolModificationClient ? props.clientSelectionne.nom : ""} required />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Control type='email' id="formCourriel" placeholder='Courriel' onChange={handleChangeCourriel} defaultValue={props.boolModificationClient ? props.clientSelectionne.courriel : ""} required />
                        </Form.Group>
                        <Form.Group className='mt-3'>
                            <Form.Control type='password' id="formPassword" placeholder='Mot de passe' onChange={handleChangePassword} />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Control type='text' id="formTelephone" placeholder='Numéro de telephone' onChange={handleChangeTelephone} defaultValue={props.boolModificationClient ? props.clientSelectionne.telephone : ""} required />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Control type='text' id="formDob" placeholder='Date de naissance YYYY-MM-DD' defaultValue={props.boolModificationClient ? props.clientSelectionne.dateDeNaissance : ""} onChange={handleChangeDob} required />
                        </Form.Group>
                        <Form.Group className="mt-3">
                            <Form.Control type='text' id="formNam" placeholder='Numéro assurance maladie / 9 chiffres' defaultValue={props.boolModificationClient ? props.clientSelectionne.numeroAssuranceMaladie : ""} onChange={handleChangeNam} required />
                        </Form.Group>

                        <Form.Group
                            className="mt-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Control as="textarea" placeholder='Notes aux dossiers' defaultValue={props.boolModificationClient ? props.clientSelectionne.notes : ""} rows={3} onChange={handleChangeNoteClient} />
                        </Form.Group>

                        <div className="text-start mt-3">
                            Choisissez une méthode de communication
                        </div>

                        <ToggleButtonGroup
                            color="primary"
                            value={choixContact}

                            onChange={handleChoixContact}
                            aria-label="Platform"
                            className='mt-3'
                        >
                            <ToggleButton value={"courriel"} aria-label="courriel">Par courriel</ToggleButton>
                            <ToggleButton value={"sms"} aria-label="sms">Par SMS</ToggleButton>
                        </ToggleButtonGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={props.boolModificationClient ? handleClose4 : handleClose2}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={props.boolModificationClient ? handleClickModifier : handleClickAjouter}>
                        {props.boolModificationClient ? "Modifier" : "Ajouter"}
                    </Button>
                </Modal.Footer>
            </Modal>}

            {props.boolClient && props.boolActivationClient && <Modal show={props.openActivationClient} onHide={handleClose3} size={'lg'} className='mt-5'>
                <Modal.Header closeButton>
                    <Modal.Title>{`Activer le client ${props.clientSelectionne.prenom} ${props.clientSelectionne.nom}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="text-start mt-3">
                            Choisissez une option
                        </div>
                        <ToggleButtonGroup
                            color="primary"
                            value={props.choixActivation}
                            exclusive
                            onChange={handleChoixActivation}
                            aria-label="Platform"
                            className='mt-3'
                        >
                            <ToggleButton value={1} aria-label="1">Actif</ToggleButton>
                            <ToggleButton value={0} aria-label="0">Non actif</ToggleButton>
                        </ToggleButtonGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={handleClose3}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={props.handleValidateActiveClient}>
                        Activer
                    </Button>
                </Modal.Footer>
            </Modal>}
        </>
    );
}
