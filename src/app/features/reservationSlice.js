import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    affichageChoixServices : true,
    affichageChoixDureeEtMasso: false,
    affichageReservation: false,
    objReservation : {
        date: null,
        idService: null,
        idPersonnel: null, 
        idDuree: null 
    }, 
    nomServiceChoisi: "",
    nomMassoChoisi: "",
    dureeChoisie: "",
}

export const reservationSlice = createSlice({
    name: 'reservation', 
    initialState,

    reducers: {
        setAffichageChoixServices : (state, action) => {
            console.log('in reducer setAffichageAccueil');
            state.affichageChoixServices === true ? state.affichageChoixServices = false : state.affichageChoixServices = true;
        }, 

        setAffichageChoixDureeEtMasso : (state, action) => {
            console.log('in reducer setAffichageConnexion');
            state.affichageChoixDureeEtMasso === false ? state.affichageChoixDureeEtMasso = true : state.affichageChoixDureeEtMasso = false;
        }, 

        setAffichageReservation : (state, action) => {
            console.log('in reducer setAffichageReservation');
            state.affichageReservation === false ? state.affichageReservation = true : state.affichageReservation = false;
        }, 

        setObjetReservationDate : (state, action) => {
            state.objReservation.date = action.payload;
        },

        setObjetReservationIdService : (state, action) => {
            state.objReservation.idService = action.payload;
        },

        setObjetReservationIdPersonnel : (state, action) => {
            state.objReservation.idPersonnel = action.payload;
        },

        setObjetReservationIdDuree : (state, action) => {
            state.objReservation.idDuree = action.payload;
        },

        setNomServiceChoisi : (state, action) => {
            state.nomServiceChoisi = action.payload;
        },

        setNomMassoChoisi : (state, action) => {
            state.nomMassoChoisi = action.payload;
        },

        setDureeChoisie : (state, action) => {
            state.dureeChoisie = action.payload;
        }
    }
})

export const { setAffichageChoixServices, setAffichageChoixDureeEtMasso, setObjetReservationDate, setObjetReservationIdService, setObjetReservationIdPersonnel, setObjetReservationIdDuree, setNomServiceChoisi, setNomMassoChoisi, setDureeChoisie, setAffichageReservation } = reservationSlice.actions;

export const selectAffichageChoixServices = (state) => state.reservation.affichageChoixServices;

export const selectAffichageChoixDureeEtMasso = (state) => state.reservation.affichageChoixDureeEtMasso;

export const selectAffichageReservation = (state) => state.reservation.affichageReservation;

export const selectObjReservation = (state) => state.reservation.objReservation;

export const selectNomServiceChoisi = (state) => state.reservation.nomServiceChoisi;

export const selectNomMassoChoisi = (state) => state.reservation.nomMassoChoisi;

export const selectDureeChoisie = (state) => state.reservation.dureeChoisie;

export default reservationSlice.reducer;