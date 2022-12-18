import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios';
import { setConnexionData } from '../app/features/connexionSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { responsiveFontSizes } from '@mui/material';




export default function PageConnexion() {
    const [courriel, setCourriel] = useState("");
    
    const [motDePasse, setMotDePasse] = useState("");

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleChangeCourriel = (event) => {
        setCourriel(event.target.value);
    }

    const handleChangeMotDePasse = (event) => {
        setMotDePasse(event.target.value);
    }

    const handleClickConnexion = () => {
        console.log(courriel);
        console.log(motDePasse);

        let strDossierServeur = "https://dev.pascalrocher.com";
        let strNomApplication = strDossierServeur + "/api/auth/login";

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
                if (response.data.status === true && response.data.clientEstActif === 1) {
                    localStorage.setItem('connexionData', JSON.stringify(response.data));
                    dispatch(setConnexionData(response.data));
                    navigate('/');
                }
                else if (response.data.clientEstActif === 0 || response.data.personnelEstActif === 0 ){
                    document.getElementById('idErreur').innerHTML = "Votre compte n'existe plus. Contactez l'administrateur svp!"
                }
            })
            .catch((error) => {
                console.log(error.response.data.status);
                document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
            });
    }

    const handleClickAnnuler = () => {
        document.getElementById('idErreur').innerHTML = ""
    }
    
    return (
        <Container>
            <Row className='justify-content-md-center justify-content-sm-center mt-5'>
                <Col xs={4}>
                    <Form>
                        <div className="mb-5">
                            <h4>Page de connexion</h4>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Control type='email' id="formCourriel" placeholder='Votre courriel' value={courriel} onChange={handleChangeCourriel} required />
                        </Form.Group>
                        <Form.Group className='mt-20'>
                            <Form.Control type='password' id="formPassword" placeholder='Votre mot de passe' onChange={handleChangeMotDePasse} required />
                            <p id='idErreur'></p>
                        </Form.Group>
                        <Stack gap={2} className="col-md-5 mx-auto mt-4">
                            <Button variant='primary' onClick={handleClickConnexion}>Connexion</Button>
                            <Button type="reset" variant='outline-secondary' onClick={handleClickAnnuler}>Annuler</Button>
                        </Stack>

                        <div className="mt-4">
                            <p>Nouveau? <a href='/inscription' className="mleft-6">Créer un compte</a></p>
                            <a href='#'>Mot de passe oublié?</a>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
