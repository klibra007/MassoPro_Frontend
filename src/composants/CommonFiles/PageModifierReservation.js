import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { isNull, isDate } from '../../lib/FormValidator';   


export default function PageModifierReservation(props) {
    const pageName="PageModifierReservation";
    const noDispoMsg="Aucun disponibilité pour cette date";

    const {data, show, setShow, callbackFunc} = props;

    const [hrFin, setHrFin] = useState(data.heureFin);

    const [dureeTab, setDureeTab] = useState([]);
    const [massoTab, setMassoTab] = useState([]);  
    const [disponibiliteTab, setDisponibiliteTab] = useState([]);    
    
    const formInitState = {
        idDuree: data.idDuree,
        idPersonnel: data.idPersonnel,
        dateRes: data.dateRes,
        heureDebut: data.heureDebut,
        heureFin: data.heureFin
    }

    const [form, setForm] = useState({
       idDuree: '',
       idPersonnel: '',
       dateRes: '',
       heureDebut: '',
       heureFin: ''
    }) 
    
    const [ formErrors, setFormErrors ] = useState({})

    let strDossierServeur = "https://dev.pascalrocher.com";
    let strAppDuree = strDossierServeur + "/api/durees";    
    let strAppPersonnels = strDossierServeur + "/api/servicespersonnels";
    let strAppRdv = strDossierServeur + "/api/rendezvous";

    let objRes = {
      "date": data.dateRes,
      "idService": data.idService,
      "idPersonnel": data.idPersonnel,
      "idDuree": data.idDuree
    }

    useEffect(() => {  
       form.heureFin = hrFin;
    }, [hrFin])  

    useEffect(() => {  
       objRes.date = form.dateRes;
       objRes.idPersonnel = form.idPersonnel;
       objRes.idDuree = form.idDuree; 
    }, [form.idDuree, form.idPersonnel, form.dateRes])          
   
    useEffect(() => {      
        //recup des durées
        axios.get(strAppDuree)
            .then((response) => {
                //console.log("PageModifierReservation. La réponse durée : " + JSON.stringify(response.data));
                if (response.data.length > 0) {
                   // If there are data 
                   setDureeTab(response.data);
                } else {
                   // no data, set array empty  
                   setDureeTab([]);                    
                }
            })
            .catch(error => alert(error));   

        //recup des masso
        let strAppUrl=strAppPersonnels + `/${data.idService}`;
        //console.log("idService="+data.idService+" strAppUrl="+strAppUrl);
        axios.get(strAppUrl)
            .then((response) => {
                //console.log("PageModifierReservation. La réponse masso : " + JSON.stringify(response.data));
                if (response.data.length > 0) {
                    // If there are data 
                    setMassoTab(response.data);
                } else {
                    // no data, set array empty  
                    setMassoTab([]);                      
                }
            })
            .catch(error => alert(error));                                 
    }, [data])     

    const initForm = () => {
       setForm(formInitState);
       getDisponibilite();
    }

    const getDisponibilite = () => { 
        console.log(pageName+" "+JSON.stringify(objRes));
        axios.post(strAppRdv, JSON.stringify(objRes), {
           headers: {
             'Content-Type': 'application/json'
           }
        })
         .then((response) => {
           console.log(pageName+" getDisponibilite. La réponse: " + JSON.stringify(response));
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

    const handleGetDisponibilite = () => {
        const retMsg=validateDateRes();
        if (retMsg === '') {
           getDisponibilite();
        } else {
           setFormErrors({...formErrors, ["dateRes"]: retMsg});
        }
    }    

    const validateDateRes = () => {
      let retMsg="";
      if (!isNull(form.dateRes)) {
         retMsg = "Veuillez entrer une date réservation";
      }   
      else if (!isDate(form.dateRes)) {
         retMsg = "Date invalide";
      } 

      return retMsg;
    }

    const validateForm = () => {
        const errors = {};
        //console.log("form.idDuree="+form.idDuree);
        if (form.idDuree == 0) {   // No selection. Value is 0
           errors.idDuree = "Veuillez choisir une durée";
        }   
        if (form.idPersonnel == 0) {   // No selection. Value is 0
           errors.idPersonnel = "Veuillez choisir un massothérapeute";
        }        

        const dateResErrMsg=validateDateRes();
        if (dateResErrMsg !== '') {
           errors.dateRes = dateResErrMsg;
        }

        if (form.heureDebut == 0) {   // No selection. Value is 9
           errors.heureDebut = "Veuillez choisir un disponibilité";
        }          

        return errors;        
    }    

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const frmErrors = validateForm();
        if (Object.keys(frmErrors).length > 0) {    
           setFormErrors(frmErrors);  
        } else {        
           setFormErrors({});  // Reset error fields
           setShow(false);  // Close Modal Popup
           callbackFunc(formInitState, form);   // Call next function with initial data and form data
        }        
    }    
    
    const handleCancelForm = (e) => {
        setFormErrors({});  // Reset error fields
        setShow(false);
    }   

    const removeFormError = (e) => {
       // Check and see if errors exist, and remove them from the error object
       if (!!formErrors[e.target.name]) setFormErrors({
         ...formErrors,
         [e.target.name]: null
      })
    }

    const handleChange = (e) => {
       setForm({ ...form, [e.target.name]: e.target.value })

       removeFormError( e );
    }    

    function getHeureFin( hrDebut ) {
       const idx=disponibiliteTab.findIndex((dispo) => dispo.heureDebut == hrDebut);
       if (idx >= 0) {
          return disponibiliteTab[idx].heureFin;
       }
       return '';
    }

    const handleChangeHeureDispo = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value })    // heureDebut  

      let hFin=getHeureFin(e.target.value);
      console.log("heureDebut="+e.target.value+" hrFin="+hFin);
      setHrFin(hFin);
     
      removeFormError( e );           
    }

    return (
        <Modal 
           show={show}
           onHide={handleCancelForm}   
           onShow={initForm}
           backdrop="static"
           animation={false}    
        >
          <Modal.Header closeButton>
              <Modal.Title>Modifier vos réservation</Modal.Title>
          </Modal.Header>    
          <Modal.Body>          
            <Form>
               <div>Numéro de réservation: {data.reservation}</div>   
               <div>Heure debut: {form.heureDebut}</div>
               <div>Heure fin: {hrFin}</div>               
               <Form.Group>
                  <div className='text-start mt-2'>Durée</div>
                  <Form.Select id='idDuree' name="idDuree" value={form.idDuree} 
                     onChange={handleChange} isInvalid={!!formErrors.idDuree}>
                     <option value={0}>Veuillez choisir une durée svp</option>
                     {dureeTab.map((data) => {
                        const { id, duree, prix, estActif } = data;
                        if (estActif === 1) {
                            return <option value={id} key={id}>
                                {`${duree}min (+ $${prix})`}</option>
                        }
                     })}
                  </Form.Select>  
                  <Form.Control.Feedback type="invalid" className='text-start'>
                     {formErrors.idDuree}
                  </Form.Control.Feedback>                   
                </Form.Group>

                <Form.Group>
                  <div className='text-start mt-2'>Massothérapeute</div>
                  <Form.Select id='idPersonnel' name="idPersonnel" value={form.idPersonnel} 
                       onChange={handleChange} isInvalid={!!formErrors.idPersonnel}>
                     <option value={0}>Veuillez choisir un massothérapeute svp</option>
                     {massoTab.map((masso) => {
                        return <option key={masso.id} value={masso.id}>
                          {`${masso.prenom} ${masso.nom}`}</option>
                     })}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid" className='text-start'>
                     {formErrors.idPersonnel}
                  </Form.Control.Feedback>                                        
                </Form.Group> 

                <Form.Group>                  
                  <div className='text-start mt-2'>Choisir une date réservation</div>   
                  <InputGroup>
                     <Form.Control type='text' id="idDateRes" name="dateRes" value={form.dateRes} 
                        onChange={handleChange} isInvalid={!!formErrors.dateRes} required />
                     <Button id="idDateResBtn" variant="secondary" onClick={() => handleGetDisponibilite()}>Changer Date</Button>
                     <Form.Control.Feedback type="invalid" className='text-start'>
                        {formErrors.dateRes}
                     </Form.Control.Feedback>    
                  </InputGroup>               
                </Form.Group>

                {disponibiliteTab.length > 0 ? 
                 <Form.Group>                
                   <Form.Select className="mt-2" id='idHeureDebut' name="heureDebut" 
                      value={form.heureDebut} onChange={handleChangeHeureDispo} isInvalid={!!formErrors.heureDebut}>
                    <option value={0}>Veuillez choisir un disponibilité</option>
                    {disponibiliteTab.map((dispo, index) => {
                      return <option key={index+1} value={dispo.heureDebut}>
                         {dispo.heureDebut} - {dispo.heureFin}</option>
                     })}
                   </Form.Select>
                   <Form.Control.Feedback type="invalid" className='text-start'>
                      {formErrors.heureDebut}
                   </Form.Control.Feedback>                     
                </Form.Group>
              : <div className='text-center mt-2'>{noDispoMsg}</div>}                                                           
            </Form>
          </Modal.Body>     
          <Modal.Footer>
             <Button variant="outline-secondary" onClick={handleCancelForm}>
                Annuler
             </Button>
             <Button variant="primary" onClick={handleSubmitForm}>
                Modifier ma réservation
             </Button>                
          </Modal.Footer>
        </Modal>
    )   // end return 
  
}  // end function