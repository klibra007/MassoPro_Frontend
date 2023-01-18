import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'
import timeGridPlugin from '@fullcalendar/timegrid';
import { INITIAL_EVENTS, createEventId, dataConstraint } from './event_utils'
import { formatDate } from '@fullcalendar/core';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FullScreenDialog from '../Admin/FullScreenDialog';
import PageModifierReservation from '../CommonFiles/PageModifierReservation';
import { set } from 'date-fns';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { selectConnexionData } from '../../app/features/connexionSlice';
import ConfirmDialog from '../Admin/ConfirmDialog';

export default function Agenda({ rendezVous, initialData, objReservationPersonnel, massoChoisi, serviceChoisi, clientChoisi, dureeChoisiePersonnel, getReservationMasso, disponibilites }) {

    //alert("objReservation personnel " + JSON.stringify(objReservationPersonnel) )
    //console.log("DATA DISPO: "+ dataDisponibilites);

    let strDossierServeur = "https://dev.pascalrocher.com";

    const [weekendsVisible, setWeekendsVisible] = useState(true);

    const [currentEvents, setCurrentEvents] = useState(initialData);

    const [selectedEvent, setSelectedEvent] = useState({});

    const [show, setShow] = useState(false);

    const [show2, setShow2] = useState(true);

    const [objReservationFinal, setObjReservationFinal] = useState({});

    const [openReservationPersonnel, setOpenReservationPersonnel] = useState(false);

    const [openWithSelect, setOpenWithSelect] = useState(false);

    const connexionData = useSelector(selectConnexionData);

    const [annulerMsg, setAnnulerMsg] = useState();

    const [open, setOpen] = useState(false);

    const [reservationIdConfirmDialog, setReservationIdConfirmDialog] = useState();

    const [notifyMsg, setNotifyMsg] = useState('');

    const [openSnackBar, setOpenSnackBar] = useState(false);




    /*const initialEvents = () => rendezVous.map((reservation) => {

        if (reservation.idClient !== null) {
            return {
                id: reservation.id,
                title: reservation.nomService,
                //groupeId: reservation.idClient === null ? "indisponibilite" : "horaireNormal",
                start: reservation.date + `T${reservation.heureDebut}`,
                end: reservation.date + `T${reservation.heureFin}`,
                //constraint: reservation.idClient === null ? "indisponibilite" : 'businessHours',
                //display: 'background',
                //backgroundColor: 'blue'
                //textColor: 'red'
            }
        }

        else {
            return {
                id: reservation.id,
                groupId: 'indisponibilites',
                title: "indisponible",
                //groupeId: reservation.idClient === null ? "indisponibilite" : "horaireNormal",
                start: reservation.date + `T${reservation.heureDebut}`,
                end: reservation.date + `T${reservation.heureFin}`,
                //constraint: reservation.idClient === null ? "indisponibilite" : 'businessHours',
                //display: 'background',
                //backgroundColor: 'blue'
                //textColor: 'red'
                overlap: false,
                display: 'background',
                color: '#ff9f89',
                textColor: 'black',
                //editable: false
            }
        }
    })*/

    //const [initialData, setInitialData] = useState([]);


    useEffect(() => {
        console.log('recharge');
        //verif();
        //setInitialData(initialEvents());
    }, [initialData]);


    console.log("initial events: " + JSON.stringify(initialData));

    /*let today = new Date().toISOString();
    alert(today)*/

    const handleModifierReservation = (oldData, newData) => {
       
        let strNomApplication = strDossierServeur + `/api/rendezvous/${newData.idRendezVous}`;

        axios.put(strNomApplication, JSON.stringify(newData), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                //alert("La réponse: " + JSON.stringify(response));
                if (response.data.status === true) {
                    alert("Votre modification a bien été prise en compte!!");
                    getReservationMasso(objReservationPersonnel.idPersonnel);
                    //window.location.reload(false);
                    //setOpenActivationClient(false);
                    setShow(false);
                }
                else{
                    alert("Votre modification a échoué!!");
                }
            })
            .catch((error) => {
                console.log(error.response.data.status);
                //document.getElementById('idErreur').innerHTML = "Veuillez vérifier votre email/mot de passe svp!"
            });
    }

    const handleDateSelect = (selectInfo) => {
        //alert(JSON.stringify(selectInfo));
        let objReservationFinal = {
            ...objReservationPersonnel,
            date: selectInfo.startStr.replace(/T.*$/, ''),
            heureDebut: selectInfo.startStr.substring(11).substring(0, 5),
            heureFin: selectInfo.endStr.substring(11).substring(0, 5),
            //myTest: selectInfo.start.toISOString().substring(11).substring(0,5)
        }
        //alert(JSON.stringify(objReservationFinal));
        if (objReservationFinal.idClient !== undefined && objReservationFinal.idService !== undefined && objReservationFinal.idPersonnel !== undefined && objReservationFinal.idDuree !== undefined) {
            setObjReservationFinal(objReservationFinal);
            setOpenReservationPersonnel(true);
            setShow2(true);
        }
        else {
            alert("Veuillez choisir tous les éléments de réservations (client, service, masso, durée)");
        }


        /*let title = prompt('Please enter a new title for your event')
        let calendarApi = selectInfo.view.calendar

        calendarApi.unselect() // clear date selection

        if (title) {
            calendarApi.addEvent({
                //id: createEventId(),
                title,
                start: selectInfo.startStr,
                end: selectInfo.endStr,
                allDay: selectInfo.allDay
            })
        }*/

    }

    const handleEventClick = (clickInfo) => {
        console.log("EVENT DATA: " + JSON.stringify(clickInfo.event.extendedProps));
        //alert(clickInfo.event.title)
        if (clickInfo.event.title !== "indisponible") {
            /*if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
                clickInfo.event.remove()
            }*/
            setSelectedEvent(clickInfo.event.extendedProps);
            setShow(true);


        }
        else {
            alert("Masso indisponible à cette date");
        }

    }

    const handleEvents = (events) => {
        setCurrentEvents(events);

    }

    const renderEventContent = (eventInfo) => {
        return (
            <>
                <b>{eventInfo.timeText}</b><br />
                <i>{eventInfo.event.title}</i>
            </>
        )
    }

    const handleWeekendsToggle = () => {
        setWeekendsVisible(!weekendsVisible);

    }

    const renderSidebarEvent = (event) => {
        return (
            <li key={event.id}>
                <b>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
                <i>{event.title}</i>
            </li>
        )
    }

    const RenderSidebar = () => {
        return (
            <div className='demo-app-sidebar'>
                <div className='demo-app-sidebar-section'>
                    <h2>Instructions</h2>
                    <ul>
                        <li>Select dates and you will be prompted to create a new event</li>
                        <li>Drag, drop, and resize events</li>
                        <li>Click an event to delete it</li>
                    </ul>
                </div>
                <div className='demo-app-sidebar-section'>
                    <label>
                        <input
                            type='checkbox'
                            checked={weekendsVisible}
                            onChange={handleWeekendsToggle}
                        ></input>
                        toggle weekends
                    </label>
                </div>
                <div className='demo-app-sidebar-section'>
                    <h2>All Events ({currentEvents.length})</h2>
                    <ul>
                        {currentEvents.map(renderSidebarEvent)}
                    </ul>
                </div>
            </div>
        )
    }

    const verif = () => {
        //alert(INITIAL_EVENTS.length)
        if (initialData.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const openConfirmDialog = (rdv) => {
        //alert(JSON.stringify(rdv));
        console.log("In OpenDialog")
        setReservationIdConfirmDialog(rdv.id);
        //setReservationId(rdv.reservation);
        console.log("Type Personnel: ", connexionData.typePersonnel)
    
        if (connexionData.idPersonnel !== null && connexionData.idPersonnel !== undefined && connexionData.typePersonnel === "Secrétaire") {
    
          setAnnulerMsg(`Êtes-vous certain de vouloir annuler cette réservation? || \n 
          Réservation : ${rdv.reservation} || \n 
          Client : ${rdv.prenom}  ${rdv.nom} || \n 
          Service: ${rdv.nomService}  || \n 
          N° massothérapeute : ${rdv.idPersonnel} || \n 
          Date :  ${rdv.dateRes}`);
          //setOpen(true);
        }
        else if (connexionData.idPersonnel !== null && connexionData.idPersonnel !== undefined && connexionData.typePersonnel === "Massothérapeute") {
    
          setAnnulerMsg(`Êtes-vous certain de vouloir annuler cette réservation? || \n 
          Réservation : ${rdv.reservation} || \n
          n° Client : ${rdv.idClient} || \n 
          Service: ${rdv.nomService}  || \n 
          Date :  ${rdv.dateRes}`);
          //setOpen(true);
        }
        setOpen(true);
    
        console.log("Open = ", open);
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

      const handleAnnuler = () => {
        console.log("In PageVosReservations - handleAnnuler: ", reservationIdConfirmDialog, " idPersonnel: " + connexionData.idPersonnel);
        
        let strNomApplication = strDossierServeur + `/api/rendezvous/${reservationIdConfirmDialog}`;

        //alert(strNomApplication)

        axios.delete(strNomApplication)
          .then((response) => {
    
            if (response.data.status === true) {
              //Check response.data because response.data.status and response.data.message may be undefined
              console.log("idPersonnel=" + connexionData.idPersonnel + " La réponse /api/rendezvous: " + JSON.stringify(response.data.status, response.data.message));

              getReservationMasso(objReservationPersonnel.idPersonnel);
              notify("Votre réservations a été annulée.", true);
              setShow(false);
              //  dispatch(setTabReservation(response.data.reservations));
            }
          })
          .catch(error => alert(error))
      }

    return (
        <>
            {/*<RenderSidebar />*/}
            {<FullCalendar
                schedulerLicenseKey='CC-Attribution-NonCommercial-NoDerivatives'
                plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
                //initialView="resourceTimeGridDay"
                //themeSystem={"bootstrap5"}
                initialView="dayGridMonth"
                //weekends={true}
                /*events={[
                    { title: 'event 1', date: '2023-01-01' },
                    { title: 'event 2', date: '2023-01-10' }
                  ]}*/
                //eventContent = {renderEventContent}
                buttonText={{
                    prev: 'Précédent',
                    next: 'Suivant',
                    today: "Aujourd'hui",
                    year: 'Année',
                    month: 'Mois',
                    week: 'Semaine',
                    day: 'Jour',
                    list: 'Mon planning',
                }}
                allDayText={'Journée'}
                headerToolbar={{
                    left: 'prev,next today',
                    center: 'title',
                    right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
                }}
                locale={'fr'}
                buttonIcons={true}
                navLinks={true}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                weekends={weekendsVisible}
                //initialEvents={currentEvents}  // alternatively, use the `events` setting to fetch from a feed
                events={initialData} // react pète un cable si pas controlé par un état
                select={handleDateSelect}
                eventContent={renderEventContent} // custom render function
                eventClick={handleEventClick}
                eventsSet={handleEvents} // called after events are initialized/added/changed/removed
                //eventMinHeight={75}
                //expandRows={true}
                //eventMinHeight={25}
                //eventShortHeight={25}
                aspectRatio={2}
                //stickyHeaderDates={true}
                //slotEventOverlap={true}
                //slotMinWidth={150}
                //eventConstraint={dataConstraint}
                businessHours={disponibilites}
                selectConstraint={'businessHours'} //limite la sélection à la période définie dans businessHours
                selectOverlap={false} // empêche la sélection d'une zone contenant un event même si contenu dans businessHour. Possible de passer une fonction
                //selectAllow={}
                //eventTextColor={'black'}
                eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    //second: '2-digit',
                    hour12: false
                }}
                duration={'00:00:00'}
                snapDuration={'00:30:00'}
            />}

            <FullScreenDialog objReservationFinal={objReservationFinal} massoChoisi={massoChoisi} serviceChoisi={serviceChoisi} clientChoisi={clientChoisi} dureeChoisiePersonnel={dureeChoisiePersonnel} show={show2} setShow={setShow2} openReservationPersonnel={openReservationPersonnel} setOpenReservationPersonnel={setOpenReservationPersonnel} openWithSelect={openWithSelect} setOpenWithSelect={setOpenWithSelect} getReservationMasso={getReservationMasso}  setOpen={setOpen}  />

            <ConfirmDialog
               title={annulerMsg}
               txtCancel="Non"
               txtConfirm="Oui"
               open={open}
               setOpen={setOpen}
               callbackData={handleAnnuler}
               reservationId={reservationIdConfirmDialog}
            />

            {<PageModifierReservation data={selectedEvent} show={show} setShow={setShow} callbackFunc={handleModifierReservation} idPersonnel={connexionData.idPersonnel} openConfirmDialog ={openConfirmDialog} />}
        </>

    )
}


/*
https://cdn.jsdelivr.net/npm/fullcalendar@5.10.1/locales-all.js
Translate button in french
var l29 = {
    code: 'fr',
    buttonText: {
      prev: 'Précédent',
      next: 'Suivant',
      today: "Aujourd'hui",
      year: 'Année',
      month: 'Mois',
      week: 'Semaine',
      day: 'Jour',
      list: 'Mon planning',
    },
    weekText: 'Sem.',
    allDayText: 'Toute la journée',
    moreLinkText: 'en plus',
    noEventsText: 'Aucun événement à afficher',
  };
*/