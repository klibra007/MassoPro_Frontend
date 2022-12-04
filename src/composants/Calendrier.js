import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import bgLocale from 'date-fns/locale/bg';



export default function StaticDatePickerDemo() {
  const [value, setValue] = useState(dayjs());

  const isWeekend = (date) => {
    const day = date.day();
    return day === 0 || day === 6;
  };

  //let tab = [5, 14, 22, 30];

  //useEffect(() => console.log(value.format('DD') === '02'), [value]) // YY, DD, MM, d

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={'fr'} localeText={{ cancelButtonLabel: "Annuler", datePickerDefaultToolbarTitle: "Choisir une date" }}>
      <StaticDatePicker
        orientation="landscape"
        //displayStaticWrapperAs="desktop"
        openTo="day"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        //shouldDisableDate = {(value) => {return tab.find((date) => parseInt(value.format('DD')) === date)}}
        //shouldDisableDate={(value) => { return parseInt(value.format('d')) === 0 || parseInt(value.format('d')) === 6 }}
        shouldDisableDate={isWeekend}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  );
}