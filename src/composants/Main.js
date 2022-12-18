import React from 'react';
import PageAccueil from './PageAccueil';
import PageConnexion from './PageConnexion';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PageChoisirService from './PageChoixService';
import PageConfirmationRdv from './PageConfirmationRdv';
import PageRdvConfirme from './PageRdvConfirme';
import PageVosReservations from './PageVosReservations';
import PageListeReservations from './Admin/PageListeReservations';
import PageListeCalendriers from './Admin/PageListeCalendriers';
import PageListeClients from './Admin/PageListeClients';
import PageClientForm from './Admin/PageClientForm';
import PageListeServices from './Admin/PageListeServices';
import PageServiceForm from './Admin/PageServiceForm';
import PageListeDurees from './Admin/PageListeDurees';
import PageDureeForm from './Admin/PageDureeForm';
import PageListeDisponibilites from './Admin/PageListeDisponibilites';
import PageProfil from './PageProfil';


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
        <Route path='/profil' element={<PageProfil/>}></Route>
        <Route path='/admin/reservations' element={<PageListeReservations />}></Route>
        <Route path='/admin/calendriers' element={<PageListeCalendriers />}></Route>
        <Route path='/admin/disponibilites' element={<PageListeDisponibilites />}></Route>
        <Route path='/admin/clients' element={<PageListeClients />}></Route>
        <Route path='/admin/clients/form' element={<PageClientForm />}></Route>
        <Route path='/admin/services' element={<PageListeServices />}></Route>        
        <Route path='/admin/services/form' element={<PageServiceForm />}></Route>
        <Route path='/admin/durees' element={<PageListeDurees />}></Route>
        <Route path='/admin/durees/form' element={<PageDureeForm />}></Route>
      </Routes>
      {/* <PageListeServices/> */}
    </div>
   
  )
}
