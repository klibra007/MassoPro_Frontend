import React, { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import Moment from 'moment';
import 'moment/min/locales';
import axios from 'axios';

export default function PageRdvConfirmer() {
  const strDossierServeur = "https://dev.pascalrocher.com";

  // Test data
  const client_id=1;
  const numeroRdv=281952683;
  const prix=100.20;

  const rdvs = [
      {
        id: 1, 
        date: "2022-12-5",
        stime: "11:00",
        duree: 60,
        service: "Massage thérapeutique",
        prix: 100.20,
        masso: "Oldie Gosselin"
      }        
    ]    

    const [client, setClient] = useState([]);

    const GetClient = (id) => {
       let strNomApplication = strDossierServeur + `/api/client/${id}`;       
 
       axios.get(strNomApplication, {
           headers: {
               'Content-Type' : 'application/json'
           }            
       })
       .then((response) => {
          // Convert JSON into array object
          var arr=[];
          arr.push(response.data[0]);
          setClient(arr)})         
       .catch((error) => console.log(error));        
    }    
    
    let getDow = ( dateStr ) => { 
        const dow=['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'];
        const date = Moment( dateStr );
        return dow[date.day()];
    } 
    
    const handleClickMenu = () => {
    }   

  Moment.locale('fr');
  //GetClient(client_id); 
  return (  
   <Container>
     <Row className='justify-content-center'>
      <Col xs={8}> 
        <Form>  
         { rdvs.map(rdv => {
           return (
             <Card className="text-aleft mb-2">
               <Card.Header className='p-2'>
                  {rdv.service}<br/>
                  {getDow(rdv.date)}, {Moment(rdv.date).format('D MMMM YYYY')} {rdv.stime}<br />
               </Card.Header>
              </Card>
           )
           })
         }
          <Row className='p-1 mt-1'>
            <Col>Rendez-vous confirmés</Col>
          </Row>     
          <Row className='p-1'>
            <Col className='text-end' xs={6}>Numéro de réservation:</Col>
            <Col className="text-aleft" xs={6}>{numeroRdv}</Col>
          </Row> 
          <Row className='p-1'>
            <Col className='text-end' xs={6}>Prix total:</Col>
            <Col className="text-aleft" xs={6}>${rdvs[0].prix.toFixed(2)}</Col>
          </Row> 

          <Card className="text-aleft mt-2">
            <Card.Header className='p-1'>
              <Card.Text>Un courriel électronique a été envoyé à 'email' avec touts les détails de la réservation</Card.Text>   
            </Card.Header>
          </Card>  
          <Card className="text-aleft mt-2">
            <Card.Header className='p-1'>
              <Card.Text>Si vous ne le trouvez pas dans votre boite aux lettres sous peu, veuillez vérifier le
                dossier des courriers indésirables</Card.Text>   
            </Card.Header>
          </Card>   

           <Form.Group className="mt-4">
              <Button variant='primary' onClick={handleClickMenu}>Retour au menu</Button>     
           </Form.Group>                                                    
        </Form>        
      </Col>                               
     </Row>
   </Container>
)  // end return
}  // end export      