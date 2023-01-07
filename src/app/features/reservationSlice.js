import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    affichageChoixServices : true,
    affichageChoixDureeEtMasso: false,
    affichageReservation: false,
    affichageConfirmation: false,
    affichageAvantConfirmation: true,
    objReservation : {
        date: null,
        idService: null,
        idPersonnel: null, 
        idDuree: null 
    }, 
    nomServiceChoisi: "",
    nomMassoChoisi: "",
    dureeChoisie: "",
    prix: "",
    dateChoisie: "",
    heureChoisie: {},
    tabReservation: [],
    refresh: false,
    
}

export const reservationSlice = createSlice({
    name: 'reservation', 
    initialState,

    reducers: {
        setAffichageChoixServices : (state, action) => {
            console.log('in reducer setAffichageAccueil');
            /*state.affichageChoixServices === true ? state.affichageChoixServices = false : state.affichageChoixServices = true;*/
            state.affichageChoixServices = action.payload;
        }, 

        setAffichageChoixDureeEtMasso : (state, action) => {
            console.log('in reducer setAffichageConnexion');
            /*state.affichageChoixDureeEtMasso === false ? state.affichageChoixDureeEtMasso = true : state.affichageChoixDureeEtMasso = false;*/
            state.affichageChoixDureeEtMasso = action.payload;
        }, 

        setAffichageReservation : (state, action) => {
            console.log('in reducer setAffichageReservation');
            /*state.affichageReservation === false ? state.affichageReservation = true : state.affichageReservation = false;*/
            state.affichageReservation = action.payload;
        }, 

        setAffichageConfirmation : (state, action) => {
            console.log('in reducer setAffichageReservation');
            state.affichageConfirmation === false ? state.affichageConfirmation = true : state.affichageConfirmation = false;
        },

        setAffichageAvantConfirmation : (state, action) => {
            console.log('in reducer setAffichageReservation');
            state.affichageAvantConfirmation === true ? state.affichageAvantConfirmation = false : state.affichageAvantConfirmation = true;
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
        },

        setDateChoisie : (state, action) => {
            state.dateChoisie = action.payload;
        },

        setHeureChoisie : (state, action) => {
            state.heureChoisie = action.payload;
        },

        setPrix : (state, action) => {
            state.prix = action.payload;
        },

        setTabReservation : (state, action) => {
            state.tabReservation = action.payload;
        },

        setRefresh : (state, action) => {
            state.refresh = action.payload;
        },
    }
})

export const { setAffichageChoixServices, setAffichageChoixDureeEtMasso, setObjetReservationDate, setObjetReservationIdService, setObjetReservationIdPersonnel, setObjetReservationIdDuree, setNomServiceChoisi, setNomMassoChoisi, setDureeChoisie, setAffichageReservation, setAffichageConfirmation, setDateChoisie, setHeureChoisie, setPrix, setAffichageAvantConfirmation, setTabReservation, setRefresh } = reservationSlice.actions;

export const selectAffichageChoixServices = (state) => state.reservation.affichageChoixServices;

export const selectAffichageChoixDureeEtMasso = (state) => state.reservation.affichageChoixDureeEtMasso;

export const selectAffichageReservation = (state) => state.reservation.affichageReservation;

export const selectAffichageConfirmation = (state) => state.reservation.affichageConfirmation;

export const selectAffichageAvantConfirmation = (state) => state.reservation.affichageAvantConfirmation;

export const selectObjReservation = (state) => state.reservation.objReservation;

export const selectNomServiceChoisi = (state) => state.reservation.nomServiceChoisi;

export const selectNomMassoChoisi = (state) => state.reservation.nomMassoChoisi;

export const selectDureeChoisie = (state) => state.reservation.dureeChoisie;

export const selectPrix = (state) => state.reservation.prix;

export const selectDateChoisie = (state) => state.reservation.dateChoisie;

export const selectHeureChoisie = (state) => state.reservation.heureChoisie;

export const selectTabReservation = (state) => state.reservation.tabReservation;

export const selectRefresh = (state) => state.reservation.refresh;

export default reservationSlice.reducer;