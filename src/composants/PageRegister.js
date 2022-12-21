import React, { useState } from 'react';
import {Container, Button, Row, Col, Form} from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';

export default function PageRegister() {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [courriel, setCourriel] = useState("");
    const [motDePasse, setMotDePasse] = useState("");   
    const [rue, setRue] = useState("");     
    const [ville, setVille] = useState("");      
    const [codePostal, setCodePostal] = useState("");      

    const handleChangePrenom = (event) => {
        setPrenom(event.target.value);
    }    

    const handleChangeNom = (event) => {
        setNom(event.target.value);
    }     

    const handleChangeCourriel = (event) => {
        setCourriel(event.target.value);
    }

    const handleChangeMotDePasse = (event) => {
        setMotDePasse(event.target.value);
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
    
    const handleClickRegister = () => {
    }    

    return (
        <Container>
            <Row className='justify-content-center'>
              <Col xs={4}>
              <Form>                
                  <div className="mb-3">
                      <h4>S'incrire</h4>
                  </div>  
                  <Form.Group className="mb-3">
                      <Form.Control type='text' id="formPrenom" placeholder='Prenom' onChange={handleChangePrenom} />
                  </Form.Group>   
                  <Form.Group className="mb-3">
                      <Form.Control type='text' id="formNom" placeholder='Nom' onChange={handleChangeNom} />
                  </Form.Group> 
                  <Form.Group className="mb-3">
                     <Form.Control type='email' id="formCourriel" placeholder='Courriel' onChange={handleChangeCourriel} />
                  </Form.Group>
                  <Form.Group className='mt-20'>
                     <Form.Control type='password' id="formPassword" placeholder='Mot de passe' onChange={handleChangeMotDePasse} />
                  </Form.Group>     
                  <div className="mt-3 text-start">Addrese</div>  
                  <Form.Group className="mb-3">
                      <Form.Control type='text' id="formRue" placeholder='Rue' onChange={handleChangeRue} />
                  </Form.Group>  
                  <Form.Group className="mb-3">
                      <Form.Control type='text' id="formVille" placeholder='Ville' onChange={handleChangeVille} />
                  </Form.Group>    
                  <Form.Group className="mb-3">
                      <Form.Control type='text' id="formCodePostal" placeholder='Code postal' onChange={handleChangeCodePostal} />
                  </Form.Group>  
                  <div className="mt-3 text-start">Comment devons-nous vous contacter au subjet de votre rendez-vous?
                  </div>                    
                  <Form.Group className="text-start">
                     <Form.Check
                       type="checkbox"
                       id="formParCourriel"
                       label="Par Courriel"
                   />
                  </Form.Group>
                  <Form.Group className="text-start">
                     <Form.Check
                       type="checkbox"
                       id="formParSMS"
                       label="Par SMS"
                   />
                  </Form.Group>    
                  <Form.Group className="col-md-5 mx-auto mt-3">
                    <Stack direction="horizontal" gap={2}>
                      <Button type="reset" variant='outline-secondary'>Annuler</Button>                    
                      <Button className="mleft-16" variant='primary' onClick={handleClickRegister}>S'incrire</Button>
                    </Stack>                
                  </Form.Group>     
                  </Form>                          
              </Col>
            </Row>
        </Container>
    ) 
}  