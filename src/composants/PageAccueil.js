import React from 'react';
import { selectConnexionData } from '../app/features/connexionSlice';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function PageAccueil() {
    const resultat = useSelector(selectConnexionData);
    const navigate = useNavigate();

    console.log(localStorage.getItem('connexionData'));
    console.log("resultat dans accueil : "+ resultat.idClient)

    const handleClickReserver = () => {
        if(resultat !== null){
            navigate('/reservation');
            
        }
    }

    const handleClickConnecter = () => {
        if(resultat !== null){
            navigate('/connexion');
        }
    }

    const AccueilProfil = () => {
        if (resultat.idClient !== null && resultat.idClient !== undefined) {
            return <div>
                <b>PageAccueil Client</b>
                <p>Bonjour {resultat.prenom}, vous êtes connecté!</p>
                <p>Token : {resultat.token.substr(3)}</p>
                <Button onClick={handleClickReserver}>Réserver un rdv</Button>
            </div>
        } else if (resultat.idPersonnel !== null && resultat.idPersonnel !== undefined) {
            return <div>
                <b>PageAccueil Personnel</b>
                <p>Bonjour <b>{resultat.prenom}</b>, vous êtes connecté!</p>
                <p>Token : {resultat.token.substr(3)}</p>
            </div>
        } else if (resultat.idAdministrateur !== null && resultat.idAdministrateur !== undefined) {
            return <div>
                <b>PageAccueil Admin</b> 
                <p>Bonjour {resultat.prenom}, vous êtes connecté!</p>
                <p>Token : {resultat.token.substr(3)}</p>
            </div>
        } else {
            return <div>
                <p> PageAccueil sans user connecté</p>
                <Button onClick={handleClickConnecter}>Se connecter</Button>
            </div>
        }
    }

    return (
        <AccueilProfil />
    )
}
