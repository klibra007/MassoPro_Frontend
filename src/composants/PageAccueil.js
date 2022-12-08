import React from 'react';
import { selectAffichageChoixDureeEtMasso, selectConnexionData, setAffichageChoixDureeEtMasso } from '../app/features/connexionSlice';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


export default function PageAccueil() {
    const resultat = useSelector(selectConnexionData);

    const affichageConnexion = useSelector(selectAffichageChoixDureeEtMasso);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    console.log(localStorage.getItem('connexionData'));
    console.log("resultat dans accueil : "+ resultat.idClient)

    /*if(affichageConnexion === true){
        dispatch(setAffichageConnexion(false));
    }*/

    const handleClickReserver = () => {
        if(resultat !== null){
            navigate('/reservation');
        }
    }

    const handleClickConnecter = () => {
        if(resultat !== null){
            navigate('/');
        }
    }

    const AccueilProfil = () => {
        
        if (resultat.idClient !== null && resultat.idClient !== undefined) {
            return <div>
                PageAccueil Client
                <p>Bonjour {resultat.prenom}, vous êtes connecté!</p>
                <p>Token : {resultat.token.substr(3)}</p>
                <Button onClick={handleClickReserver}>Réserver un rdv</Button>
            </div>
        } else if (resultat.idPersonnel !== null && resultat.idPersonnel !== undefined) {
            return <div>
                PageAccueil Personnel
                <p>Bonjour {resultat.prenom}, vous êtes connecté!</p>
                <p>Token : {resultat.token.substr(3)}</p>
            </div>
        } else if (resultat.idAministrateur !== null && resultat.idAministrateur !== undefined) {
            return <div>
                PageAccueil Admin
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
