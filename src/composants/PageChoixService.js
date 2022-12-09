import React, { useEffect, useState } from 'react';
import { Container, Button, Card, CardGroup, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, height, margin } from '@mui/system';
import { Grid } from '@mui/material';
import { selectConnexionData, setConnexionData } from '../app/features/connexionSlice';
import { selectAffichageChoixServices,  setAffichageChoixServices, setAffichageChoixDureeEtMasso, selectAffichageChoixDureeEtMasso, selectObjReservation, setObjetReservationIdService, setNomServiceChoisi, selectAffichageReservation, selectPrix, prix } from '../app/features/reservationSlice';
import { useDispatch } from 'react-redux';
import PageChoixDureeMasso from './PageChoixDureeMasso';
import PageReservation from './PageReservation';





export default function PageChoixService() {
  const [servicesTab, setServicesTab] = useState([]);

  const objReservation = useSelector(selectObjReservation);

  console.log("objet reservation : " + JSON.stringify(objReservation));

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const resultat = useSelector(selectConnexionData);

  const affichageChoixServices = useSelector(selectAffichageChoixServices);

  const affichageChoixDureeEtMasso = useSelector(selectAffichageChoixDureeEtMasso);
  
  const affichageReservation = useSelector(selectAffichageReservation);

  console.log(resultat);

  let strDossierServeur = "https://dev.pascalrocher.com";
  let strNomApplication = strDossierServeur + "/api/services";

  useEffect(() => {
    axios.get(strNomApplication)
      .then((response) => {
        alert("La réponse : " + JSON.stringify(response.data));
        setServicesTab(response.data);
      })
      .catch(error => alert(error))
  }, [])

  console.log("services " + servicesTab.length)

  useEffect(() => {
    if (JSON.stringify(resultat) === "{}") {
      navigate('/');
    }
  })

  const handleClickReserver = (service) => {
    dispatch(setObjetReservationIdService(service.id));
    console.log("dans handleClickReserver : " + JSON.stringify(objReservation));
    dispatch(setAffichageChoixServices());
    dispatch(setAffichageChoixDureeEtMasso());
    dispatch(setNomServiceChoisi(service.nomService))
  }

  const Services = () => {
    if (JSON.stringify(resultat) !== "{}") {
      return servicesTab.map((service) =>
        <Grid item xs={12} m={0} bgcolor={"yellow"} key={service.id}>
          <Card>
            <Card.Header className='text-aleft'>{service.nomService}</Card.Header>
            <Card.Body>
              <Card.Text className='text-aleft'>
                {service.description}
              </Card.Text>
              <Button variant="primary" onClick={()=>{handleClickReserver(service)}}>RÉSERVER</Button>
            </Card.Body>
          </Card>
        </Grid>
      )

    }
  }

  return (
    <>
      {affichageChoixServices && <div>
        <h1>Choisissez votre massage</h1>
        <Grid container spacing={0} height={"80vh"} justifyContent={"center"} style={{ backgroundColor: "pink" }}>
          <Box sx={{
            pt: 2,
            mt: 5,
            bgcolor: 'green',
            display: 'grid',
            gridTemplateColumns: { md: '1fr 1fr' },
            width: "1000px",
            gap: 2,
          }}>
            <Services />


          </Box>
        </Grid>
      </div>

      }
      {affichageChoixDureeEtMasso && <PageChoixDureeMasso/>}
      {affichageReservation && <PageReservation/>}

    </>



  )  // end return
}  // end export