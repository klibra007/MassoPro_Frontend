import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios';

export default function PageConnexion() {
    const [courriel, setCourriel] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const [resultat, setResultat] = useState({});

    const handleChangeCourriel = (event) => {
        setCourriel(event.target.value);
    }

    const handleChangeMotDePasse = (event) => {
        setMotDePasse(event.target.value);
    }

    const handleClickConnexion = () => {
        alert(courriel);
        alert(motDePasse);
        let strDossierServeur = "https://dev.pascalrocher.com";
        let strNomApplication = strDossierServeur + "/api/services";

        alert(strNomApplication);
        let data = {
            "courriel": courriel,
            "motDePasse": motDePasse
        }

        axios.get(strNomApplication)
            .then((response) => {alert("La réponse: " + response); setResultat(response.data)})
            .catch((error) => console.log(error));
    }

        /*let strDonneesTransmises = {
            "courriel": `${courriel}`,
            "motDePasse": `${motDePasse}`
        }

        let options = {
            method: "POST",
            headers: { 'Content-Type': 'application/json', 'charset': 'utf-8' },
            body: JSON.stringify(strDonneesTransmises)
        };

        const objPromiseResult = fetch(strNomApplication, options);

        objPromiseResult
            .then(response => response.json())
            .then((responseData) => {
                console.log("Requête du serveur Ajout" + JSON.stringify(responseData));
            })

    }*/

    useEffect(() => {
        alert(JSON.stringify(resultat));
    }, [resultat])


    return (
        <Container>
            <Row className='justify-content-md-center mt-5'>
                <Col xs={4}>
                    <Form>
                        <div className="mb-5">
                            <h4>Page de connexion</h4>
                        </div>
                        <Form.Group className="mb-3">
                            <Form.Control type='email' id="formCourriel" placeholder='Votre courriel' onChange={handleChangeCourriel} />
                        </Form.Group>
                        <Form.Group className='mt-20'>
                            <Form.Control type='password' id="formPassword" placeholder='Votre mot de passe' onChange={handleChangeMotDePasse} />
                        </Form.Group>
                        <Stack gap={2} className="col-md-5 mx-auto mt-4">
                            <Button variant='primary' onClick={handleClickConnexion}>Connexion</Button>
                            <Button type="reset" variant='outline-secondary'>Annuler</Button>
                        </Stack>

                        <div className="mt-4">
                            <p>Nouveau? <a href='#' className="mleft-6">Créer un compte</a></p>
                            <a href='#' className="mtop-10">Mot de passe oublié?</a>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
