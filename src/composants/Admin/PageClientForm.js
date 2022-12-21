import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import { Container} from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';

export default function PageClientForm() {
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");  
  const [courriel, setCourriel] = useState("");
  const [password, setPassword] = useState("");   
  const [telephone, setTelephone] = useState(""); 
  const [dob, setDob] = useState(""); 
  const [nam, setNam] = useState(""); 

  const [rue, setRue] = useState("");     
  const [ville, setVille] = useState("");      
  const [codePostal, setCodePostal] = useState(""); 

  const [parCourrielChecked, setParCourrielChecked] = useState(false); 
  const [parSmsChecked, setParSmsChecked] = useState(false);   

  const handleChangePrenom = (event) => {
     setPrenom(event.target.value);
  }  

  const handleChangeNom = (event) => {
    setNom(event.target.value);
 }    

 const handleChangeCourriel = (event) => {
    setCourriel(event.target.value);
 }  

 const handleChangePassword = (event) => {
    setPassword(event.target.value);
 }

 const handleChangeTelephone = (event) => {
    setNom(event.target.value);
 }  
 
 const handleChangeDob = (event) => {
    setDob(event.target.value);
 }    

 const handleChangeNam = (event) => {
    setNam(event.target.value);
 }   

 const handleChangeRue = (event) => {
    setRue(event.target.value);
 }    

 const handleChangeVille = (event) => {
    setVille(event.target.value);
 }  

 const handleChangeCodePostal = (event) => {
    setCodePostal(event.target.value);
 }  

 const handleChangeParCourrielChecked = (event) => {
    setParCourrielChecked(event.target.checked);
 }  
 
 const handleChangeParSmsChecked = (event) => {
    setParSmsChecked(event.target.checked);
 }  

 const handleClickInscrire = () => {
 }
 
 const handleClickAnnuler = () => {
    document.getElementById('idPrenomErreur').innerHTML = ""
 }

  return (
    <Container>
       <Row className='justify-content-center mtop-40 mt-5'>
         <Col xs={6}>
           <Form> 
              {/* <div className="text-start mb-3">
                  <h4>Ajouter Client</h4>
              </div>    */}
              <div className="mt-2 text-start">Client</div> 
              <Form.Group className="mb-1">
                 <Form.Control type='text' id="formPrenom" placeholder='Prenom' value={prenom} onChange={handleChangePrenom} required />
                 <p id='idPrenomErreur'></p>
              </Form.Group>                  
              <Form.Group className="mb-1">
                 <Form.Control type='text' id="formNom" placeholder='Nom' value={nom} onChange={handleChangeNom} required />
              </Form.Group>   
              <Form.Group className="mb-1">
                 <Form.Control type='email' id="formCourriel" placeholder='Courriel' value={courriel} onChange={handleChangeCourriel} required />
              </Form.Group>  
              <Form.Group className='mb-1'>                
                 <Form.Control type='password' id="formPassword" placeholder='Mot de passe' onChange={handleChangePassword} />
              </Form.Group>               
              <Form.Group className="mb-1">
                 <Form.Control type='text' id="formTelephone" placeholder='Numéro de telephone' value={telephone} onChange={handleChangeTelephone} required />
              </Form.Group> 
              <Form.Group className="mb-1">
                 <Form.Control type='text' id="formDob" placeholder='Date de naissance YYYY-MM-DD' value={dob} onChange={handleChangeDob} required />
              </Form.Group>      
              <Form.Group className="mb-1">
                 <Form.Control type='text' id="formNam" placeholder='Numéro assurance maladie' value={nam} onChange={handleChangeNam} required />
              </Form.Group> 

              <div className="mt-2 text-start">Adresse</div>  
              <Form.Group className="mb-1">
                  <Form.Control type='text' id="formRue" placeholder='Rue' onChange={handleChangeRue} />
              </Form.Group>                
              <Form.Group className="mb-1">
                 <Form.Control type='text' id="formVille" placeholder='Ville' onChange={handleChangeVille} />
              </Form.Group>    
              <Form.Group className="mb-2">
                 <Form.Control type='text' id="formCodePostal" placeholder='Code postal' onChange={handleChangeCodePostal} />
              </Form.Group>  

              <div className="text-start mb-1">
                  Méthode de communication
              </div>    
              <Form.Group className="text-start mb-1">
                 <Form.Check type='checkbox' id="formParCourrielChecked" label='Par courriel' checked={parCourrielChecked} onChange={handleChangeParCourrielChecked} required />
              </Form.Group> 
              <Form.Group className="text-start mb-1">
                 <Form.Check type='checkbox' id="formParSmsChecked" label='Par SMS' checked={parSmsChecked} onChange={handleChangeParSmsChecked} required />
              </Form.Group>   

              <Form.Group className="col-md-3 mx-auto mt-2">
                <Stack direction="horizontal" gap={3}>
                   <Button type="reset" variant='outline-secondary' onClick={handleClickAnnuler}>Annuler</Button>
                   <Button variant='primary' onClick={handleClickInscrire}>S'incrire</Button>
                </Stack>     
              </Form.Group>                                                                                                                           
           </Form>                      
         </Col>
       </Row>
    </Container>        
  )   // end return     
}   // end AjouterClientForm