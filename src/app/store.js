import { configureStore } from '@reduxjs/toolkit';
import connexionReducer from './features/connexionSlice';
import reservationReducer from './features/reservationSlice';

export default configureStore({
    reducer: {
        connexion: connexionReducer,
        reservation: reservationReducer
    },
})