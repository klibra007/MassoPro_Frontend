import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { useDispatch, useSelector } from 'react-redux';
import { selectObjReservation, setObjetReservationDate, setDateChoisie } from '../app/features/reservationSlice';
import axios from 'axios';
import { Button } from 'react-bootstrap';


export default function StaticDatePickerDemo({setDisponibiliteTab}) {
  const [value, setValue] = useState(dayjs());
  
  const objReservation = useSelector(selectObjReservation);

  const dispatch = useDispatch();

  console.log("obj: " + JSON.stringify(objReservation));

  const isWeekend = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  dispatch(setObjetReservationDate(value.format('YYYY-MM-DD')));

  const handleAccept = () => {

    console.log("dans le handleAccept: " + JSON.stringify(objReservation));

    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/rendezvous";

    console.log(JSON.stringify(objReservation));

    axios.post(strNomApplication, JSON.stringify(objReservation), {
      headers: {
          'Content-Type': 'application/json'
      }
  })
      .then((response) => {
        console.log("La réponse: " + JSON.stringify(response));
        if (response.data.length !== 0) {
          setDisponibiliteTab(response.data);
          dispatch(setDateChoisie(value.format("dddd, DD MMM YYYY")));
          console.log("setDateChoisie: " + value.format());
        }
      })
      .catch((error) => {
        alert(error.response);
      });

  }

  console.log("value: " + value.format('DD/MM/YYYY'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'} localeText={{ cancelButtonLabel: "Annuler", datePickerDefaultToolbarTitle: "Choisir une date" }}>
      <StaticDatePicker
        orientation="landscape"
        openTo="day"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          console.log("accept in change");
        }}
        
        onAccept={() => {
          console.log("accept " + value);
          handleAccept();
        }}
        shouldDisableDate={isWeekend}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>

    
  );
}