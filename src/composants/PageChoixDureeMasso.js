import React, { useState, useEffect } from 'react';
import { Container, Button, Row, Col, Form } from 'react-bootstrap';
import {  setAffichageChoixDureeEtMasso, selectObjReservation, selectNomServiceChoisi, setDureeChoisie, setNomMassoChoisi, setObjetReservationIdDuree, setObjetReservationIdPersonnel, setAffichageReservation, setPrix } from '../app/features/reservationSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import axios from 'axios';

export default function PageChoixDureeMasso() {
    const [dureeTab, setDureeTab] = useState([]);
    const [massoTab, setMassoTab] = useState([]);
    const nomServiceChoisi = useSelector(selectNomServiceChoisi);
    const objReservation = useSelector(selectObjReservation);
    const dispatch = useDispatch();

    const [selectDuree, setSelectDuree] = useState(0);
    const [selectMasso, setSelectMasso] = useState(0);
    const [dureeInvalid, setDureeInvalid] = useState(false);
    const [massoInvalid, setMassoInvalid] = useState(false);      

    console.log("dans choixMasso : " + JSON.stringify(objReservation))

    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/durees";
    let strNomApplication2 = strDossierServeur + "/api/servicespersonnels";

    useEffect(() => {
        //recup des durées
        axios.get(strNomApplication)
            .then((response) => {
                console.log("La réponse durée : " + JSON.stringify(response.data));
                setDureeTab(response.data);
            })
            .catch(error => alert(error));

        //recup des masso
        axios.get(strNomApplication2 + `/${objReservation.idService}`)
            .then((response) => {
                console.log("La réponse masso : " + JSON.stringify(response.data));
                setMassoTab(response.data);
            })
            .catch(error => alert(error));
    }, [])

    const handleChangeDuree = (event) => {
        setSelectDuree(parseInt(event.target.value));

        const tab = event.target.value.split("-");
        dispatch(setObjetReservationIdDuree(tab[0]));
        dispatch(setDureeChoisie(tab[1]));
        dispatch(setPrix(tab[2]));
        console.log("la duree choisie est : " + tab[1])
    }

    const handleChangeMasso = (event) => {
        setSelectMasso(parseInt(event.target.value));

        const tab = event.target.value.split("-");
        dispatch(setObjetReservationIdPersonnel(tab[0]));
        dispatch(setNomMassoChoisi(`${tab[1]} ${tab[2]}`))
        console.log("le masso choisi est : " + tab[1] + " " + tab[2])
    }

    const validateForm = () => {
        // console.log("selectDuree="+selectDuree+" selectMasso="+selectMasso);
        let isValid=true;
        setDureeInvalid(false); 
        setMassoInvalid(false); 
  
        if (selectDuree === 0) {  // Pas selection. Value=0
           setDureeInvalid(true);
           isValid=false;
        }
  
        if (selectMasso === 0) {  // Pas selection. Value=0
           setMassoInvalid(true);
           isValid=false;
        }
  
        return isValid; 
    }    

    const handleClickSuivant = () => {
        if (validateForm()) {
           dispatch(setAffichageChoixDureeEtMasso(false));
           dispatch(setAffichageReservation(true));
        }
    }

    return (
        <Container className='mt-5'>
            <Row className='justify-content-center'>
                <Col xs={6}>
                    <Form>
                        <Form.Group>
                            <Form.Control placeholder={nomServiceChoisi} disabled />
                        </Form.Group>

                        <Form.Group>
                           <div className='text-start mt-4 text-primary'>Durée</div>
                           <Form.Select id='idDuree' isInvalid={dureeInvalid} onChange={(e) => { handleChangeDuree(e) }}>
                              <option value={0}>Veuillez choisir une durée svp</option>
                              {dureeTab.map((data) => {
                                  const { id, duree, prix, idService } = data;
                                  return <option value={`${id}-${duree}-${prix}`} key={`S${id}`}>{`${duree}min (+ $${prix})`}</option>
                              })}
                           </Form.Select>
                           <Form.Control.Feedback type="invalid" className='text-start'>
                                Veuillez choisir une durée
                           </Form.Control.Feedback>                            
                        </Form.Group>

                        <Form.Group>
                           <div className='text-start mt-3 text-primary'>Massothérapeute</div>
                           <Form.Select id='idMasso' isInvalid={massoInvalid} onChange={(e) => { handleChangeMasso(e) }}>
                              <option value={0}>Veuillez choisir un massothérapeute svp</option>
                              {massoTab.map((masso) => {
                                 return <option key={`M${masso.id}`} value={`${masso.id}-${masso.prenom}-${masso.nom}`}>{`${masso.prenom} ${masso.nom}`}</option>
                              })}
                           </Form.Select>
                           <Form.Control.Feedback type="invalid" className='text-start'>
                                Veuillez choisir un massothérapeute
                           </Form.Control.Feedback>                            
                        </Form.Group>

                        <Form.Group className="mt-4">
                            <Button variant='primary' onClick={handleClickSuivant}>Suivant</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>
    ) 
}  
