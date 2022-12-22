import React, { useState } from 'react';
import Calendrier from './Calendrier';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/system';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setHeureChoisie } from '../app/features/reservationSlice';
import { useNavigate } from 'react-router-dom';
import "../styles.css";

export default function PageReservation() {
  const [disponibiliteTab, setDisponibiliteTab] = useState([]);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const Disponibilites = () => {
    if (disponibiliteTab.length > 0) {
      return <Box
        sx={{ display: 'grid', gridTemplateColumns: { md: '1fr 1fr 1fr', xs: '1fr 1fr 1fr' }, gap: 2, mt: 3 }}
      >
        {disponibiliteTab.map((dispo, index) => <Button key={index} variant='contained' sx={{"&:hover": {backgroundColor:"#82654e"}, bgcolor: "#a98467", width: "150px", borderRadius: 5 }} onClick={() => {
          onClickHeuresReservation(dispo);
        }}>{dispo.heureDebut}</Button>)}
      </Box>

    } else {
      return <p>Aucune disponibilité pour cette date</p>
    }
  }

  const onClickHeuresReservation = (dispo) => {
    console.log("dispo : " + JSON.stringify(dispo));
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
        <Button variant='contained' href='/reservation' sx={{margin: 5, "&:hover": {backgroundColor:"#82654e", color: "white"} , bgcolor: "#a98467"}}>Retour sélection massages</Button>
      </div>
    </div>
  )
}
