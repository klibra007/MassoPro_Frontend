import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function FullScreenDialog(props) {
    const [nomService, setService] = useState(props.serviceSelectionne.nomService);

    const handleChange = (event, newAlignment) => {
        props.setAlignment(newAlignment);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChangeService = (event) => {
        props.setService(event.target.value);
    }

    const handleChangeDescription = (event) => {
        props.setDescription(event.target.value);
    }


    return (
        <>

            <Modal show={props.open} onHide={handleClose} size={'lg'} className='mtop-100' >
                <Modal.Header closeButton>
                    <Modal.Title>{props.modificationService === false ? "Ajouter un service" : "Modifier un service"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Nom Service</Form.Label>
                            <Form.Control
                                type="text"
                                defaultValue={props.modificationService === false ? "" : props.serviceSelectionne.nomService}
                                placeholder="Votre service"
                                autoFocus
                                onChange={handleChangeService}
                            />
                        </Form.Group>
                        <Form.Group
                            className="mb-3"
                            controlId="exampleForm.ControlTextarea1"
                        >
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} onChange={handleChangeDescription} defaultValue={props.modificationService === false ? "" : props.serviceSelectionne.description} />
                        </Form.Group>
                        {props.modificationService && <ToggleButtonGroup
                            color="primary"
                            value={props.alignment}
                            exclusive
                            onChange={handleChange}
                            aria-label="Platform"
                        >
                            <ToggleButton value={1}>Actif</ToggleButton>
                            <ToggleButton value={0}>Non Actif</ToggleButton>
                        </ToggleButtonGroup>}
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={props.modificationService === false ? props.handleAddService : props.handleValidateModification} >
                        {props.modificationService === false ? "Ajouter" : "Modifier"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
