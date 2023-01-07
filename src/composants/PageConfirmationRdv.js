import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import {   selectObjReservation, selectNomServiceChoisi, selectDureeChoisie, selectNomMassoChoisi, selectHeureChoisie, selectDateChoisie, selectPrix, selectAffichageConfirmation, setAffichageConfirmation, setAffichageAvantConfirmation, selectAffichageAvantConfirmation } from '../app/features/reservationSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectConnexionData } from '../app/features/connexionSlice';
import PageRdvConfirme from './PageRdvConfirme';
import { Paper } from '@mui/material';

export default function PageConfirmationRdv() {

  const TPS = 0.05;

  const TVQ = 0.09975;

  const [numeroReservation, setNumeroReservation] = useState("");

  const objReservation = useSelector(selectObjReservation);

  const affichageConfirmation = useSelector(selectAffichageConfirmation);

  const affichageAvantConfirmation = useSelector(selectAffichageAvantConfirmation);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const connexionData = useSelector(selectConnexionData);

  const disponibilite = useSelector(selectHeureChoisie);

  const nomServiceChoisi = useSelector(selectNomServiceChoisi);

  const dateChoisie = useSelector(selectDateChoisie);

  const nomMassoChoisi = useSelector(selectNomMassoChoisi);

  const dureeChoisie = useSelector(selectDureeChoisie);

  const heureChoisie = useSelector(selectHeureChoisie);

  const prix = useSelector(selectPrix);

  //Pour rediriger à la page réservation quand on perd les informations de réservation suite à un refresh de la page
  useEffect(() => {
    if (nomServiceChoisi === "") {
      navigate('/reservation');
    }
  })

  const onClickConfirmer = () => {
    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/rendezvous";
    let objValidation = { ...objReservation, "idClient": `${connexionData.idClient}`, "heureDebut": `${disponibilite.heureDebut}`, "heureFin": `${disponibilite.heureFin}` }

    console.log(JSON.stringify(objValidation));


    axios.post(strNomApplication, JSON.stringify(objValidation), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => {
        console.log("La réponse: " + JSON.stringify(response));
        if (response.data.status === true) {
          setNumeroReservation(response.data.reservation);
          dispatch(setAffichageConfirmation());
          dispatch(setAffichageAvantConfirmation());
        }
      })
      .catch((error) => {
        alert("erreur:" + error.response);
      });
  }

  return (
    <>
      {affichageAvantConfirmation && <Container>
        <Row className='justify-content-center'>
          <Col xs={12}>
            
            <Form>
            <Paper className="p-20">
              <Card className="text-aleft">
                <Card.Header className='p-2'>
                  Service: {nomServiceChoisi}<br />
                  {dateChoisie}<br />
                  Massothérapeute: {nomMassoChoisi}<br />
                  Durée: {dureeChoisie} min
                </Card.Header>
              </Card>


              <Card className="text-aleft mt-1 mb-2">
                <Card.Header className='p-2'>
                  {connexionData.prenom} {connexionData.nom}<br />
                  {connexionData.courriel}<br />
                  {connexionData.telephone} <br />
                </Card.Header>
              </Card>

              <Row className='p-1 mt-1'>
                <Col>Votre réservation n'est pas encore confirmée.</Col>
              </Row>
              <Row className='p-1 mt-1'>
                <Col>Veuillez vérifier tous les détails de la réservation ci-dessous avant de continuer.</Col>
              </Row>

              <Card className="text-aleft mt-2">
                <Card.Header className='p-1'>
                  <Row>
                    <Col xs={7}>Description</Col>
                    <Col className="text-end" xs={2}>Prix unitaire</Col>
                    <Col className="text-center" xs={2}>Quantité</Col>
                    <Col className="text-end" xs={1}>Prix</Col>
                  </Row>
                </Card.Header>
              </Card>


              <>   {/* React Fragment  */}
                <Row className='text-aleft p-1'>
                  <Col><b>{dateChoisie} {heureChoisie.heureDebut}</b></Col>
                </Row>

                <Row className='text-aleft p-1'>
                  <Col xs={7}>Service: {nomServiceChoisi}</Col>
                  <Col className="text-end" xs={2}></Col>
                  <Col className="text-center" xs={2}>1</Col>
                  <Col className="text-end" xs={1}></Col>
                </Row>

                <Row className='text-aleft p-1'>
                  <Col xs={7}>Durée: {dureeChoisie} min</Col>
                  <Col className="text-end" xs={2}>${prix}</Col>
                  <Col className="text-center" xs={2}>1</Col>
                  <Col className="text-end" xs={1}>${prix}</Col>
                </Row>

                <Row className='p-1'>
                  <Col className="text-end" xs={11}><b>Total</b></Col>
                  <Col className="text-end" xs={1}><b>${prix}</b></Col>
                </Row>

                <Row className='text-aleft p-1 mb-1'>
                  <Col>Les taxes suivants sont incluses dans le prix:</Col>
                </Row>
                <Row className='p-1'>
                  <Col className='text-aleft' xs={11}>Inclus: TPS</Col>
                  <Col className="text-end" xs={1}>${((TPS * prix / (1 + TVQ + TPS))).toFixed(2)}</Col>
                </Row>
                <Row className='p-1'>
                  <Col className='text-aleft' xs={10}>Inclus: TVQ</Col>
                  <Col className='text-end' xs={2}>${((TVQ * prix / (1 + TVQ + TPS))).toFixed(2)}</Col>
                </Row>

                <Row className='text-aleft p-1 mt-2'>
                  <Col>Méthode de paiement: <i>Payer plus tard</i></Col>
                </Row>
              </>
              </Paper>
              <Form.Group className="mt-4 mb-20">
                <Button variant='primary' onClick={onClickConfirmer}>Confirmer la réservation</Button>
              </Form.Group>

            </Form>
          
          </Col>
        </Row>
      </Container>}
      {affichageConfirmation && <PageRdvConfirme numeroReservation={numeroReservation}/>}
    </>

  )
}
