import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import Moment from 'moment';
import 'moment/min/locales';
import axios from 'axios';
import { selectAffichageChoixServices, setAffichageChoixServices, setAffichageChoixDureeEtMasso, selectAffichageChoixDureeEtMasso, selectObjReservation, setObjetReservationIdService, selectNomServiceChoisi, selectDureeChoisie, setDureeChoisie, selectNomMassoChoisi, setNomMassoChoisi, setObjetReservationIdDuree, setObjetReservationIdPersonnel, setAffichageReservation, selectAffichageReservation, setObjetReservationDate, setHeureChoisie, selectHeureChoisie, selectDateChoisie, selectPrix, setPrix, selectAffichageConfirmation, setAffichageConfirmation, selectAffichageAvantConfirmation } from '../app/features/reservationSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function PageRdvConfirme({ numeroReservation }) {
  const nomServiceChoisi = useSelector(selectNomServiceChoisi);

  const dateChoisie = useSelector(selectDateChoisie);

  const strDossierServeur = "https://dev.pascalrocher.com";


  const prix = useSelector(selectPrix);

  const navigate = useNavigate();

  // Test data
  const client_id = 1;
  const numeroRdv = 281952683;


  const rdvs = [
    {
      id: 1,
      date: "2022-12-5",
      stime: "11:00",
      duree: 60,
      service: "Massage thérapeutique",
      prix: 100.20,
      masso: "Oldie Gosselin"
    }
  ]

  const [client, setClient] = useState([]);

  const GetClient = (id) => {
    let strNomApplication = strDossierServeur + `/api/client/${id}`;

    axios.get(strNomApplication, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        // Convert JSON into array object
        var arr = [];
        arr.push(response.data[0]);
        setClient(arr)
      })
      .catch((error) => console.log(error));
  }

  let getDow = (dateStr) => {
    const dow = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
    const date = Moment(dateStr);
    return dow[date.day()];
  }

  const handleClickMenu = () => {
    navigate('/accueil')
  }

  Moment.locale('fr');
  //GetClient(client_id); 
  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={8}>
          <Form>
            
                <Card className="text-aleft mb-2">
                  <Card.Header className='p-2'>
                    {nomServiceChoisi}<br />
                    {dateChoisie}<br />
                  </Card.Header>
                </Card>
            
            <Row className='p-1 mt-1'>
              <Col>Rendez-vous confirmé</Col>
            </Row>
            <Row className='p-1'>
              <Col className='text-end' xs={6}>Numéro de réservation:</Col>
              <Col className="text-aleft" xs={6}>{numeroReservation}</Col>
            </Row>
            <Row className='p-1'>
              <Col className='text-end' xs={6}>Prix total:</Col>
              <Col className="text-aleft" xs={6}>${prix}</Col>
            </Row>

            <Card className="text-aleft mt-2">
              <Card.Header className='p-1'>
                <Card.Text>Un courriel électronique a été envoyé à 'email' avec touts les détails de la réservation</Card.Text>
              </Card.Header>
            </Card>
            <Card className="text-aleft mt-2">
              <Card.Header className='p-1'>
                <Card.Text>Si vous ne le trouvez pas dans votre boite aux lettres sous peu, veuillez vérifier le
                  dossier des courriers indésirables</Card.Text>
              </Card.Header>
            </Card>

            <Form.Group className="mt-4">
              <Button variant='primary' onClick={handleClickMenu}>Retour à l'accueil</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )  // end return
}  // end export      