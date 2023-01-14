import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import ReservationCard from './ReservationCard';
import ConfirmDialog from './Admin/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { setTabReservation, selectTabReservation } from '../app/features/reservationSlice';
import { selectConnexionData } from '../app/features/connexionSlice';
import { useNavigate } from 'react-router-dom';
import { getYear } from 'date-fns';
import { Paper, Grid } from '@mui/material';
import PageModifierReservation from './CommonFiles/PageModifierReservation';

export default function PageVosReservations() {
  const tabReservations = useSelector(selectTabReservation);
  const connexionData = useSelector(selectConnexionData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [annulerMsg, setAnnulerMsg] = useState();
  const [reservationId, setReservationId] = useState();
  const [showModRes, setShowModRes] = useState(false);
  const [showData, setShowData] = useState({});


  
  

 

  useEffect(() => {
    if (JSON.stringify(connexionData) === "{}") {
      navigate('/connexion');
    }
  })

  let strDossierServeur = "https://dev.pascalrocher.com";
  let strNomApplication = strDossierServeur + "/api/rendezvous";

  const getReservations = () => {
    axios.post(strNomApplication, { "idClient": connexionData.idClient })
        .then((response) => {
          if(response.data.status === true) {
             console.log("idClient="+connexionData.idClient+" La réponse /api/rendezvous: " + JSON.stringify(response.data.reservations));
             dispatch(setTabReservation(response.data.reservations));
          }
        })
        .catch(error => alert(error))
  }

  useEffect(() => {
    getReservations();
  }, []);

  

  const Reservation = () => {
    console.log("DANS LE FRAGMENT REACT RESERVATION " + tabReservations.length);
    if (tabReservations.length > 0) {
      console.log("length" + tabReservations.length)
      return tabReservations.map(rdv => {
        return (       
          <div className="mtop-40" key={rdv.reservation}>
            <ReservationCard  
            dateRes={rdv.date} 
            idPersonnel={`${rdv.idPersonnel}`} 
            prenomNomPersonnel={`${rdv.prenom} ${rdv.nom}`} 
            idService={rdv.idService} 
            nomService={rdv.nomService} 
            idDuree={`${rdv.idDuree}`}
            duree={`${rdv.duree} mn`} 
            prix={`${rdv.prix}`} 
            reservation={rdv.reservation} 
            heureDebut={rdv.heureDebut}
            rdv={rdv}
            openConfirmDialog={openConfirmDialog}
            openPageModifierReservation={openPageModifierReservation}
            />
          </div>            
        )
      }
      )
    }
    else {
      return <p>Vous n'avez aucune réservation actuellement</p>
    }
  }



  const openConfirmDialog = (rdv) => {
    console.log("In OpenDialog")
    setReservationId(rdv.reservation);
    console.log("Type Personnel: ", connexionData.typePersonnel)

    if (connexionData.idClient !== null && connexionData.idClient !== undefined) {

      setAnnulerMsg(`Êtes-vous certain de vouloir annuler votre réservation numéro ${rdv.reservation} pour le ${rdv.nomService} avec ${rdv.prenom}  ${rdv.nom} le ${rdv.date}?`);
    }
    else if (connexionData.idPersonnel !== null && connexionData.idPersonnel !== undefined && connexionData.typePersonnel === "Secrétaire") {

      setAnnulerMsg(`Êtes-vous certain de vouloir annuler cette réservation? \n Réservation : ${rdv.reservation} \n Client : ${rdv.prenom} ${rdv.nom} \n Service: ${rdv.nomService} \n Massothérapeute : ${rdv.prenom}  ${rdv.nom} \n Date :  ${rdv.date}`);
    }
    else if (connexionData.idPersonnel !== null && connexionData.idPersonnel !== undefined && connexionData.typePersonnel === "Massothérapeute") {

      setAnnulerMsg(`Êtes-vous certain de vouloir annuler cette réservation? \n Réservation : ${rdv.reservation} \n Client : ${rdv.prenom} ${rdv.nom} \n Service: ${rdv.nomService} \n Date :  ${rdv.date}`);
    }
    setOpen(true);
    console.log("Open = ", open);
  }

  const openPageModifierReservation = (rdv) => {
    console.log("In OpenDialog")
    setReservationId(reservationId);
    setShowData({ reservation: rdv.reservation, idService: rdv.idService, idPersonnel: rdv.idPersonnel, 
      idDuree: rdv.idDuree, dateRes: rdv.date, heureDebut: rdv.heureDebut });
    setShowModRes(true);
    console.log("OpenPageModifierReservation = ", open);
  }


  const handleModifierReservation = (data) => {
     console.log("Modifier reservation");
  }

  const handleAnnuler = () => {
    console.log("handleAnnuler: ", reservationId);

  }

  const handleClickRetour = () => {
    navigate("/");
  }



  return (
    <Container className={"m-5 mx-auto"}>
      {/* <Grid container>
      <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Paper className='whitesmoke p-20'> */}
      <Row className='justify-content-center'>
        <Col xs={4}>
          <h4 className=" justify-content-center mtop-20" id="titleMsg">Vos réservations</h4>
          <Reservation />
        </Col>
      </Row>
      {/* </Paper> */}
      <Row className='justify-content-center'>
        <Col>
          <Button className="mtop-40" onClick={handleClickRetour} variant="primary">Retour à l'accueil</Button>
        </Col>
      </Row>
      {/*       
      </Grid>
      </Grid> */}
      
      <ConfirmDialog
        title={annulerMsg}
        txtCancel="Non"
        txtConfirm="Oui"
        open={open}
        setOpen={setOpen}
        callbackData={handleAnnuler}
      />


      <PageModifierReservation
         data={showData}
         show={showModRes}
         setShow={setShowModRes}
         callbackFunc={handleModifierReservation}
      />
    </Container>
  )
}  