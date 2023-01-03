import React from 'react';
import { selectConnexionData } from '../app/features/connexionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectAffichageReservation, selectRefresh, setAffichageChoixDureeEtMasso, setAffichageReservation, setRefresh, selectAffichageChoixServices, setAffichageChoixServices } from '../app/features/reservationSlice';
import { set } from 'date-fns';
import { Paper } from '@mui/material';

import PageListeServices from './Admin/PageListeServices';
import PageListeClients from './Admin/PageListeClients';

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
                {/* <Button style={{ backgroundColor: "#a98467", borderColor: "#a98467", width: "300px" }} onClick={handleClickReserver}>Réserver un rendez-vous</Button><br /><br /> */}
                <Button style={{ width: "300px" }} onClick={handleClickReserver}>Réserver un rendez-vous</Button><br /><br />
                <h1> Nos massages coup de coeur </h1>
                <div id='services'>
                    <div id='idBloc1'>
                        <Paper id='therap1' elevation={2}></Paper>
                        <Paper id='therapText1' elevation={2}>
                        <h1 className="therapTextTitle"> Massage de la tête et du cuir chevelu </h1>
                                <p className="therapTextDetail"> Un massage de la tête et du cuir chevelu est un pur plaisir sensoriel. Vous pouvez fermer les yeux, vous détendre et apprécier.
                                                                En plus de vous plonger dans un état zen total, ce type de massage peut soulager les maux de tête, réduire la sensation de stress et même stimuler la croissance des cheveux.</p>
                            
                        </Paper>
                    </div>
                    <div id='idBloc2'>
                    <Paper id='therapText2' elevation={2}>
                        <h1 className="therapTextTitle"> Massage pierres chaudes </h1>
                                <p className="therapTextDetail"> Lorsque vous réservez un massage aux pierres chaudes, vous pouvez vous attendre à ce que des pierres lisses et chauffées, faites de roche volcanique, soient placées sur certaines parties de votre corps.
                                    Les endroits typiques sont la colonne vertébrale, le ventre, la poitrine, le visage, les paumes, les pieds et les orteils pour soulager les tensions musculaires et améliorer le sommeil. Des pierres froides peuvent également être utilisées pour apaiser la peau et calmer les vaisseaux sanguins gonflés. 
                                </p>
                            </Paper>
                    
                        <Paper id='therap2' elevation={2}></Paper>
                    </div>
                    <div id='idBloc3'>
                        <Paper id='therap3' elevation={2}></Paper>
                        <Paper id='therapText3' elevation={2}>
                        <h1 className="therapTextTitle">  Massage des pieds </h1>
                                <p className="therapTextDetail"> Après une dure journée, nous avons tous besoin d'un massage des pieds apaisant. Ils sont relaxants et peuvent soulager les douleurs musculaires.
                                                                Le massage des pieds est excellent pour améliorer la circulation, stimuler les muscles, réduire les tensions et soulager la douleur.</p>
                            </Paper>
                    </div>

                    <div id='idBloc4'>
                       
                        <Paper id='therapText4' elevation={2}>
                        <h1 className="therapTextTitle"> Massage Suédois </h1>
                                <p className="therapTextDetail"> Un massage suédois devrait figurer en tête de votre liste si vous cherchez un moyen de vous détendre, ou si vous voulez expérimenter votre premier traitement.
                                    Il s'agit d'utiliser de longs mouvements et des pressions légères à fermes qui vous donneront une sensation de rajeunissement.
                                    En général, votre thérapeute utilise cinq techniques : caresses et glissements, pétrissage, frottement, tapotement ou martèlement, et vibration.
                                    Si vous cherchez à réduire les tensions ou si vous souffrez d'anxiété, optez sans hésiter pour un massage suédois. </p>
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
                <p><h2>Bonjour <b>{resultat.prenom}</b>, vous êtes connecté!</h2></p>
                {/* <p>Token : {resultat.token.substr(3)}</p> */}
                {/* <div id="idImageAccueilPersonnel"></div> */}
                <PageListeClients />
            </div>
        } else if (resultat.idAdministrateur !== null && resultat.idAdministrateur !== undefined) {
            return <div>
                <b>PageAccueil Admin</b>
                <p><h2>Bonjour <b>{resultat.prenom}</b>, vous êtes connecté!</h2></p>
                {/* <p>Token : {resultat.token.substr(3)}</p> */}                
                {/* <div id="idImageAccueilAdmin"></div> */}
                <PageListeServices />
            </div>
        } else {
            return <div>

                <div id='idImageAccueilNonConnecte' ></div>
                <div id='idAccueilNonConnecte' className='whitesmoke'>
                    <p style={{ fontSize: "25px", padding: "20px" }}> La massothérapie est l’une des plus anciennes thérapies existantes pour traiter ou soulager les douleurs physiques. <br/>Elle réunit différentes techniques manuelles pour relaxer les groupes musculaires.</p>
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
                                <h1 className="therapTextTitle"> Massage de la tête et du cuir chevelu </h1>
                                <p className="therapTextDetail"> Un massage de la tête et du cuir chevelu est un pur plaisir sensoriel. Vous pouvez fermer les yeux, vous détendre et apprécier.
                                                                En plus de vous plonger dans un état zen total, ce type de massage peut soulager les maux de tête, réduire la sensation de stress et même stimuler la croissance des cheveux.</p>
                            </div>

                        </div>
                        <div id='idBloc2'>
                            <div id='therapText2'>
                                <h1 className="therapTextTitle"> Massage Suédois </h1>
                                <p className="therapTextDetail"> Un massage suédois devrait figurer en tête de votre liste si vous cherchez un moyen de vous détendre, ou si vous voulez expérimenter votre premier traitement.
                                    Il s'agit d'utiliser de longs mouvements et des pressions légères à fermes qui vous donneront une sensation de rajeunissement.
                                    En général, votre thérapeute utilise cinq techniques : caresses et glissements, pétrissage, frottement, tapotement ou martèlement, et vibration.
                                    Si vous cherchez à réduire les tensions ou si vous souffrez d'anxiété, optez sans hésiter pour un massage suédois. </p>
                            </div>
                            <div id='therap2'>

                            </div>
                        </div>
                        <div id='idBloc3'>
                            <div id='therap3'>

                            </div>
                            <div id='therapText3'>
                                <h1 className="therapTextTitle">  Massage des pieds </h1>
                                <p className="therapTextDetail"> Après une dure journée, nous avons tous besoin d'un massage des pieds apaisant. Ils sont relaxants et peuvent soulager les douleurs musculaires.
                                                                Le massage des pieds est excellent pour améliorer la circulation, stimuler les muscles, réduire les tensions et soulager la douleur.</p>
                            </div>
                        </div>
                        <div id='idBloc4'>
                            <div id='therapText4'>
                                <h1 className="therapTextTitle"> Massage pierres chaudes </h1>
                                <p className="therapTextDetail"> Lorsque vous réservez un massage aux pierres chaudes, vous pouvez vous attendre à ce que des pierres lisses et chauffées, faites de roche volcanique, soient placées sur certaines parties de votre corps.
                                    Les endroits typiques sont la colonne vertébrale, le ventre, la poitrine, le visage, les paumes, les pieds et les orteils pour soulager les tensions musculaires et améliorer le sommeil. Des pierres froides peuvent également être utilisées pour apaiser la peau et calmer les vaisseaux sanguins gonflés. 
                                </p>
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
