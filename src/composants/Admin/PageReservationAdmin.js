import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectObjReservation, setObjetReservationIdPersonnel, setNomMassoChoisi } from '../../app/features/reservationSlice';
import Calendrier from '../Calendrier';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';


export default function PageReservationAdmin() {
    const pageName = "PageReservationAdmin";


    const noDispoMsg = "Aucun disponibilité pour cette date";

    const [serviceTab, setServiceTab] = useState([]);
    const [dureeTab, setDureeTab] = useState([]);
    const [massoTab, setMassoTab] = useState([]);
    const [disponibiliteTab, setDisponibiliteTab] = useState([]);
    //const objReservation = useSelector(selectObjReservation);
    //const dispatch = useDispatch();

    const [service, setService] = useState('');
    const [duree, setDuree] = useState('');
    const [masso, setMasso] = useState('');
    const [dateRes, setDateRes] = useState('');
    const [heureRes, setHeureRes] = useState('');
    const [heureDebut, setHeureDebut] = useState('');
    const [heureFin, setHeureFin] = useState('');
    const [show, setShow] = useState(true);

    let strDossierServeur = "https://dev.pascalrocher.com";
    let strAppServices = strDossierServeur + "/api/services";
    let strAppDuree = strDossierServeur + "/api/durees";
    let strAppPersonnels = strDossierServeur + "/api/servicespersonnels";
    let strAppRdv = strDossierServeur + "/api/rendezvous";

    useEffect(() => {
        //recup des massages
        axios.get(strAppServices)
            .then((response) => {
                console.log("PageReservationAdmin. La réponse services : " + JSON.stringify(response.data));
                setServiceTab(response.data);
            })
            .catch(error => alert(error));

        //recup des durées
        axios.get(strAppDuree)
            .then((response) => {
                //console.log("PageModifierReservation. La réponse durée : " + JSON.stringify(response.data));
                setDureeTab(response.data);
            })
            .catch(error => alert(error));


        if (service) {
            //recup des masso
            let strAppUrl = strAppPersonnels + `/${service}`;
            //console.log("idService="+data.idService+" strAppUrl="+strAppUrl);
            axios.get(strAppUrl)
                .then((response) => {
                    //console.log("PageModifierReservation. La réponse masso : " + JSON.stringify(response.data));
                    setMassoTab(response.data);
                })
                .catch(error => alert(error));
        }
    }, [service])

    const initForm = () => {
      
       setDuree("");
       setMasso("");
       setDateRes("");

       
    }

    const handleChangeDateRes = (epochDate) => {      
        let dateSelected = new Date(epochDate);
        const formattedDate = dateSelected.toISOString().split('T')[0];
        console.log("formattedDate " + formattedDate);        
        setDateRes(formattedDate);
        console.log(pageName + " La date choisi: " + formattedDate);
        console.log(pageName + " La date dateRes: " + dateRes);
        getDisponibilite(formattedDate);
    }

    const getDisponibilite = (dateRes) => {
        console.log("In getDisponibilite : date passed is ", dateRes )
        let objReservation = {
            "date": dateRes,
            "idService": service,
            "idPersonnel": masso,
            "idDuree": duree
        }

        console.log(pageName + " In getDisponibilite objReservation " + JSON.stringify(objReservation));
        axios.post(strAppRdv, JSON.stringify(objReservation), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log(pageName + " La réponse des disponibilites: " + JSON.stringify(response));
                if (response.data.length > 0) {
                    setDisponibiliteTab(response.data);
                } else {
                    setDisponibiliteTab([]);
                }
            })
            .catch((error) => {
                alert(error.response);
            });
    }

    const handleChangeService = (event) => {
        const nomService = event.target.value;
        setService(nomService);
        //console.log(pageName+" Le duree choisi: id="+duree);
    }

    const handleChangeDuree = (event) => {
        const duree = event.target.value;
        setDuree(duree);
        //console.log(pageName+" Le duree choisi: id="+duree);
    }

    const handleChangeMasso = (event) => {
        const masso = event.target.value;
        setMasso(masso);
        //console.log(pageName+" Le masso choisi: id="+masso);
    }

  

    const handleChangeHeureRes = (event, heureDebut, heureFin) => {
        const heure = event.target.value;
        const { target: { value } } = event;
        setHeureRes(heure);
        setHeureDebut(heureDebut)
        setHeureFin(heureFin);
        console.log(pageName + " In handleChangeHeureRes - L'heure choisi: " + heure + " Heure Fin: " + heureFin + "Value: ", value, heureDebut, heureFin);
    }

    const handleAjouter = (event) => {
        // date, heureDebut, heureFin, idService, idDuree, idPersonnel
       const data = {
        date : dateRes,
        heureDebut : heureDebut,
        heureFin : heureFin,
        idService : service,
        idDuree : duree,
        idPersonnel : masso
       }
        console.log("data",data);
        //use axios to save data to API
        //after succesfully saved
        setShow(false);
        
        initForm();
        }
    
    // isConfirm=true (Button Confirm clicked). False=Button Cancel clicked
    function onModalClose(isConfirm) {
        setShow(false);
        if (isConfirm) {
            //    callbackFunc("data"); 
        }
    }

    return (
        <Modal
            show={show}
             onHide={() => setShow(false)}  
            //  onShow={initForm}  
            backdrop="static"
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Ajouter une réservation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* <div>Numéro de réservation: {data.reservation}</div>
              <div>Duree: {duree}</div>
              <div>idPersonnel: {masso}</div> */}

                    <div className='text-start mt-2'>Massages</div>
                    <Form.Select id='idService' onChange={(e) => { handleChangeService(e) }}>
                        <option value={0}>Veuillez choisir un massage svp</option>
                        {serviceTab.map((data) => {
                            const { id, nomService, description, estActif } = data;
                            if (estActif === 1) {
                                return <option value={id} key={id}>
                                    {`${nomService}`}</option>
                            }
                        })}
                    </Form.Select>

                    <div className='text-start mt-2'>Durée</div>
                    <Form.Select id='idDuree' onChange={(e) => { handleChangeDuree(e) }}>
                        <option value={0}>Veuillez choisir une durée svp</option>
                        {dureeTab.map((data) => {
                            const { id, duree, prix, estActif } = data;
                            if (estActif === 1) {
                                return <option value={id} key={id}>
                                    {`${duree}min (+ $${prix})`}</option>
                            }
                        })}
                    </Form.Select>

                    <div className='text-start mt-2'>Massothérapeute</div>
                    <Form.Select id='idMasso' onChange={(e) => { handleChangeMasso(e) }}>
                        <option value={0}>Veuillez choisir un massothérapeute svp</option>
                        {massoTab.map((masso) => {
                            return <option key={masso.id} value={masso.id}>
                                {`${masso.prenom} ${masso.nom}`}</option>
                        })}
                    </Form.Select>

                    <div className='text-start mt-2'>Cliquer pour choisir une date de réservation</div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileDatePicker
                            label="Choisir une date"
                            inputFormat="YYYY-MM-DD"
                            value={dateRes}
                            onChange={handleChangeDateRes}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <InputGroup>
                        {/* <Form.Control type='text' id="idDateRes" value={dateRes} onChange={(e) => handleChangeDateRes(e)} required /> */}
                        {/* <Button id="idDateResBtn" variant="secondary" onClick={() => getDisponibilite()}>Changer Date</Button> */}
                    </InputGroup>

                    {disponibiliteTab.length > 0 ? <Form.Select className="mt-2" id='idDateResSel' onChange={(e) => { handleChangeHeureRes(e, heureDebut, heureFin) }}>
                        <option value={0}>Veuillez choisir un disponibilité</option>
                        {disponibiliteTab.map((dispo) => {
                            // setHeureDebut(dispo.heureDebut);
                            // setHeureFin(dispo.heureFin);
                            return <option key={dispo.heureDebut} value={dispo.heureDebut}>
                                {dispo.heureDebut}</option>
                                
                                
                                

                        })}
                    </Form.Select>
                        : <div className='text-center mt-2'>{noDispoMsg}</div>}
                </Form>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={() => onModalClose(false)}>
                    Annuler
                </Button>
                <Button variant="primary" onClick={handleAjouter}>
                    Ajouter la réservation
                </Button>
            </Modal.Footer>
        </Modal>
    )
}  // end function