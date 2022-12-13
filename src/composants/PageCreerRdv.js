import React, { useState } from 'react';
import {Container, Button, Row, Col, Form, Dropdown} from 'react-bootstrap';

export default function PageCreerRdv() {
    const durees = [
        { name: '30 minutes (+ $63.90)', id: 1 },
        { name: '60 minutes (+ $100.20)', id: 2 },        
        { name: '75 minutes (+ $110.88)', id: 3 },        
        { name: '90 minutes (+ $125.32)', id: 4 }           
    ];
    const [dureeId, setDuree] = useState(durees[0].id);  // Set initial state to 1st id 
    const massoth = [
        { name: 'première disponible', id: 1 },
        { name: 'Odile Gosselin', id: 2 },
        { name: 'Léa Boudin', id: 3 },
        { name: 'Emma Bellerose', id: 4 }
    ] 
    const [massothId, setMassoth] = useState(massoth[0].id);  // Set initial state to 1st id 
    console.log(massothId);

    const handleClickRdv = () => {
    }        

    return (
    <Container>
        <Row className='justify-content-center'>
            <Col xs={6}> 
             <Form>            
                <Form.Group>
                    <Form.Control placeholder="Massothérapie" disabled />
                </Form.Group> 
                <div className='text-start mt-4 text-primary'>Durée</div>       
                <div className='text-start mt-2'>Veuillez choisir la durée de votre choix</div>   

                <Form.Select value={dureeId} onChange={(e) => setDuree(e.target.value)}>
                  {durees.map((rec) => {
                     const { name, id } = rec;
                     return <option value={id}>{name}</option>
                  })}
                </Form.Select>  

                <div className='text-start mt-3 text-primary'>Massothérapeute</div>   
                <Form.Select value={massothId} onChange={(e) => setMassoth(e.target.value)}>
                  {massoth.map((rec) => {
                     const { name, id } = rec;
                     return <option value={id}>{name}</option>
                  })}
                </Form.Select>   

                <Form.Group className="mt-4">
                   <Button variant='primary' onClick={handleClickRdv}>Suivant</Button>     
                </Form.Group>          
             </Form>                          
            </Col>
        </Row>
    </Container>
   )  // end return
}  // end export
