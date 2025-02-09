import { configureStore } from '@reduxjs/toolkit';
import ingredientsReducer from './ingredientsSlice';
import authorizationReduser from './authorizationSlice';
import modalReducer from './modalSlice';
import ordersFeedReducer, { ordersFeedActions } from './ordersFeedSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import createWebSocketMiddleware from './middleware/socketMiddleware';
import ordersHistoryReducer, {
  ordersHistoryActions,
} from './ordersHistorySlice';

const websocketMiddleware = createWebSocketMiddleware({
  actions: ordersFeedActions,
});

const wsOrdersHistory = createWebSocketMiddleware({
  actions: ordersHistoryActions,
});

export const store = configureStore({
  reducer: {
    ingredients: ingredientsReducer,
    authorization: authorizationReduser,
    modal: modalReducer,
    ordersFeed: ordersFeedReducer,
    ordersHistory: ordersHistoryReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(websocketMiddleware, wsOrdersHistory),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
