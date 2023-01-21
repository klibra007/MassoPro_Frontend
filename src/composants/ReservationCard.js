import React from 'react';
import { Card, CardGroup, Row, Col } from 'react-bootstrap';
import { Button, Stack, Tooltip } from '@mui/material';
import { useState } from 'react';




export default function ReservationCard(props) {

    const handleButtonState = () => {
        if (props.isDisabled === true) {
            return (
                <>
                    <Tooltip title="Contactez MassoPro pour annuler une réservation moins de 48 heures avant votre rendez-vous.">
                        <span>
                            <Button className="btn btn-secondary" disabled={props.isDisabled} onClick={() => { props.openConfirmDialog(props.rdv) }}>Annuler</Button>&nbsp;
                        </span>
                    </Tooltip>{ }
                    <Button className="btn btn-primary" onClick={() => { props.openPageModifierReservation(props.rdv) }}>Modifier</Button>
                </>
            )
        } else return (
            <>
                <Button className="btn btn-secondary" disabled={props.isDisabled} onClick={() => { props.openConfirmDialog(props.rdv) }}>Annuler</Button> &nbsp;
                <Button className="btn btn-primary" onClick={() => { props.openPageModifierReservation(props.rdv) }}>Modifier</Button>
            </>

        )
    }

    return (
        <Card>
            <Card.Header className='text-aleft'>{`${props.dateRes} à ${props.heureDebut}`}</Card.Header>
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
            {handleButtonState()}
                {/* <Tooltip title="Contactez MassoPro pour annuler une réservation moins de 48 heures avant votre rendez-vous.">
                    <span>
                        <Button className="btn btn-secondary" disabled={props.isDisabled} onClick={() => { props.openConfirmDialog(props.rdv) }}>Annuler</Button>&nbsp;
                    </span>
                </Tooltip> */}
                {/* <Button className="btn btn-secondary buttonDisabled" disabled={props.isDisabled}  onClick={() => {props.openConfirmDialog(props.rdv)}}><span>Contactez MassoPro pour les annulations dans les 48 heures avant votre rendez-vou</span>Annuler</Button> &nbsp; */}
                {/* <Button className="btn btn-primary" onClick={() => { props.openPageModifierReservation(props.rdv) }}>Modifier</Button> */}

            </Card.Footer>

        </Card>

    )
} 
