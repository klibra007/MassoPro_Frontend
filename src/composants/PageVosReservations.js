import React from 'react';
// import React, { useEffect, useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
// import axios from 'axios';
import ReservationCard from './ReservationCard';

export default function PageVosReservations() {

  // const [resultat, setResultat] = useState([]);

  // let strDossierServeur = "https://dev.pascalrocher.com";
  // let strNomApplication = strDossierServeur + "/api/rendezvous/4"; // this route wihtout idClient in JSON returns only the rendezvous

  // alert(strNomApplication);

  // const client_id = 2;

  const rdvs = [
    {
      id: 4,
      date: "2022-11-27",
      heureDebut: "09:00:00",
      heureFin: "09:30:00",
      etat: 1,
      reservation: "950175412",
      idService: 1,
      idDuree: 1,
      idClient: 2,
      idPersonnel: 1,
      created_at: "2022-11-22T14:55:44.000000Z",
      updated_at: "2022-11-22T14:55:44.000000Z",
      prenom: "Jacques",
      nom: "Martin",
      duree: 30,
      prix: "75.00"
    },
    {
      id: 5,
      date: "2022-11-27",
      heureDebut: "09:30:00",
      heureFin: "10:00:00",
      etat: 1,
      reservation: "710336704",
      idService: 1,
      idDuree: 1,
      idClient: 2,
      idPersonnel: 1,
      created_at: "2022-11-22T15:07:41.000000Z",
      updated_at: "2022-11-22T15:07:41.000000Z",
      prenom: "Jacques",
      nom: "Martin",
      duree: 30,
      prix: "75.00"
    }
  ]
  // axios.get(strNomApplication)
  //     .then((response) => {alert(JSON.stringify(response.data));  setResultat(response.data); }) 
  //     .catch((error) => console.log(error));

  // alert("Date: " + JSON.stringify(resultat.reservation.date));

  
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={3}>
          <h4 className="mb-3 justify-content-center" id="titleMsg">Vos réservations</h4>
          {rdvs.map(rdv => {
            return (
              <>
              <ReservationCard key={rdv.id} date={rdv.date} idPersonnel={rdv.idPersonnel} idService={rdv.idService} duree={rdv.duree} prix={rdv.prix} reservation={rdv.reservation} />
              <Button className="mright-16"variant="primary">Annuler</Button> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button className="mright-16"variant="primary">Modifier</Button> <br/><br/><br/>
              </>
              )
          }


          )}
        </Col>
      </Row>
      <Row className='justify-content-center'>
        <Col>
          <Button variant="primary">Retour au menu</Button>
        </Col>
      </Row>
    </Container>
  )  // end return
}  // end export