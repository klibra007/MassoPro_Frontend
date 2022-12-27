import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Link from '@mui/material/Link';
import { Row, Col } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function PageAddDureeForm(props) {
    const [duree, setDuree] = useState('');
    const [prix, setPrix] = useState('');    

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    

    const exitModal = () => {  
        handleClose();        
        // clear input fields before exit
        setDuree('');
        setPrix('');      
    }

    const submitHandler = (event) => {
        // Save fields value before resetting input fields
        let dureeVal=duree;
        let prixVal=prix;
        exitModal();  
        event.preventDefault();

        props.callbackFunc(dureeVal, prixVal);   // Callback function with parameters add data
    } 

    return (
        <>
         {/* Add icon */}
         <Link   
           onClick={handleShow}
         ><AddCircleOutlineIcon /></Link>

         {/* Modal form */}
         <Modal
           show={show}
           onHide={exitModal}
           backdrop="static"
           animation={false}
           keyboard={false}
          >      

            <Modal.Header closeButton>
               <Modal.Title>Ajouter une durée</Modal.Title>
            </Modal.Header>   
            <Modal.Body>
              <Form>
                <Form.Group as={Row} className="mb-2" controlId="formDuree">
                  <Form.Label column sm="2">Durée</Form.Label>    
                    <Col sm="10">                           
                      <Form.Control type='number'value={duree} onChange={(e) => {setDuree(e.target.value);}} required />
                    </Col>
                </Form.Group>  
                <Form.Group as={Row} className="mb-1" controlId="formPrix">
                   <Form.Label column sm="2">Prix</Form.Label>        
                   <Col sm="10">                              
                      <Form.Control type='number' value={prix} onChange={(e) => {setPrix(e.target.value);}} required />
                   </Col>
                </Form.Group>                                
              </Form>                
            </Modal.Body>     
            <Modal.Footer>
               <Button variant="outline-secondary" onClick={exitModal}>
                   Annuler
               </Button>     
               <Button variant="primary" onClick={submitHandler}>
                   Ajouter
               </Button>                         
            </Modal.Footer>                            
          </Modal>
        </>       
    )   // end return
}   // end func