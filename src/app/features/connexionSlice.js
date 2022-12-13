import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    affichageChoixServices : true,
    affichageChoixDureeEtMasso: false,
    connexionData: localStorage.getItem('connexionData') !==null ? JSON.parse(localStorage.getItem('connexionData')) : {},

}

export const connexionSlice = createSlice({
    name: 'connexion', 
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

        setConnexionData : (state, action) => {
            state.connexionData = action.payload;
        }
    }
})

export const { setAffichageChoixServices, setConnexionData, setAffichageChoixDureeEtMasso } = connexionSlice.actions;

export const selectAffichageChoixServices = (state) => state.connexion.affichageChoixServices;

export const selectAffichageChoixDureeEtMasso = (state) => state.connexion.affichageChoixDureeEtMasso;

export const selectConnexionData = (state) => state.connexion.connexionData;

export default connexionSlice.reducer;