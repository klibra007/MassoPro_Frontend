import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import ReservationCard from './ReservationCard';
import ConfirmDialog from './Admin/ConfirmDialog';
import { useDispatch, useSelector } from 'react-redux';
import { setTabReservation, selectTabReservation } from '../app/features/reservationSlice';
import { selectConnexionData } from '../app/features/connexionSlice';
import { useNavigate } from 'react-router-dom';
import { getYear } from 'date-fns';
import { Paper, Grid } from '@mui/material';
import PageModifierReservation from './CommonFiles/PageModifierReservation';
import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function PageVosReservations() {
  const tabReservations = useSelector(selectTabReservation);
  const connexionData = useSelector(selectConnexionData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [annulerMsg, setAnnulerMsg] = useState();
  const [reservationId, setReservationId] = useState();
  const [reservationIdConfirmDialog, setReservationIdConfirmDialog] = useState();
  const [reservation, setReservation] = useState();
  const [showModRes, setShowModRes] = useState(false);
  const [showData, setShowData] = useState({});
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [notifyMsg, setNotifyMsg] = useState('');

  const handleCloseSnack = () => {
    setOpenSnackBar(false);
  };

  useEffect(() => {
    if (JSON.stringify(connexionData) === "{}") {
      navigate('/connexion');
    }
  })

  let strDossierServeur = "https://dev.pascalrocher.com";
  let strNomApplication = strDossierServeur + "/api/rendezvous";

  const getReservations = () => {
    axios.post(strNomApplication, { "idClient": connexionData.idClient })
      .then((response) => {
        if (response.data.status === true) {
          console.log("idClient=" + connexionData.idClient + " La réponse /api/rendezvous: " + JSON.stringify(response.data.reservations));
          dispatch(setTabReservation(response.data.reservations));
          setReservation(response.data.reservations)
        }

      })
      .catch(error => alert(error))
  }


  useEffect(() => {
    getReservations();
  }, []);

  const Reservation = () => {
    console.log("DANS LE FRAGMENT REACT RESERVATION " + tabReservations.length);
    if (tabReservations.length > 0) {
      console.log("length" + tabReservations.length)
      return tabReservations.map(rdv => {
        const currentDateTime = Date().toLocaleString();
        console.log(currentDateTime);
        return (
          <div className="mtop-40" key={rdv.reservation}>
            <ReservationCard
              idRes={rdv.id}
              dateRes={rdv.date}
              idPersonnel={`${rdv.idPersonnel}`}
              prenomNomPersonnel={`${rdv.prenom} ${rdv.nom}`}
              idService={rdv.idService}
              nomService={rdv.nomService}
              idDuree={`${rdv.idDuree}`}
              duree={`${rdv.duree} mn`}
              prix={`${rdv.prix}`}
              reservation={rdv.reservation}
              heureDebut={rdv.heureDebut}
              rdv={rdv}
              openConfirmDialog={openConfirmDialog}
              openPageModifierReservation={openPageModifierReservation}
              isDisabled={handleValidateAnnuler(rdv.date, rdv.heureDebut)}
            />
          </div>
        )
      }
      )
    }
    else {
      return <p>Vous n'avez aucune réservation actuellement</p>
    }
  }

  const openConfirmDialog = (rdv) => {
    console.log("In OpenDialog")
    setReservationIdConfirmDialog(rdv.id);
    setReservationId(rdv.reservation);
    console.log("Type Personnel: ", connexionData.typePersonnel)

    if (connexionData.idClient !== null && connexionData.idClient !== undefined) {

      setAnnulerMsg(`Êtes-vous certain de vouloir annuler votre réservation numéro ${rdv.reservation} pour le ${rdv.nomService} avec ${rdv.prenom}  ${rdv.nom} le ${rdv.date}?`);
    }
    else if (connexionData.idPersonnel !== null && connexionData.idPersonnel !== undefined && connexionData.typePersonnel === "Secrétaire") {

      setAnnulerMsg(`Êtes-vous certain de vouloir annuler cette réservation? \n Réservation : ${rdv.reservation} \n Client : ${rdv.prenom} ${rdv.nom} \n Service: ${rdv.nomService} \n Massothérapeute : ${rdv.prenom}  ${rdv.nom} \n Date :  ${rdv.date}`);
    }
    else if (connexionData.idPersonnel !== null && connexionData.idPersonnel !== undefined && connexionData.typePersonnel === "Massothérapeute") {

      setAnnulerMsg(`Êtes-vous certain de vouloir annuler cette réservation? \n Réservation : ${rdv.reservation} \n Client : ${rdv.prenom} ${rdv.nom} \n Service: ${rdv.nomService} \n Date :  ${rdv.date}`);
    }
    setOpen(true);

    console.log("Open = ", open);
  }

  const openPageModifierReservation = (rdv) => {
    console.log("In OpenDialog")
    setReservationId(rdv.idRes);
    setShowData({
      reservation: rdv.reservation, idService: rdv.idService, idPersonnel: rdv.idPersonnel,
      idDuree: rdv.idDuree, dateRes: rdv.date, heureDebut: rdv.heureDebut, heureFin: rdv.heureFin, idClient: rdv.idClient
    });
    setShowModRes(true);
    console.log("OpenPageModifierReservation = ", open);
  }


  function handleModifierReservation (data, newData) {
  //  console.log("Modifier reservation");
    alert(`"old idDuree=${data.idDuree} new idDuree=${newData.idDuree} new heureDebut=${newData.heureDebut} new heureFin ${newData.heureFin}`);
   
  }


  const handleValidateAnnuler = (date, heureDebut) => {
    console.log("In handleValidateAnnuler - Reservation date: " + typeof (date) + "Reservation heureDebut: " + typeof (heureDebut));

    const resDateTime = new Date(`${date}T${heureDebut}:00`);
    const currentDateTime = new Date();

    console.log("In handleValidateAnnuler - Reservation time: ", typeof (resDateTime));
    console.log("In handleValidateAnnuler - Current time: ", typeof (currentDateTime));

    console.log(date);

    if ((resDateTime - currentDateTime) > 48 * 60 * 60 * 1000) {
      return false;
    } else {
      return true;
    }
  }
 
  const handleAnnuler = () => {
    console.log("In PageVosReservations - handleAnnuler: ", reservationIdConfirmDialog, " idPersonnel: " + connexionData.idPersonnel);
    axios.delete(strNomApplication + "/" + reservationIdConfirmDialog)
      .then((response) => {

        if (response.data.status === true) {
          //Check response.data because response.data.status and response.data.message may be undefined
          console.log("idPersonnel=" + connexionData.idPersonnel + " La réponse /api/rendezvous: " + JSON.stringify(response.data.status, response.data.message));
          getReservations();
          notify("Votre réservations a été annulée.", true);
          //  dispatch(setTabReservation(response.data.reservations));
        }
      })
      .catch(error => alert(error))
  }

  const notify = (msg, isReload) => {
    setNotifyMsg(msg);
    setOpenSnackBar(true);

    if (isReload) {
      // setInterval(() => {
      //   window.location.reload(false);
      // }, 2000);
    }
  }

  const handleClickRetour = () => {
    navigate("/");
  }



  return (
    <Container className={"m-5 mx-auto"}>
      {/* <Grid container>
      <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Paper className='whitesmoke p-20'> */}
      <Row className='justify-content-center'>
        <Col xs={4}>
          <h4 className=" justify-content-center mtop-20" id="titleMsg">Vos réservations</h4>

          <Reservation />
        </Col>
      </Row>
      {/* </Paper> */}
      <Row className='justify-content-center'>
        <Col>
          <Button className="mtop-40" onClick={handleClickRetour} variant="primary">Retour à l'accueil</Button>
        </Col>
      </Row>
      {/*       
      </Grid>
      </Grid> */}

      <ConfirmDialog
        title={annulerMsg}
        txtCancel="Non"
        txtConfirm="Oui"
        open={open}
        setOpen={setOpen}
        callbackData={handleAnnuler}
        reservationId={reservationIdConfirmDialog}
      />

      <PageModifierReservation
        data={showData}
        show={showModRes}
        setShow={setShowModRes}
        callbackFunc={handleModifierReservation}
      />

      <Snackbar sx={{ marginTop: 14, marginLeft: 19 }}
        open={openSnackBar}
        onClose={handleCloseSnack}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="success" sx={{ width: '100%' }}>
          {notifyMsg}
        </Alert>
      </Snackbar>
    </Container>
  )
}  
