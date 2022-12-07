import React from 'react'
import PageChoisirService from './PageChoisirService'
import PageConnexion from './PageConnexion'
import PageRegister from './PageRegister'
import PageConfirmRdv from './PageConfirmRdv'

export default function Main() {
  
  return (
    <div id='idMain'>
  <PageConfirmRdv />  
{/*     <PageConnexion/>   
      <PageRegister />   */}
      <PageChoisirService />
    </div>
  )
}
