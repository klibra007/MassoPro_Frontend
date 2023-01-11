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
                    Massothérapeute: {props.idPersonnel}<br />
                    Service: {props.idService}<br />
                    Durée: {props.duree}<br />
                    Prix total: ${props.prix}<br />
                    Numéro de réservation: {props.reservation}
                    <br />
                </Card.Text>
            </Card.Body>
            <Card.Footer className="text-aright">                
                    <Button className="btn btn-secondary" onClick={() => {props.openDialog(props.reservation)}}>Annuler</Button> &nbsp;
                    <Button className="btn btn-primary">Modifier</Button>
            </Card.Footer>
        </Card>

        //         </Col>
        //     </Row>
        // </CardGroup>
    )
} 