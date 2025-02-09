import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order } from '../types';

type OrdersFeedState = {
  orders: Order[];
  total: number;
  totalToday: number;
  connected: boolean;
  error: Event | null;
};

const initialState: OrdersFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  connected: false,
  error: null,
};

const ordersFeedSlice = createSlice({
  name: 'ordersFeed',
  initialState,
  reducers: {
    connect: (state, _action: PayloadAction<string>) => {
      state.connected = true;
      state.error = null;
    },
    disconnect: state => {
      state.connected = false;
    },
    onConnected: state => {
      state.connected = true;
    },
    onDisconnected: state => {
      state.connected = false;
    },
    onMessageReceived: (
      state,
      action: PayloadAction<{
        orders: Order[];
        total: number;
        totalToday: number;
      }>
    ) => {
      state.orders = action.payload.orders;
      state.total = action.payload.total;
      state.totalToday = action.payload.totalToday;
    },
    onError: (state, action: PayloadAction<Event>) => {
      state.error = action.payload;
    },
  },
});

export const {
  connect,
  disconnect,
  onConnected,
  onDisconnected,
  onMessageReceived,
  onError,
} = ordersFeedSlice.actions;

export const ordersFeedActions = ordersFeedSlice.actions;

export default ordersFeedSlice.reducer;
