import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectObjReservation, setObjetReservationIdPersonnel, setNomMassoChoisi } from '../../app/features/reservationSlice';

export default function PageModifierReservation(props) {
    const pageName="PageModifierReservation";
    const {data, show, setShow, callbackFunc} = props;

    const noDispoMsg="Aucun disponibilité pour cette date";

    const [dureeTab, setDureeTab] = useState([]);
    const [massoTab, setMassoTab] = useState([]);
    const [disponibiliteTab, setDisponibiliteTab] = useState([]);
    //const objReservation = useSelector(selectObjReservation);
    //const dispatch = useDispatch();

    const [duree, setDuree] = useState('');
    const [masso, setMasso] = useState('');
    const [dateRes, setDateRes] = useState('');
    const [heureRes, setHeureRes] = useState('');    

    let strDossierServeur = "https://dev.pascalrocher.com";
    let strAppDuree = strDossierServeur + "/api/durees";    
    let strAppPersonnels = strDossierServeur + "/api/servicespersonnels";
    let strAppRdv = strDossierServeur + "/api/rendezvous";

    useEffect(() => {
        setDuree(data.idDuree);
        setMasso(data.idPersonnel);
        setDateRes(data.dateRes);

        //recup des durées
        axios.get(strAppDuree)
            .then((response) => {
                //console.log("PageModifierReservation. La réponse durée : " + JSON.stringify(response.data));
                setDureeTab(response.data);
            })
            .catch(error => alert(error));   

        //recup des masso
        let strAppUrl=strAppPersonnels + `/${data.idService}`;
        //console.log("idService="+data.idService+" strAppUrl="+strAppUrl);
        axios.get(strAppUrl)
            .then((response) => {
                //console.log("PageModifierReservation. La réponse masso : " + JSON.stringify(response.data));
                setMassoTab(response.data);
            })
            .catch(error => alert(error));   
            
        getDisponibilite(); 
    }, [data], dateRes) 

    const getDisponibilite = () => {
       let objReservation = {
          "date": dateRes,
          "idService": data.idService,
          "idPersonnel": masso,
          "idDuree": duree
       }

       console.log(pageName+" "+JSON.stringify(objReservation));
       axios.post(strAppRdv, JSON.stringify(objReservation), {
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then((response) => {
          console.log(pageName+" La réponse: " + JSON.stringify(response));
          if (response.data.length > 0) {
            setDisponibiliteTab(response.data);
          } else {
            setDisponibiliteTab([]);
          }
        })
        .catch((error) => {
          alert(error.response);
        });       
    }
    
    const handleChangeDuree = (event) => {    
        const duree = event.target.value;
        setDuree(duree);
        //console.log(pageName+" Le duree choisi: id="+duree);
    }     
    
    const handleChangeMasso = (event) => {    
        const masso = event.target.value;
        setMasso(masso);
        //console.log(pageName+" Le masso choisi: id="+masso);
    }   
    
    const handleChangeDateRes = (event) => {    
        const dateRes = event.target.value;
        setDateRes(dateRes);
        console.log(pageName+" Le date choisi: "+dateRes);
    }  
    
    const handleChangeHeureRes = (event) => {    
        const heure = event.target.value;
        setHeureRes(heure);
        console.log(pageName+" Le heure choisi: "+heure);
    }  

    // isConfirm=true (Button Confirm clicked). False=Button Cancel clicked
    function onModalClose(isConfirm) {
        setShow(false);
        if (isConfirm) {
           callbackFunc("data"); 
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
              <div>Duree: {duree}</div>
              <div>idPersonnel: {masso}</div>

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

              <div className='text-start mt-2'>Choisir une date réservation</div>                
              <InputGroup>
                  <Form.Control type='text' id="idDateRes" value={dateRes} onChange={(e) => handleChangeDateRes(e)} required />
                  <Button id="idDateResBtn" variant="secondary" onClick={() => getDisponibilite()}>Changer Date</Button>                 
              </InputGroup>
                  
              {disponibiliteTab.length > 0 ? <Form.Select className="mt-2" id='idHeureResSel' onChange={(e) => { handleChangeHeureRes(e) }}>
                    <option value={0}>Veuillez choisir un heure disponibilité</option>
                    {disponibiliteTab.map((dispo) => {
                      return <option key={dispo.heureDebut} value={dispo.heureDebut}>
                         {dispo.heureDebut}</option>
                })}
              </Form.Select>
              : <div className='text-center mt-2'>{noDispoMsg}</div>}
            </Form>
            
        </Modal.Body>     
        <Modal.Footer>
            <Button variant="outline-secondary" onClick={() => onModalClose(false)}>
                Annuler
            </Button>
            <Button variant="primary" onClick={() => onModalClose(true)}>
                Modifier ma réservation
            </Button>                
        </Modal.Footer>
      </Modal>
    )
}  // end function