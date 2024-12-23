import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { productsSlice } from './productsSlice';
import ToastMiddleware from '../middleware/ToastMiddleware';
import { authenticationSlice } from './authenticationSlice';
import { statisticsSlice } from './statisticsSlice';
import { usersSlice } from './usersSlice';
import { projectsSlice } from './projectsSlice';
import { eventsSlice } from './eventsSlice';

export const store = configureStore({
  reducer: {
    authenticationSlice: authenticationSlice.reducer,
    productsSlice: productsSlice.reducer,
    projectsSlice: projectsSlice.reducer,
    statisticsReducer: statisticsSlice.reducer,
    usersSlice: usersSlice.reducer,
    eventsSlice: eventsSlice.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)
});