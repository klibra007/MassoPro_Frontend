import React from 'react';
import PageAccueil from './PageAccueil';
import PageConnexion from './PageConnexion';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageChoisirService from './PageChoixService';
import PageConfirmationRdv from './PageConfirmationRdv';
import PageRdvConfirme from './PageRdvConfirme';
import PageVosReservations from './PageVosReservations';
import PageListeServices from './Admin/PageListeServices';

export default function Main() {
  return (
    <div id='idMain'>
      <Routes>
        <Route path='/connexion' element={<PageConnexion />}></Route>
        <Route path='/' element={<PageAccueil />}></Route>
        <Route path='/reservation' element={<PageChoisirService />}></Route>
        <Route path='/reservation/confirmation' element={<PageConfirmationRdv />}></Route>
        <Route path='/reservation/confirmation#2' element={<PageRdvConfirme />}></Route>
        <Route path='/vosreservations' element={<PageVosReservations />}></Route>
        <Route path='/admin/services' element={<PageListeServices />}></Route>
      </Routes>
      {/* <PageListeServices/> */}
    </div>
   
  )
}
