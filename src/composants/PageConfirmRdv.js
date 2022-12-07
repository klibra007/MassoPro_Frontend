import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import Moment from 'moment';
import 'moment/min/locales';
import axios from 'axios';

export default function MapInvoice() {
    const strDossierServeur = "https://dev.pascalrocher.com";

    // Test data
    const client_id=1;
    const TPS=4.50;
    const TVQ=8.97;

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
      useEffect(() => {      
         axios.get(strNomApplication, {
            headers: {
              'Content-Type' : 'application/json'
         }})
           .then((response) => {
              // Convert JSON into array object
              var arr=[];
              arr.push(response.data[0]);
              setClient(arr)}) 
           .catch((error) => console.log(error)); 
      }, [])
    }

    let getDow = ( dateStr ) => { 
        const dow=['dimanche','lundi','mardi','mercredi','jeudi','vendredi','samedi'];
        const date = Moment( dateStr );
        return dow[date.day()];
    }    

    let getTotal = ( recObj ) => {
      let sum = recObj.reduce(function(prev, current) {
         return prev + +current.prix
      }, 0);
      return sum;
    }

    const handleClickRdv = () => {
    }      

    Moment.locale('fr');
    GetClient(client_id); 

    return (  
    <Container>
      <Row className='justify-content-center'>
       <Col xs={8}> 
       <Form>  
        { rdvs.map(rdv => {
          return (
            <Card className="text-aleft">
              <Card.Header className='p-2'>
                Service: {rdv.service}<br/>
                {getDow(rdv.date)}, {Moment(rdv.date).format('D MMMM YYYY')} {rdv.stime}<br />
                Massothérapeute: {rdv.masso}<br />
                Durée: {rdv.duree}
              </Card.Header>
            </Card>
          )
          })
        }

        { client.map(cli => {
          return (
            <Card className="text-aleft mt-1">
              <Card.Header className='p-2'>
                {cli.prenom}&nbsp;{cli.nom}<br/>
                {cli.courriel}<br/>
                {cli.telephone}<br/>                
              </Card.Header>
            </Card>
          )
          })
        }          

        <Row className='p-1 mt-1'>
            <Col>Vos réservation ne sont pas encore confirmées</Col>
        </Row>
        <Row className='p-1 mt-1'>
            <Col>Veuillez vérifier tous les détails de la réservation ci-dessous avant de continuer.</Col>
        </Row>        

        <Row className='text-aleft p-1 mt-2'>
            <Col>Prix</Col>
        </Row>

        <Card className="text-aleft mt-1">
          <Card.Header className='p-1'>
            <Row>
              <Col xs={7}>Description</Col>  
              <Col className="text-end" xs={2}>Prix unitaire</Col>      
              <Col className="text-center" xs={2}>Quantité</Col>  
              <Col className="text-end" xs={1}>Prix</Col>                          
            </Row>    
          </Card.Header>
        </Card> 

        { rdvs.map(rdv => {
          return (
            <>   {/* React Fragment  */}
             <Row className='text-aleft p-1'>
                <Col><b>{getDow(rdv.date)}, {Moment(rdv.date).format('D MMMM YYYY')} {rdv.stime}</b></Col>
             </Row>

             <Row className='text-aleft p-1'>
               <Col xs={7}>Service: {rdv.service}</Col>  
               <Col className="text-end" xs={2}>$0</Col>      
               <Col className="text-center" xs={2}>1</Col>  
               <Col className="text-end" xs={1}>$0</Col>                          
             </Row>

             <Row className='text-aleft p-1'>
               <Col xs={7}>Durée: {rdv.duree}</Col>  
               <Col className="text-end" xs={2}>${rdv.prix.toFixed(2)}</Col>      
               <Col className="text-center" xs={2}>1</Col>  
               <Col className="text-end" xs={1}>${rdv.prix.toFixed(2)}</Col>                          
             </Row> 

             <Row className='p-1'>
                <Col className="text-end" xs={11}><b>Total</b></Col>
                <Col className="text-end" xs={1}><b>${getTotal(rdvs).toFixed(2)}</b></Col>
             </Row>               

             <Row className='text-aleft p-1 mb-1'>
                <Col>Les taxes suivants sont incluses dans le prix:</Col>
             </Row>   
             <Row className='p-1'>
                <Col className='text-aleft' xs={11}>Inclus: TPS</Col>
                <Col className="text-end" xs={1}>${TPS.toFixed(2)}</Col>
             </Row>             
             <Row className='p-1'>
                <Col className='text-aleft' xs={10}>Inclus: TVQ</Col>
                <Col className='text-end' xs={2}>${TVQ.toFixed(2)}</Col>
             </Row>

             <Row className='text-aleft p-1 mt-2'>
                <Col>Méthode de paiement: <i>Payer plus tard</i></Col>
              </Row>                     
            </>            
          )
          })
        }

         <Form.Group className="mt-4">
            <Button variant='primary' onClick={handleClickRdv}>Confirmer la réservation</Button>     
         </Form.Group>   
        </Form>        
       </Col>                               
     </Row>
    </Container>
    )  // end return
}  // end export      
