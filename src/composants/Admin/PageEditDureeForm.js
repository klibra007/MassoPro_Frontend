import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { Modal, Button } from 'react-bootstrap';
import Link from '@mui/material/Link';
import EditIcon from '@mui/icons-material/Edit';

export default function PageEditDureeForm(props) {
    const [duree, setDuree] = useState(props.duree);
    const [prix, setPrix] = useState(props.prix);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const exitModal = () => {  
      handleClose();        
      // Restore input fields value before exit
      setDuree(props.duree);
      setPrix(props.prix);      
    }    

    const submitHandler = (event) => {
       handleClose();      
       event.preventDefault();
       
       props.callbackFunc(props.id, duree, prix);   // Callback function with parameters changed data
    }    

    return (
       <>
        {/* Edit icon */}
        <Link   
           onClick={handleShow}
        ><EditIcon /></Link>

        {/* Modal form */}
       <Modal
         show={show}
         onHide={exitModal}
         backdrop="static"
         animation={false}
         keyboard={false}
       >       

          <Modal.Header closeButton>
            <Modal.Title>Mise à jour durée</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group as={Row} className="mb-1" controlId="formId">
                <Form.Label column sm="2">ID</Form.Label>
                  <Col sm="10">
                    <Form.Control type='number' value={props.id} disabled />
                 </Col>
               </Form.Group>    
             <Form.Group as={Row} className="mb-1" controlId="formDuree">
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
              Sauvegarder
            </Button>                         
          </Modal.Footer>             
       </Modal>
      </>
    )   //  end return   
}   // end function    