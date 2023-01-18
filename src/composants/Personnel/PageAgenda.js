import React, { useEffect, useState } from 'react';
import Agenda from './Agenda';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setDureeChoisie, setNomMassoChoisi, setObjetReservationIdDuree, setObjetReservationIdPersonnel, setPrix } from '../../app/features/reservationSlice';
import { Paper } from '@mui/material';
import FullScreenDialog from '../Admin/FullScreenDialog';
import { selectConnexionData } from '../../app/features/connexionSlice';

export default function PageAgenda() {

    const connexionData = useSelector(selectConnexionData);
    const [dureeTab, setDureeTab] = useState([]);
    const [dureeChoisiePersonnel, setDureeChoisiePersonnel] = useState([]);
    const [massoTab, setMassoTab] = useState([]);
    const [massoChoisi, setMassoChoisi] = useState((connexionData.typePersonnel === "Massothérapeute") ? {nom: "Vous-même"} : {});
    const [servicesTab, setServicesTab] = useState([]);
    const [serviceChoisi, setServiceChoisi] = useState({});
    const [rendezVous, setRendezVous] = useState([]);
    const [clientsTab, setClientsTab] = useState([]);
    const [clientChoisi, setClientChoisi] = useState({});
    const [initialData, setInitialData] = useState([]);
    const [objReservationPersonnel, setObjReservationPersonnel] = useState({});
    const [disponibilites, setDisponibilites] = useState({});
    const dispatch = useDispatch();



    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/durees";
    let strNomApplication2 = strDossierServeur + "/api/servicespersonnels";
    let strNomApplication3 = strDossierServeur + "/api/services";
    let strNomApplication4 = strDossierServeur + "/api/client";
    let strNomApplication5 = strDossierServeur + "/api/horairedetravail"

    const getMasso = (idService) => {
        axios.get(strNomApplication2 + `/${idService}`)
            .then((response) => {
                console.log("La réponse service : " + JSON.stringify(response.data));
                if (response.data.length > 0) {
                    setMassoTab(response.data);
                } else {
                    setMassoTab([]);
                }

            })
            .catch(error => alert(error));
    }

    const getDisponibilites = (idPersonnel) => {
        axios.get(strNomApplication5 + `/${idPersonnel}`)
            .then((response) => {
                //alert("La réponse horaireTravail : " + JSON.stringify(response.data));
                if (response.data.status === true) {
                    /*const disponibiliteFinale = response.data.horairesDeTravail.map((dispo) => {
                        return {
                            daysOfWeek: dispo.daysOfWeeks,
                            startTime: dispo.startTime,
                            endTime: dispo.endTime
                        }
                    });
                    alert("La réponse horaireTravailFinal : " + JSON.stringify(disponibiliteFinale));*/
                    setDisponibilites(response.data.horairesDeTravail);
                } else {
                    setDisponibilites({});
                }

            })
            .catch(error => alert(error));
    }

    const getClients = () => {
        axios.get(strNomApplication4)
            .then((response) => {
                console.log("La réponse : " + JSON.stringify(response.data));
                setClientsTab(response.data['clients']);
            })
            .catch(error => alert(error))
    }

    const getReservationMasso = (idPersonnel) => {
        //Récup de réservations du masso
        let strDossierServeur = "https://dev.pascalrocher.com";
        let strNomApplication = strDossierServeur + "/api/rendezvous";

        let objReservation = { idPersonnel: `${idPersonnel}` };

        //
        alert("vérif id personnel"+JSON.stringify(objReservation));

        axios.post(strNomApplication, JSON.stringify(objReservation), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log("La réponse: " + JSON.stringify(response));
                if (response.data.status === true) {
                    //alert(JSON.stringify(response.data));
                    setRendezVous(response.data.reservations);
                    setInitialData(response.data.reservations.map((reservation) => {

                        if (reservation.idClient !== null && reservation.etat !== 0) {
                            return {
                                id: reservation.id,
                                title: reservation.nomService,
                                //groupeId: reservation.idClient === null ? "indisponibilite" : "horaireNormal",
                                start: reservation.date + `T${reservation.heureDebut}`,
                                end: reservation.date + `T${reservation.heureFin}`,
                                extendedProps: {
                                    id: reservation.id,
                                    reservation: reservation.reservation, // numéro de réservation
                                    idService: reservation.idService,
                                    nomService: reservation.nomService,
                                    idDuree: reservation.idDuree,
                                    idPersonnel: reservation.idPersonnel,
                                    dateRes: reservation.date,
                                    heureDebut: reservation.heureDebut,
                                    heureFin: reservation.heureFin,
                                    idClient: reservation.idClient,
                                    prenom: reservation.prenom,
                                    nom: reservation.nom,
                                }
                                //constraint: reservation.idClient === null ? "indisponibilite" : 'businessHours',
                                //display: 'background',
                                //backgroundColor: 'blue'
                                //textColor: 'red'
                            }
                        }

                        else if (reservation.etat !== 0) {
                            return {
                                id: reservation.id,
                                groupId: 'indisponibilites',
                                title: "indisponible",
                                //groupeId: reservation.idClient === null ? "indisponibilite" : "horaireNormal",
                                start: reservation.date + `T${reservation.heureDebut}`,
                                end: reservation.date + `T${reservation.heureFin}`,
                                //constraint: reservation.idClient === null ? "indisponibilite" : 'businessHours',
                                //display: 'background',
                                //backgroundColor: 'blue'
                                //textColor: 'red'
                                overlap: false,
                                display: 'background',
                                color: '#ff9f89',
                                textColor: 'black',
                                //editable: false
                            }
                        }
                    }))
                    /*dispatch(setDateChoisie(value.format("dddd, DD MMM YYYY")));
                    console.log("setDateChoisie: " + value.format());*/
                }
                else {

                    setRendezVous([]);
                    setInitialData([]);
                }
            })
            .catch((error) => {
                alert(error.response);
            });


    }

    useEffect(() => {

        //recup des services
        axios.get(strNomApplication3)
            .then((response) => {
                console.log("La réponse : " + JSON.stringify(response.data));
                setServicesTab(response.data);
            })
            .catch(error => alert(error))

        //recup des durées
        axios.get(strNomApplication)
            .then((response) => {
                console.log("La réponse durée : " + JSON.stringify(response.data));
                setDureeTab(response.data);
            })
            .catch(error => alert(error));

        getClients();

        // recup selon masso et non secretaire
        if (connexionData.typePersonnel === "Massothérapeute") {
            getReservationMasso(connexionData.idPersonnel);
            getDisponibilites(connexionData.idPersonnel);
        }

        if (connexionData.typePersonnel === "Massothérapeute") {
            setObjReservationPersonnel({ ...objReservationPersonnel, idPersonnel: connexionData.idPersonnel });
        }
    }, [])

    const handleChangeService = (event) => {
        const tab = event.target.value.split("-");

        //recup des masso
        getMasso(tab[0]);

        setServiceChoisi({ id: tab[0], nomService: tab[1] });
        setObjReservationPersonnel({ ...objReservationPersonnel, idService: tab[0] });

    };

    const handleChangeClient = (event) => {
        const tab = event.target.value.split("-");
        setClientChoisi({ id: tab[0], prenom: tab[1], nom: tab[2] });
        setObjReservationPersonnel({ ...objReservationPersonnel, idClient: tab[0] })
    };

    console.log("ObjReservation Personnel" + JSON.stringify(objReservationPersonnel));

    const handleChangeDuree = (event) => {
        const tab = event.target.value.split("-");
        console.log('Dureetab ' + tab)
        dispatch(setObjetReservationIdDuree(tab[0]));
        dispatch(setDureeChoisie(tab[1]));
        dispatch(setPrix(tab[2]));
        setDureeChoisiePersonnel({ id: tab[0], duree: tab[1], prix: tab[2] });
        setObjReservationPersonnel({ ...objReservationPersonnel, idDuree: tab[0] });
        console.log("la duree choisie est : " + tab[1])
    };

    const handleChangeMasso = (event) => {
        const tab = event.target.value.split("-");
        dispatch(setObjetReservationIdPersonnel(tab[0]));
        dispatch(setNomMassoChoisi(`${tab[1]} ${tab[2]}`));
        setMassoChoisi({ id: tab[0], nom: `${tab[1]} ${tab[2]}` });
        setObjReservationPersonnel({ ...objReservationPersonnel, idPersonnel: tab[0] });
        console.log("le masso choisi est : " + tab[1] + " " + tab[2]);
        getDisponibilites(tab[0]);
        getReservationMasso(tab[0]);
    }




    //alert(initialData);



    return (
        <Container>
            <div>

                {/* <div class="p-2">Flex item 1</div>
  <div class="p-2">Flex item 2</div>
  <div class="p-2">Flex item 3</div> */}
                {/* </div> */}

                <div style={{ alignContent: "center" }}>
                    <Paper >
                        {(connexionData.typePersonnel === 'Massothérapeute') ? <div className='float-end mt-2'>{<Button variant="primary" >
                            Ajouter horaire de travail
                        </Button>}</div> : ""}

                        <Form className='transparent-background pt-5'>
                            <div className="d-flex flex-row justify-content-between">
                                <div className='pl-2 pr-2 pt-2 pb-4'>
                                    <Form.Group >
                                        <div className='text-start mleft-6 mt-2'>Client</div>
                                        <Form.Select id='idDuree' onChange={(e) => { handleChangeClient(e) }}>
                                            <option value={0}>Veuillez choisir votre client svp</option>
                                            {clientsTab.map((client) => {
                                                //const { id, nom, prix, estActif } = client;

                                                if (client.estActif === 1) {
                                                    return <option value={`${client.id}-${client.prenom}-${client.nom}`} key={`${client.id}`}>{`${client.prenom} ${client.nom}`}</option>
                                                }

                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className='pl-2 pr-2 pt-2 pb-4'>
                                    <Form.Group >
                                        <div className='text-start mleft-6 mt-2'>Service</div>
                                        <Form.Select id='idPersonnel' name="idPersonnel"
                                            onChange={handleChangeService}>
                                            <option value={0}>Veuillez choisir un service svp</option>
                                            {servicesTab.map((service) => {
                                                return <option key={service.id} value={`${service.id}-${service.nomService}`}>
                                                    {service.nomService}</option>
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <div className='pl-2 pr-2 pt-2 pb-4'>
                                    <Form.Group>
                                        <div className='text-start mleft-6 mt-2'>Durée</div>
                                        <Form.Select id='idDuree' onChange={(e) => { handleChangeDuree(e) }}>
                                            <option value={0}>Veuillez choisir une durée svp</option>
                                            {dureeTab.map((data) => {
                                                const { id, duree, prix, estActif } = data;
                                                if (estActif === 1) {
                                                    return <option value={`${id}-${duree}-${prix}`} key={`S${id}`}>{`${duree}min (+ $${prix})`}</option>
                                                }

                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                {(connexionData.typePersonnel !== 'Massothérapeute') ? <div className='pl-2 pr-2 pt-2 pb-4'>
                                    <Form.Group>
                                        <div className='text-start mleft-6 mt-2'>Massothérapeute</div>
                                        <Form.Select id='idPersonnel' name="idPersonnel"
                                            onChange={handleChangeMasso}>
                                            <option value={0}>Veuillez choisir un massothérapeute svp</option>
                                            {massoTab.map((masso) => {
                                                return <option key={`M${masso.id}`} value={`${masso.id}-${masso.prenom}-${masso.nom}`}>{`${masso.prenom} ${masso.nom}`}</option>
                                            })}
                                        </Form.Select>
                                    </Form.Group>
                                </div> : ''}

                            </div>
                        </Form>
                    </Paper>
                    <Agenda rendezVous={rendezVous} initialData={initialData} objReservationPersonnel={objReservationPersonnel} massoChoisi={massoChoisi} serviceChoisi={serviceChoisi} clientChoisi={clientChoisi} dureeChoisiePersonnel={dureeChoisiePersonnel} getReservationMasso={getReservationMasso} disponibilites={disponibilites} />
                </div>



            </div>
        </Container>
    )
}
