import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import authorizationReduser from './authorizationSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    authorization: authorizationReduser,
    modal: modalReducer,
  },
});
