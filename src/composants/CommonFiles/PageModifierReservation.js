import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectObjReservation, setObjetReservationIdPersonnel, setNomMassoChoisi } from '../../app/features/reservationSlice';

export default function PageModifierReservation(props) {
    const {data, show, setShow, callbackFunc} = props;

    const [dureeTab, setDureeTab] = useState([]);
    const [massoTab, setMassoTab] = useState([]);
    const objReservation = useSelector(selectObjReservation);
    const dispatch = useDispatch();

    const [selectDuree, setSelectDuree] = useState('');
    const [selectMasso, setSelectMasso] = useState('');

    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/durees";    
    let strNomApplication2 = strDossierServeur + "/api/servicespersonnels";

    useEffect(() => {
        setSelectDuree(data.idDuree);
        setSelectMasso(data.idPersonnel);

        //recup des durées
        axios.get(strNomApplication)
            .then((response) => {
                console.log("PageModifierReservation. La réponse durée : " + JSON.stringify(response.data));
                setDureeTab(response.data);
            })
            .catch(error => alert(error));   

        //recup des masso
        let strAppUrl=strNomApplication2 + `/${data.idService}`;
        //console.log("idService="+data.idService+" strAppUrl="+strAppUrl);
        axios.get(strAppUrl)
            .then((response) => {
                //console.log("PageModifierReservation. La réponse masso : " + JSON.stringify(response.data));
                setMassoTab(response.data);
            })
            .catch(error => alert(error));
    }, [data]) 
    
    const handleChangeDuree = (event) => {    
        const selDuree = event.target.value;
        setSelectDuree(selDuree);
        //console.log("Le duree choisi: id="+selDuree);
    }     
    
    const handleChangeMasso = (event) => {    
        const selMasso = event.target.value;
        setSelectMasso(selMasso);
        //console.log("Le masso choisi: id="+selMasso);
    }    

    // isConfirm=true (Button Confirm clicked). False=Button Cancel clicked
    function onModalClose(isConfirm) {
        setShow(false);
        if (isConfirm) {
           callbackFunc("close"); 
        }
    }

    return (
      <Modal 
         show={show}
         onHide={() => setShow(false)}    
         backdrop="static"
         animation={false}    
      >
        <Modal.Header closeButton>
            <Modal.Title>Modifier vos réservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form>
              <div>Numéro de réservation: {data.reservation}</div>
              <div>Duree: {selectDuree}</div>
              <div>idPersonnel: {selectMasso}</div>

              <div className='text-start mt-2'>Durée</div>
              <Form.Select id='idDuree' defaultValue={data.idDuree} onChange={(e) => { handleChangeDuree(e) }}>
                    <option value={0}>Veuillez choisir une durée svp</option>
                    {dureeTab.map((data) => {
                        const { id, duree, prix, estActif } = data;
                        if (estActif === 1) {
                            return <option value={id} key={id}>
                                {`${duree}min (+ $${prix})`}</option>
                        }
                    })}
              </Form.Select>              

              <div className='text-start mt-2'>Massothérapeute</div>
              <Form.Select id='idMasso' defaultValue={data.idPersonnel} onChange={(e) => { handleChangeMasso(e) }}>
                    <option value={0}>Veuillez choisir un massothérapeute svp</option>
                    {massoTab.map((masso) => {
                      return <option key={masso.id} value={masso.id}>
                         {`${masso.prenom} ${masso.nom}`}</option>
                })}
              </Form.Select>
            </Form>
            
        </Modal.Body>     
        <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => onModalClose(false)}>
                Retour au menu
            </Button>
            <Button variant="primary" onClick={() => onModalClose(true)}>
                Annuler ma réservation
            </Button>                
        </Modal.Footer>
      </Modal>
    )
}  // end function