import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import bgLocale from 'date-fns/locale/bg';
import { useDispatch, useSelector } from 'react-redux';
import { selectAffichageChoixServices, setAffichageChoixServices, setAffichageChoixDureeEtMasso, selectAffichageChoixDureeEtMasso, selectObjReservation, setObjetReservationIdService, selectNomServiceChoisi, selectDureeChoisie, setDureeChoisie, selectNomMassoChoisi, setNomMassoChoisi, setObjetReservationIdDuree, setObjetReservationIdPersonnel, setAffichageReservation, selectAffichageReservation, setObjetReservationDate } from '../app/features/reservationSlice';
import axios from 'axios';




export default function StaticDatePickerDemo({setDisponibiliteTab}) {
  const [value, setValue] = useState(dayjs());
  

  const objReservation = useSelector(selectObjReservation);

  const dispatch = useDispatch();

  console.log("obj: " + JSON.stringify(objReservation));

  const isWeekend = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  dispatch(setObjetReservationDate(value.format('DD/MM/YYYY')));

  const handleAccept = () => {

    console.log("dans le handleAccept: " + JSON.stringify(objReservation));

    let strDossierServeur = "https://dev.pascalrocher.com";
    let strNomApplication = strDossierServeur + "/api/rendezvous";

    alert(JSON.stringify(objReservation));

    axios.get(strNomApplication, JSON.stringify(objReservation))
      .then((response) => {
        alert("La réponse: " + JSON.stringify(response));
        //setResultat(response.data);
        if (response.data.length !== 0) {
          setDisponibiliteTab(response.data);
          
          //dispatch(setAffichageAccueil(true));
          //dispatch(setAffichageConnexion(false));
         
    
        }
      })
      .catch((error) => {
        alert(error.response);
      });

  }

  //let tab = [5, 14, 22, 30];

  //useEffect(() => console.log(value.format('DD') === '02'), [value]) // YY, DD, MM, d

  console.log("value: " + value.format('DD/MM/YYYY'));

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'} localeText={{ cancelButtonLabel: "Annuler", datePickerDefaultToolbarTitle: "Choisir une date" }}>
      <StaticDatePicker
        orientation="landscape"
        //displayStaticWrapperAs="desktop"
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
        //shouldDisableDate = {(value) => {return tab.find((date) => parseInt(value.format('DD')) === date)}}
        //shouldDisableDate={(value) => { return parseInt(value.format('d')) === 0 || parseInt(value.format('d')) === 6 }}
        shouldDisableDate={isWeekend}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}