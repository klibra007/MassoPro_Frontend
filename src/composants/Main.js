import React, { useEffect, useState } from 'react';
import PageAccueil from './PageAccueil';
import PageConnexion from './PageConnexion';
import PageReservation from './PageReservation';
import { useSelector } from 'react-redux';
import { selectConnexionData } from '../app/features/connexionSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import PageChoisirService from './PageChoixService';
import PageConfirmationRdv from './PageConfirmationRdv';
import PageRdvConfirme from './PageRdvConfirme';
import PageVosReservations from './PageVosReservations';
import axios from 'axios';
import { selectAffichageChoixServices, setAffichageChoixServices, setAffichageChoixDureeEtMasso, selectAffichageChoixDureeEtMasso, selectObjReservation, setObjetReservationIdService, selectNomServiceChoisi, selectDureeChoisie, setDureeChoisie, selectNomMassoChoisi, setNomMassoChoisi, setObjetReservationIdDuree, setObjetReservationIdPersonnel, setAffichageReservation, selectAffichageReservation, setObjetReservationDate, setHeureChoisie, selectHeureChoisie, setTabReservation, selectTabReservation } from '../app/features/reservationSlice';

export default function Main() {
  const affichageAccueil = useSelector(selectAffichageChoixServices);
  const affichageConnexion = useSelector(selectAffichageChoixDureeEtMasso);
  const [resultat, setResultat] = useState({});
  /*const [tabReservations, setTabReservations] = useState([]);
  const connexionData = useSelector(selectConnexionData);

  let strDossierServeur = "https://dev.pascalrocher.com";
  let strNomApplication = strDossierServeur + "/api/rendezvous";
  useEffect(() => {
    console.log("Je suis dans le useEffect main");
    axios.post(strNomApplication, { "idClient": connexionData.idClient })
      .then((response) => {
        alert("La réponse : " + JSON.stringify(response.data));
        //setTabReservations(response.data);
        setTabReservations(response.data);
        //setServicesTab(response.data);
      })
      .catch(error => alert(error))
  }, [])

  console.log("tatabReservation dans le main: " + tabReservations)*/

  useEffect(()=>{
    console.log("AU MONTAGE DU MAIN");

    return ()=>{
      console.log("AU DEMONTAGE DU MAIN")
    }
  });

  return (
    <div id='idMain'>
      <Routes>
        <Route path='/' element={<PageConnexion />}></Route>
        <Route exact path='/accueil' element={<PageAccueil />}></Route>
        <Route path='/reservation' element={<PageChoisirService />}></Route>
        <Route path='/reservation/confirmation' element={<PageConfirmationRdv />}></Route>
        <Route path='/reservation/confirmation#2' element={<PageRdvConfirme />}></Route>
        <Route path='/vosreservations' element={<PageVosReservations />}></Route>
      </Routes>
      {false && <PageConfirmationRdv />}
    </div>
  )
}
