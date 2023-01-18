import React, { useState, useEffect } from 'react';
import { Modal, Button, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { isNull, isTime, compareTime } from '../../lib/FormValidator';   

export default function AjouterHoraireTravail(props) {
    const {show, setShow, callbackFunc} = props;

    const formInitState = {
        heureDebut: '',
        heureFin: ''
    }

    const [weekday, setWeekday] = useState([]);
    const [form, setForm] = useState({
        heureDebut: '',
        heureFin: ''
     })     
    const [formErrors, setFormErrors] = useState({})

    const initForm = () => {
        setWeekday([]);
        setForm(formInitState)  // Reset form
    }   

    const validateForm = () => {
        const errors = {};

        //console.log("weekday.length="+weekday.length);
        if (weekday.length == undefined || weekday.length == 0) {   // If array not define or empty
           errors.weekday = "Veuillez sélectionner un jour";
        }

        if (!isNull(form.heureDebut)) {
           errors.heureDebut = "Veuillez entrer l'heure de début";
        } else if (!isTime(form.heureDebut)) {
            errors.heureDebut = "L'heure de début invalide"; 
        }    

        if (!isNull(form.heureFin)) {
            errors.heureFin = "Veuillez entrer l'heure de fin";
        } else if (!isTime(form.heureFin)) {
            errors.heureFin = "L'heure de fin invalide"; 
        }   
        
        if (errors.heureDebut == undefined && errors.heureFin == undefined) {  // if heureDebut & heureFin pass validation
           const compareCode=compareTime(form.heureDebut, form.heureFin);
           //console.log("Comparecode="+compareCode);
           if (compareCode != 2) {  // If heureDebut >= heureFin
              errors.heureDebut = "L'heure de début doit être inférieure à l'heure de fin";
           }     
        }   

        return errors;        
    }     
    
    const handleSubmitForm = (e) => {
        e.preventDefault();
        setFormErrors({});  // Reset error fields

        const frmErrors = validateForm();
        if (Object.keys(frmErrors).length > 0) {    
            setFormErrors(frmErrors);  
        } else {           
           handleCleanupForm();
           let data = {
              jour: `${weekday}`,
              heureDebut: form.heureDebut,
              heureFin: form.heureFin,
              idPersonnel: props.idPersonnel
           }
           
           callbackFunc(data);  // Call next function
        }
    }   
    
    const handleCleanupForm = (e) => {
        setFormErrors({});  // Reset error fields
        setShow(false);
    }    

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }   
    
    const handleChangeChkbox = (val) => {
        setWeekday(val);
        //console.log("Weekday="+weekday);
    }     

    return (
        <Modal 
           show={show}
           onHide={handleCleanupForm}   
           onShow={initForm}
           backdrop="static"
           animation={false}    
        >
          <Modal.Header closeButton>
              <Modal.Title>Horaire Travail</Modal.Title>
          </Modal.Header>   
          <Modal.Body>          
            <Form>
               <Form.Group> 
                  <ToggleButtonGroup type="checkbox" value={form.weekday} 
                     onChange={handleChangeChkbox}>
                     <ToggleButton id="btn-dim" variant="outline-secondary" value={0}>Dim</ToggleButton>&nbsp;&nbsp;
                     <ToggleButton id="btn-lun" variant="outline-secondary" value={1}>Lun</ToggleButton>&nbsp;&nbsp;   
                     <ToggleButton id="btn-mar" variant="outline-secondary" value={2}>Mar</ToggleButton>&nbsp;&nbsp;  
                     <ToggleButton id="btn-mer" variant="outline-secondary" value={3}>Mer</ToggleButton>&nbsp;&nbsp;  
                     <ToggleButton id="btn-jeu" variant="outline-secondary" value={4}>Jeu</ToggleButton>&nbsp;&nbsp;  
                     <ToggleButton id="btn-ven" variant="outline-secondary" value={5}>Ven</ToggleButton>&nbsp;&nbsp;  
                     <ToggleButton id="btn-sam" variant="outline-secondary" value={6}>Sam</ToggleButton>&nbsp;&nbsp;                                                                                                                
                  </ToggleButtonGroup> 
                  <div className='text-start mt-2 text-danger'>{formErrors.weekday}</div>                
               </Form.Group> 
               <div className='text-start mt-3'>Format 24 heures HH:MM</div> 
               <Form.Group> 
                  <div className='text-start mt-2'>Heure début</div> 
                  <Form.Control type='text' id="idHeureDebut" name="heureDebut" value={form.heureDebut}
                   onChange={handleChange} isInvalid={!!formErrors.heureDebut} required>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid" className='text-start'>
                     {formErrors.heureDebut}
                  </Form.Control.Feedback> 
               </Form.Group>    
               <Form.Group> 
                  <div className='text-start mt-2'>Heure fin</div> 
                  <Form.Control type='text' id="idHeureFin" name="heureFin" value={form.heureFin}
                   onChange={handleChange} isInvalid={!!formErrors.heureFin} required>
                  </Form.Control>
                  <Form.Control.Feedback type="invalid" className='text-start'>
                     {formErrors.heureFin}
                  </Form.Control.Feedback> 
               </Form.Group>                           
            </Form>  
          </Modal.Body>     
          <Modal.Footer>
             <Button variant="outline-secondary" onClick={handleCleanupForm}>
                Annuler
             </Button>
             <Button variant="primary" onClick={handleSubmitForm}>
                Submit
             </Button>                
          </Modal.Footer>
        </Modal>
    )   // end return                         
}  // end function