import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import ReservationCard from './ReservationCard';
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

  useEffect(()=>{
    getReservations();
  },[]);


  const Reservation = () => {
    console.log("DANS LE FRAGMENT REACT RESERVATION " + tabReservations.length);
    if (tabReservations.length > 0) {
      console.log("length" + tabReservations.length)
      return tabReservations.map(rdv => {
        return (       
          <div className="mtop-40" key={rdv.reservation}>
            <ReservationCard  date={rdv.date} idPersonnel={`${rdv.prenom} ${rdv.nom}`} idService={rdv.nomService} duree={`${rdv.duree} mn`} prix={`${rdv.prix}`} reservation={rdv.reservation} heure={rdv.heureDebut} />
            <div>
              <Button className="mt-2" variant="primary">Annuler</Button>
              <Button className="mt-2 mleft-16" variant="primary" onClick={() => {
                       setShowData({ reservation: rdv.reservation, idService: rdv.idService, idPersonnel: rdv.idPersonnel, idDuree: rdv.idDuree });
                       setShowModRes(true);                       
                     }
                   }
                 >Modifier</Button>
            </div>
          </div>            
        )
      }
      )
    }
    else {
      return <p>Vous n'avez aucune réservation actuellement</p>
    }
  }

  const handleModifierReservation = (data) => {
     console.log("Modifier reservation");
  }

  const handleAnnuler = () => {

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
          <h4 className=" justify-content-center mtop-20"  id="titleMsg">Vos réservations</h4>
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

      <PageModifierReservation
         data={showData}
         show={showModRes}
         setShow={setShowModRes}
         callbackFunc={handleModifierReservation}
      />
    </Container>
  )  
}  