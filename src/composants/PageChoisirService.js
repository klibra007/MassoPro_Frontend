import React, { useEffect, useState } from 'react';
import {Container, Button, Card, CardGroup, Row, Col} from 'react-bootstrap';
import {CCard} from 'react-bootstrap';

export default function PageChoisirService() {
    return (
    <Container>
        <Row className='justify-content-center'>
            <Col xs={4}>               
              <h4 className="mb-3" id="connexionMsg">Se connecter</h4>     
              <CardGroup>       
                <Row>   
                  <Col>
                   <Card>
                      <Card.Header className='text-aleft'>Massage thérapeutique</Card.Header>
                      <Card.Body>
                      <Card.Text className='text-aleft'>
                          Le massage thérapeutique aide soulager douleur, réduire le stress et circuler le sang.
                      </Card.Text>
                          <Button variant="primary">RESERVER</Button>
                     </Card.Body>
                   </Card>
                   <Card className='mt-4'>
                      <Card.Header className='text-aleft'>Deep tissue</Card.Header>
                      <Card.Body>
                         <Card.Text className='text-aleft'>
                         Le massage deep tissue aide Décomposer le tissu cicatriciel et faire circuler votre sang.
                         </Card.Text>
                            <Button variant="primary">RESERVER</Button>
                         </Card.Body>
                   </Card>  
                  </Col>  
                </Row>            
              </CardGroup>
            </Col>
        </Row>
    </Container>
   )  // end return
}  // end export