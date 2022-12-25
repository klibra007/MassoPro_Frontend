import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Link from '@mui/material/Link';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

export default function ConfirmDialogDelIcon(props) {
    const { callbackFunc, callbackData } = props;

    const [isConfirm, setIsConfirm] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);    

    const submitHandler = (event) => {
        handleClose();      
        event.preventDefault();
        
        callbackFunc({isConfirm}, callbackData);
    }         

    return (
      <>
         {/* Delete icon */}
         <Link   
            onClick={handleShow}
         ><DeleteForeverOutlinedIcon /></Link> 

        <Modal 
            show={show}
            onHide={handleClose}
            backdrop="static"
            animation={false}
            keyboard={false}
        > 
            <Modal.Header closeButton>
                <Modal.Title>Supprimer</Modal.Title>
            </Modal.Header> 
            <Modal.Body>
               Etes-vous sûr que vous voulez supprimer?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={handleClose}>
                   Non
                </Button>
                <Button variant="primary" onClick={(e) => {
                      setIsConfirm(true);
                      submitHandler(e);
                   }}>
                   Oui
                </Button>                
            </Modal.Footer>                                 
        </Modal>                   
      </>
    )   // end return
}  // end function

