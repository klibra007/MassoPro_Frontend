import React, { useState } from 'react';
import Calendrier from './Calendrier';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, textAlign } from '@mui/system';
import { Button } from '@mui/material';

export default function PageReservation() {
  const [disponibiliteTab, setDisponibiliteTab] = useState([]);

  const disponibiliteTab2 = [
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
]

const Disponibilites = ()=> {
  if(disponibiliteTab2.length !== 0){
    return disponibiliteTab2.map((dispo, index)=>  <Button key={index} variant='contained' sx={{width: "150px", borderRadius: 5}}>{dispo.heureDebut}</Button> )
  }
  
}

const onClickHeuresReservation = () => {
  
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
        <Box
          sx={{display: 'grid',gridTemplateColumns: {md: '1fr 1fr 1fr', xs: '1fr 1fr 1fr'}, gap: 2, mt: 3}}
        >
          <Disponibilites/>
        </Box>
      </div>
    </div>
  )
}
