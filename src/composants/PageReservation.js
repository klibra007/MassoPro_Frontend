import React from 'react';
import Calendrier from './Calendrier';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Box, textAlign } from '@mui/system';
import { Button } from '@mui/material';

export default function PageReservation() {
  return (
    <div>
      <Paper sx={{ width: "50%", margin: "2ch auto ", background: "#F6F6F6", textAlign: "center" }}>
        <Grid container spacing={0} direction={"row"} justifyContent="center" alignItems={"center"}>
          <Grid item xs={12} >
            <Calendrier />
          </Grid>
        </Grid>
      </Paper>

      <div style={{ width: "50%", margin: "2ch auto " }}>
        <h5 style={{ textAlign: "left" }}>Sélectionnez l'heure</h5>
        <Box
          sx={{display: 'grid',gridTemplateColumns: {md: '1fr 1fr 1fr'}, gap: 2, mt: 3}}
        >
          <Button variant='contained' sx={{width: "150px", borderRadius: 5}}>19:30</Button>
          <Button variant='contained' sx={{width: "150px", borderRadius: 5}}>19:30</Button>
          <Button variant='contained' sx={{width: "150px", borderRadius: 5}}>19:30</Button>
          <Button variant='contained' sx={{width: "150px", borderRadius: 5}}>19:30</Button>
          <Button variant='contained' sx={{width: "150px", borderRadius: 5}}>19:30</Button>
          <Button variant='contained' sx={{width: "150px", borderRadius: 5}}>19:30</Button>
        </Box>


      </div>
    </div>
  )
}
