import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import projectsReducer from './projectsReducer';
import servicesReducer from './servicesReducer';
import { productsSlice } from './productsSlice';
import ToastMiddleware from '../middleware/ToastMiddleware';
import { authenticationSlice } from './authenticationSlice';
import { statisticsSlice } from './statisticsSlice';

export const store = configureStore({
  reducer: {
    authenticationSlice: authenticationSlice.reducer,
    productsSlice : productsSlice.reducer,
    projectsSlice : projectsReducer,
    servicesReducer : servicesReducer,
    statisticsReducer : statisticsSlice.reducer,
    
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)

});
