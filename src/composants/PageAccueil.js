import React from 'react';
import { selectConnexionData } from '../app/features/connexionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAffichageReservation, selectRefresh, setAffichageChoixDureeEtMasso, setAffichageReservation, setRefresh, selectAffichageChoixServices, setAffichageChoixServices } from '../app/features/reservationSlice';
import { set } from 'date-fns';
import { Paper } from '@mui/material';

export default function PageAccueil() {
    const resultat = useSelector(selectConnexionData);
    const affichageReservation = useSelector(selectAffichageReservation);
    const affichageChoixServices = useSelector(selectAffichageChoixServices)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    ;

    console.log(localStorage.getItem('connexionData'));
    console.log("resultat dans accueil : " + resultat.idClient)

    const handleClickReserver = () => {
        if(resultat !== null){
            //alert(affichageChoixServices)
            dispatch(setAffichageChoixServices(true));
            //dispatch(setAffichageChoixDureeEtMasso(true));
            dispatch(setAffichageReservation(false));
            navigate('/reservation');

        }
    }

    const handleClickConnecter = () => {
        if (resultat !== null) {
            navigate('/connexion');
        }
    }

    const AccueilProfil = () => {
        if (resultat.idClient !== null && resultat.idClient !== undefined) {
            return <div>
                {/* <b>PageAccueil Client</b> */}
                <h2>Bonjour {resultat.prenom}!</h2><br /><br />
                {/* <p style={{ fontWeight: "bold" }}>Token : {resultat.token.substr(3)}</p> */}
                <Button style={{ backgroundColor: "#a98467", borderColor: "#a98467", width: "300px" }} onClick={handleClickReserver}>Réserver un rendez-vous</Button><br /><br />

                <h1> Nos massages coup de coeur </h1>
                <div id='services'>
                    <div id='idBloc1'>
                        {/* <Paper id='therap1' elevation={2}></Paper> */}
                        <Paper id='therapText1' elevation={2}>
                            <h1> Massage thérapeutique </h1>
                            <p> Massage en profondeur ciblé sur les tensions et douleurs ou sur un besoin spécifique. </p>
                        </Paper>
                    </div>
                    <div id='idBloc2'>
                        <Paper id='therapText2' elevation={2}>
                            <h1> Massage Suédois </h1>
                            <p> Massage en profondeur ciblé sur les tensions et douleurs ou sur un besoin spécifique. </p>
                        </Paper>
                        <Paper id='therap2' elevation={2}></Paper>
                    </div>
                    <div id='idBloc3'>
                        <Paper id='therap3' elevation={2}></Paper>
                        <Paper id='therapText3' elevation={2}>
                            <h1> Massage pierres chauffantes </h1>
                            <p> Massage en profondeur ciblé sur les tensions et douleurs ou sur un besoin spécifique. </p>
                        </Paper>
                    </div>

                    <div id='idBloc4'>
                        <Paper id='therapText4' elevation={2}>
                            <h1> Massage Suédois </h1>
                            <p> Massage en profondeur ciblé sur les tensions et douleurs ou sur un besoin spécifique. </p>
                        </Paper>
                    
                        <Paper id='therap4' elevation={2}></Paper>
                        <div >

                        </div>
                    </div>


                </div>
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

                <div id='idImageAccueilNonConnecte'></div>
                <div id='idAccueilNonConnecte'>
                    <p style={{ fontWeight: "bold", fontSize: "20px" }}> La massothérapie est l’une des plus anciennes thérapies existantes pour traiter ou soulager les douleurs physiques. Elle réunit différentes techniques manuelles pour relaxer les groupes musculaires.</p>
                    <Button
                        style={{ backgroundColor: "#a98467", borderColor: "#a98467" }}
                        onClick={handleClickConnecter}>Prendre un rendez-vous
                    </Button><br /><br />
                    <h1> Nos massages coup de coeur </h1>
                    <div id='services'>
                        <div id='idBloc1'>
                            <div id='therap1'>

                            </div>
                            <div id='therapText1'>
                                <h1> Massage thérapeutique </h1>
                                <p> Massage en profondeur ciblé sur les tensions et douleurs ou sur un besoin spécifique. </p>
                            </div>

                        </div>
                        <div id='idBloc2'>
                            <div id='therapText2'>
                                <h1> Massage Suédois </h1>
                                <p> Massage en profondeur ciblé sur les tensions et douleurs ou sur un besoin spécifique. </p>
                            </div>
                            <div id='therap2'>

                            </div>
                        </div>
                        <div id='idBloc3'>
                            <div id='therap3'>

                            </div>
                            <div id='therapText3'>
                                <h1> Massage pierres chauffantes </h1>
                                <p> Massage en profondeur ciblé sur les tensions et douleurs ou sur un besoin spécifique. </p>
                            </div>
                        </div>
                        <div id='idBloc4'>
                            <div id='therapText4'>
                                <h1> Massage Suédois </h1>
                                <p> Massage en profondeur ciblé sur les tensions et douleurs ou sur un besoin spécifique. </p>
                            </div>
                            <div id='therap4'>

                            </div>
                        </div>

                    </div>
                </div>

            </div>
        }
    }

    return (
        <AccueilProfil />
    )
}
