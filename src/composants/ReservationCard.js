import React from 'react';
import { Card, CardGroup, Row, Col } from 'react-bootstrap';
import { Button, Stack } from '@mui/material';




export default function ReservationCard(props) {


    return (
        // <CardGroup>
        //     <Row className='justify-content-center'>
        //         <Col>
        <Card>
            <Card.Header className='text-aleft'>{`${props.date} à ${props.heure}`}</Card.Header>
            <Card.Body>
                <Card.Text className='text-aleft'>
                    Massothérapeute: {props.prenomNomPersonnel}<br />
                    Service: {props.nomService}<br />
                    Durée: {props.duree}<br />
                    Prix total: ${props.prix}<br />
                    Numéro de réservation: {props.reservation}
                    <br />
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-aright">                
                    <Button className="btn btn-secondary" onClick={() => {props.openConfirmDialog(props.rdv)}}>Annuler</Button> &nbsp;
                    <Button className="btn btn-primary" onClick={() => {props.openPageModifierReservation(props.rdv)}}>Modifier</Button>
            </Card.Footer>
        </Card>

        //         </Col>
        //     </Row>
        // </CardGroup>
    )
} 