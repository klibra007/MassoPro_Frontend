import React, { useState } from 'react';
import PageAccueil from './PageAccueil';
import PageConnexion from './PageConnexion';
import PageReservation from './PageReservation';
import { useSelector } from 'react-redux';
import { selectAffichageChoixServices, selectAffichageChoixDureeEtMasso } from '../app/features/connexionSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import PageChoisirService from './PageChoixService';

export default function Main() {
  const affichageAccueil = useSelector(selectAffichageChoixServices);
  const affichageConnexion = useSelector(selectAffichageChoixDureeEtMasso);
  const [resultat, setResultat] = useState({});

  return (
    <div id='idMain'>
      <Routes>
        <Route path='/' element={<PageConnexion />}></Route>
        <Route exact path='/accueil' element={<PageAccueil />}></Route>
        <Route path='/reservation' element={<PageChoisirService/>}></Route>
      </Routes>
    </div>
  )
}
