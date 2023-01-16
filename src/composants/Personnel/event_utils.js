let eventGuid = 0
let todayStr = new Date().toISOString().replace(/T.*$/, '') // YYYY-MM-DD of today

// route pour demander reservation du personnel : sous catégoriser si secrétaire accès à tous les agendas sinon accès qu'au sien

/*export const dataConstraint = {
  startTime: '223-01-14T10:00',
  endTime: '2023-01-T15:00',
}*/

export const disponibilites = [{
  daysOfWeek: [2, 3, 4],
  startTime: '08:00',
  endTime: '17:00'
}, {
  daysOfWeek: [1],
  startTime: '08:00',
  endTime: '16:00'
},
/*{
  daysOfWeek: [1],
  startTime: '13:00',
  endTime: '15:00'
}*/]

const dataFromBD = [
  {
    id: 1,
    date: "2023-01-14",
    heureDebut: "12:00",
    heureFin: "12:30",
    etat: 1,
    nomService: "Massage sensationnel",
    idClient: 12,
  },

  {
    id: 2,
    date: "2023-01-16",
    heureDebut: "12:00",
    heureFin: "12:30",
    etat: 1,
    nomService: "Massage chinois",
    idClient: 12,
  },

  {
    id: 3,
    date: "2023-01-31",
    heureDebut: "09:30",
    heureFin: "10:30",
    etat: 1,
    nomService: "Massage matinal",
    idClient: 13,
  },

  {
    id: 4,
    date: "2023-01-16",
    heureDebut: "09:30",
    heureFin: "10:30",
    etat: 1,
    idClient: null
  }
]

/*export*/ const INITIAL_EVENTSS = dataFromBD.map((reservation) => {

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


})

const INITIAL_EVENTS = [{"id":2,"title":"Massage douceur","start":"2023-01-16T08:00","end":"2023-01-16T08:30"},{"id":5,"title":"Massage standard","start":"2023-01-16T15:00","end":"2023-01-16T16:00"}]

console.log("initial events: " + JSON.stringify(INITIAL_EVENTS));

/*export const INITIAL_EVENTS_Final = [
  ...INITIAL_EVENTS,
  {
    groupId: 'indisponibilites',
    start: "2023-01-16T10:00",
    end: "2023-01-16T12:00",
    /*start: "2023-01-16T10:00",
    end: "2023-01-18T11:00",*/
/*overlap: false,
display: 'background',
color: '#ff9f89',
editable: false,


}
]*/

//console.log("initial events Final: " + JSON.stringify(INITIAL_EVENTS_Final))

/*[
  {
    id: createEventId(),
    date: '2023-01-12',
    title: 'All-day event',
    start: '2023-01-12'
  },
  {
    id: createEventId(),
    title: 'Timed event',
    start: todayStr + 'T12:10:00'
  }
]*/

export function createEventId() {
  return String(eventGuid++)
}