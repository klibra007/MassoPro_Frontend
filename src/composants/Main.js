import React from 'react';
import PageConnexion from './PageConnexion';
import PageReservation from './PageReservation';
import PageVosReservations from './PageVosReservations';
import PageAnnulerReservation from './PageAnnulerReservation';
import PageAnnulerConfirmation from './PageAnnulerConfirmation';

export default function Main() {
  
  return (
    <div id='idMain'>
      <PageVosReservations/>
    </div>
  )
}
