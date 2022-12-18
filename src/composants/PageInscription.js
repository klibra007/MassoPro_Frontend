import axios from 'axios';
import React, { useState } from 'react';
import {Container, Button, Row, Col, Form} from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';

export default function PageInscription() {
    const [prenom, setPrenom] = useState("");
    const [nom, setNom] = useState("");
    const [courriel, setCourriel] = useState("");
    const [motDePasse, setMotDePasse] = useState("");   
    const [telephone, setTelephone] = useState("");     
   

    const handleChangePrenom = (event) => {
        setPrenom(event.target.value);
    }    

    const handleChangeNom = (event) => {
        setNom(event.target.value);
    }     

    const handleChangeCourriel = (event) => {
        setCourriel(event.target.value);
    }

    const handleChangeTelephone = (event) => {
        setTelephone(event.target.value);
    }

    const handleChangeMotDePasse = (event) => {
        setMotDePasse(event.target.value);
    }
    
    const handleClickRegister = () => {
        let strDossierServeur = "https://dev.pascalrocher.com";
        let strNomApplication = strDossierServeur + "/api/auth/register";

        console.log(strNomApplication);

        let data = {
            "courriel": courriel,
            "motDePasse": motDePasse
        }

        axios.post(strNomApplication, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                console.log("La réponse: " + JSON.stringify(response));
                if (response.data.status === true) {
                    localStorage.setItem('connexionData', JSON.stringify(response.data));
                   
                    //navigate('/');
                }
            })
            .catch((error) => {
                console.log(error.response.data.status);
                document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
            });
    }    

    return (
        <Container id='idContainerInscription' className='mt-5'>
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
                     <Form.Control type='email' id="formInsCourriel" placeholder='Courriel' onChange={handleChangeCourriel} />
                  </Form.Group>
                  <Form.Group className='mt-20'>
                     <Form.Control type='password' id="formInsPassword" placeholder='Mot de passe' onChange={handleChangeMotDePasse} />
                  </Form.Group>
                  <Form.Group className='mt-3'>
                     <Form.Control type='text' id="formTelephone" placeholder='téléphone' onChange={handleChangeTelephone} />
                  </Form.Group>     
                  <div className="mt-3 text-start">Comment devons-nous nous contacter le subjet de votre rendez-vous?
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