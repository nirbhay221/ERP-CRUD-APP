import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import projectsReducer from './projectsReducer';
import servicesReducer from './servicesReducer';
import { productsSlice } from './productsSlice';
import ToastMiddleware from '../middleware/ToastMiddleware';
import { authenticationSlice } from './authenticationSlice';

export const store = configureStore({
  reducer: {
    authenticationSlice: authenticationSlice,
    productsSlice : productsSlice.reducer,
    projectsReducer : projectsReducer,
    servicesReducer : servicesReducer,
    
  },
  middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(ToastMiddleware)

});
