import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectAffichageChoixServices, selectConnexionData, setAffichageChoixServices, setAffichageChoixDureeEtMasso, setConnexionData } from '../app/features/connexionSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';



export default function PageConnexion({ setResultat }) {
    const [courriel, setCourriel] = useState("");
    const [motDePasse, setMotDePasse] = useState("");
    const navigate = useNavigate();

    const boolAccueil = useSelector(selectAffichageChoixServices);
    const dispatch = useDispatch();

    const resultat = useSelector(selectConnexionData);

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
        let strNomApplication = strDossierServeur + "/api/auth/login";

        alert(strNomApplication);
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
                alert("La réponse: " + JSON.stringify(response));
                //setResultat(response.data);
                if (response.data.status === true) {
                    //dispatch(setConnexionData(response.data));
                    //dispatch(setAffichageAccueil(true));
                    //dispatch(setAffichageConnexion(false));
                    localStorage.setItem('connexionData', JSON.stringify(response.data));
                    dispatch(setConnexionData(response.data));
                    navigate('/accueil');

                }
            })
            .catch((error) => {
                alert(error.response.data.status);
                document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
            });
    }

    const handleClickAnnuler = () => {
        document.getElementById('idErreur').innerHTML = ""
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

    /*useEffect(() => {
        alert(JSON.stringify(resultat));
    }, [resultat])*/


    return (
        <Container>
            <Row className='justify-content-md-center mt-5'>
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
                            <p>Nouveau? <a href='/register' className="mleft-6">Créer un compte</a></p>
                            <a href='#'>Mot de passe oublié?</a>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    )
}
