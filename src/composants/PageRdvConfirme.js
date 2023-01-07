import React from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import { selectNomServiceChoisi, selectDateChoisie, selectPrix } from '../app/features/reservationSlice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Paper } from '@mui/material';
import { selectConnexionData } from '../app/features/connexionSlice';

export default function PageRdvConfirme({ numeroReservation }) {
  const nomServiceChoisi = useSelector(selectNomServiceChoisi);

  const connexionData = useSelector(selectConnexionData);

  const dateChoisie = useSelector(selectDateChoisie);

  const prix = useSelector(selectPrix);

  const navigate = useNavigate();

  const handleClickMenu = () => {
    navigate('/')
  }

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col xs={8}>
          <Form>
          <Paper className="p-20">
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
                <Card.Text>Un courriel électronique a été envoyé à {<b>{connexionData.courriel}</b>} avec tous les détails de la réservation.</Card.Text>
              </Card.Header>
            </Card>
            <Card className="text-aleft mt-2">
              <Card.Header className='p-1'>
                <Card.Text>Si vous ne le trouvez pas sous peu, veuillez vérifier dans vos courriers indésirables.</Card.Text>
              </Card.Header>
            </Card>
            </Paper>
            <Form.Group className="mt-4 mb-20">
              <Button variant='primary' onClick={handleClickMenu}>Retour à l'accueil</Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  )
} 