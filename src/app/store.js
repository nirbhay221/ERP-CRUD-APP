import { configureStore } from '@reduxjs/toolkit';
import projectsReducer from './projectsReducer';
import servicesReducer from './servicesReducer';
import { productsSlice } from './productsSlice';

export const store = configureStore({
  reducer: {
    productsSlice : productsSlice.reducer,
    projectsReducer : projectsReducer,
    servicesReducer : servicesReducer,

  },
});
