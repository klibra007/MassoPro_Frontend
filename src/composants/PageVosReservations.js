import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
// import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
import ReservationCard from './ReservationCard';
import { useDispatch, useSelector } from 'react-redux';
import { selectAffichageChoixServices, setAffichageChoixServices, setAffichageChoixDureeEtMasso, selectAffichageChoixDureeEtMasso, selectObjReservation, setObjetReservationIdService, selectNomServiceChoisi, selectDureeChoisie, setDureeChoisie, selectNomMassoChoisi, setNomMassoChoisi, setObjetReservationIdDuree, setObjetReservationIdPersonnel, setAffichageReservation, selectAffichageReservation, setObjetReservationDate, setHeureChoisie, selectHeureChoisie, setTabReservation, selectTabReservation } from '../app/features/reservationSlice';
import { selectConnexionData } from '../app/features/connexionSlice';
import { useNavigate } from 'react-router-dom';

export default function PageVosReservations() {
  const tabReservations = useSelector(selectTabReservation);
  const connexionData = useSelector(selectConnexionData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (JSON.stringify(connexionData) === "{}") {
      navigate('/');
    }
  })
  
  let strDossierServeur = "https://dev.pascalrocher.com";
  let strNomApplication = strDossierServeur + "/api/rendezvous";

  useEffect(()=>{
      axios.post(strNomApplication, { "idClient": connexionData.idClient })
        .then((response) => {
          //alert("La réponse : " + JSON.stringify(response.data.reservations));
          //setTabReservations(response.data);
          //setTabReservations(response.data);
          //setServicesTab(response.data);
          dispatch(setTabReservation(response.data.reservations));
        })
        .catch(error => alert(error))
  },[]);


  const Reservation = () => {
    console.log("DANS LE FRAGMENT REACT RESERVATION " + tabReservations.length);
    
    if (tabReservations.length > 0) {
      console.log("length" + tabReservations.length)
      return tabReservations.map(rdv => {
        return (
          <div key={rdv.reservation}>
            <ReservationCard  date={rdv.date} idPersonnel={`${rdv.prenom} ${rdv.nom}`} idService={rdv.nomService} duree={`${rdv.duree} mn`} prix={`${rdv.prix}`} reservation={rdv.reservation} heure={rdv.heureDebut} />
            <Button className="mright-16" variant="primary">Annuler</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button className="mright-16" variant="primary">Modifier</Button> <br /><br /><br />
          </div>
        )
      }
      )
    }
    else {
      return <p>Vous n'avez aucune réservation actuellement</p>
    }
  }

  const handleModifier = () => {

  }

  const handleAnnuler = () => {

  }

  const handleClickRetour = () => {
    navigate("/accueil");
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={3}>
          <h4 className="mb-3 justify-content-center" id="titleMsg">Vos réservations</h4>
          <Reservation />
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col>
          <Button onClick={handleClickRetour} variant="primary">Retour à l'accueil</Button>
        </Col>
      </Row>
    </Container>
  )  // end return
}  // end export