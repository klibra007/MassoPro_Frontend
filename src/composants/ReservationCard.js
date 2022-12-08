import React from 'react';
import { Button, Card, CardGroup, Row, Col } from 'react-bootstrap';


export default function ReservationCard(props) {
    return (
                     <CardGroup>
                        <Row className='justify-content-center'>
                            <Col>
                                <Card>
                                    <Card.Header className='text-aleft'>{props.date}</Card.Header>
                                    <Card.Body>
                                        <Card.Text className='text-aleft'>
                                            Massothérapeute: {props.idPersonnel}<br/>                                                                                  
                                            Service: {props.idService}<br/>
                                            Durée: {props.duree}<br/>
                                            Prix total: ${props.prix}<br/>
                                            Numéro de réservation: {props.reservation}
                                        </Card.Text>
                                        <Button className="mright-16"variant="primary">Modifier</Button>
                                    </Card.Body>
                                    {/* <Button className="align-items-end" variant="primary">MODIFIER</Button> */}
                                </Card>
                                <br/>
                            </Col>
                        </Row>                       
                    </CardGroup>       
    )  // end return    
}  // end export