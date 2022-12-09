import React, { useEffect, useState } from 'react';
import Calendrier from './Calendrier';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, textAlign } from '@mui/system';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { selectAffichageChoixServices, setAffichageChoixServices, setAffichageChoixDureeEtMasso, selectAffichageChoixDureeEtMasso, selectObjReservation, setObjetReservationIdService, selectNomServiceChoisi, selectDureeChoisie, setDureeChoisie, selectNomMassoChoisi, setNomMassoChoisi, setObjetReservationIdDuree, setObjetReservationIdPersonnel, setAffichageReservation, selectAffichageReservation, setObjetReservationDate, setHeureChoisie, selectHeureChoisie } from '../app/features/reservationSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { selectConnexionData } from '../app/features/connexionSlice';


export default function PageReservation() {
  const [disponibiliteTab, setDisponibiliteTab] = useState([]);

  const objReservation = useSelector(selectObjReservation);

  const dispatch = useDispatch();

  const connexionData = useSelector(selectConnexionData);

  //alert('connexion ' + JSON.stringify(connexionData) )

  const navigate = useNavigate();


  //faciliterait la tache si le format ici était {"reservation": objReservation, "heures": [heureDebut, heureFin]}

  /*const disponibiliteTab2 = [
    {
      "heureDebut": "08:00",
      "heureFin": "08:30"
    },
    {
      "heureDebut": "08:30",
      "heureFin": "09:00"
    },
    {
      "heureDebut": "09:00",
      "heureFin": "09:30"
    },
    {
      "heureDebut": "09:30",
      "heureFin": "10:00"
    },
    {
      "heureDebut": "10:00",
      "heureFin": "10:30"
    },
    {
      "heureDebut": "10:30",
      "heureFin": "11:00"
    },
    {
      "heureDebut": "11:00",
      "heureFin": "11:30"
    },
    {
      "heureDebut": "11:30",
      "heureFin": "12:00"
    },
    {
      "heureDebut": "14:00",
      "heureFin": "14:30"
    },
    {
      "heureDebut": "14:30",
      "heureFin": "15:00"
    },
    {
      "heureDebut": "15:00",
      "heureFin": "15:30"
    },
    {
      "heureDebut": "15:30",
      "heureFin": "16:00"
    },
    {
      "heureDebut": "16:00",
      "heureFin": "16:30"
    }
  ]*/

  /*const {date, idService, idPersonnel, idDuree} = objReservation;
//{...objReservation}
  console.log("formatage objet: " + JSON.stringify({date, "heureDebut": "5", "heureFin" : "6", idService}) )*/

  const Disponibilites = () => {
    if (disponibiliteTab.length > 0) {
      return <Box
        sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr 1fr', xs: '1fr 1fr 1fr' }, gap: 2, mt: 3 }}
      >
        {disponibiliteTab.map((dispo, index) => <Button key={index} variant='contained' sx={{ width: "150px", borderRadius: 5 }} onClick={() => {
          onClickHeuresReservation(dispo);
        }}>{dispo.heureDebut}</Button>)}
      </Box>


    } else {
      return <p>Aucune disponibilité pour cette date</p>
    }

  }

  const onClickHeuresReservation = (dispo) => {
    alert("dispo : " +JSON.stringify(dispo));
    dispatch(setHeureChoisie(dispo));

    navigate('/reservation/confirmation');


  }

  return (
    <div>
      <Paper sx={{ width: "50%", margin: "2ch auto ", background: "#F6F6F6", textAlign: "center" }}>
        <Grid container spacing={0} direction={"row"} justifyContent="center" alignItems={"center"}>
          <Grid item xs={12} >
            <Calendrier setDisponibiliteTab={setDisponibiliteTab} />
          </Grid>
        </Grid>
      </Paper>

      <div style={{ width: "50%", margin: "2ch auto " }}>
        <h5 style={{ textAlign: "left" }}>Sélectionnez l'heure</h5>
        <Disponibilites />
      </div>
    </div>
  )
}
