import React from 'react';
import { Card, CardGroup, Row, Col } from 'react-bootstrap';


export default function ReservationCard(props) {
    return (
        <CardGroup>
            <Row className='justify-content-center'>
                <Col>
                    <Card>
                        <Card.Header className='text-aleft'>{`${props.date} à ${props.heure}`}</Card.Header>
                        <Card.Body>
                            <Card.Text className='text-aleft'>
                                Massothérapeute: {props.idPersonnel}<br />
                                Service: {props.idService}<br />
                                Durée: {props.duree}<br />
                                Prix total: ${props.prix}<br />
                                Numéro de réservation: {props.reservation}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <br />
                </Col>
            </Row>
        </CardGroup>
    ) 
} 