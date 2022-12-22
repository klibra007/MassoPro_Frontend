import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box } from '@mui/system';
import { Grid } from '@mui/material';
import { selectConnexionData } from '../app/features/connexionSlice';
import { selectAffichageChoixServices, setAffichageChoixServices, setAffichageChoixDureeEtMasso, selectAffichageChoixDureeEtMasso, selectObjReservation, setObjetReservationIdService, setNomServiceChoisi, selectAffichageReservation, selectRefresh } from '../app/features/reservationSlice';
import { useDispatch } from 'react-redux';
import PageChoixDureeMasso from './PageChoixDureeMasso';
import PageReservation from './PageReservation';
import '../styles.css';

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

  const refresh = useSelector(selectRefresh);

  console.log(resultat);

  let strDossierServeur = "https://dev.pascalrocher.com";
  let strNomApplication = strDossierServeur + "/api/services";

  useEffect(() => {
    axios.get(strNomApplication)
      .then((response) => {
        console.log("La réponse : " + JSON.stringify(response.data));
        setServicesTab(response.data);
      })
      .catch(error => alert(error))
  }, [])

  console.log("services " + servicesTab.length)

  useEffect(() => {
    if (JSON.stringify(resultat) === "{}") {
      navigate('/connexion');
    }
  })

  const handleClickReserver = (service) => {
    dispatch(setObjetReservationIdService(service.id));
    console.log("dans handleClickReserver : " + JSON.stringify(objReservation));
    dispatch(setAffichageChoixServices(false));
    dispatch(setAffichageChoixDureeEtMasso(true));
    dispatch(setNomServiceChoisi(service.nomService))
  }

  const Services = () => {
    if (JSON.stringify(resultat) !== "{}") {
      return servicesTab.map((service) => {
        if (service.estActif === 1) {
          return <Grid item xs={12} m={0} bgcolor={"yellow"} key={service.id} style={{ height: "250px" }} >
            <Card className='h-100' >
              <Card.Header className='text-aleft'>{service.nomService}</Card.Header>
              <Card.Body>
                <Card.Text className='text-aleft'>
                  {service.description}
                </Card.Text>
                <Button variant="primary" onClick={() => { handleClickReserver(service) }}>RÉSERVER</Button>
              </Card.Body>
            </Card>
          </Grid>
        }
      }
      )

    }
  }

  return (
    <>
      {affichageChoixServices && <div>
        <h1>Choisissez votre massage</h1>
        <Grid container spacing={0} minHeight={"80vh"} justifyContent={"center"}>
          <Box sx={{
            pt: 2,
            mt: 5,
            mb: 5,
            //bgcolor: 'white',
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
      {affichageChoixDureeEtMasso && <PageChoixDureeMasso />}
      {affichageReservation && <PageReservation />}
    </>
  )
}