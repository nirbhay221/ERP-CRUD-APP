import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './productsReducer';
import projectsReducer from './projectsReducer';
import servicesReducer from './servicesReducer';

export const store = configureStore({
  reducer: {
    productsReducer : productsReducer,
    projectsReducer : projectsReducer,
    servicesReducer : servicesReducer,

  },
});
