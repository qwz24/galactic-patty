import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, request } from '../utils/utils';

import { fetchWithAuth } from '../api/fetchWithAuth';

const initialState = {
  login: {
    status: 'idle',
    data: null,
    error: null,
  },
  registration: {
    status: 'idle',
    data: null,
    error: null,
  },
  userFetch: {
    status: 'idle',
    data: null,
    error: null,
  },
  profileUpdate: {
    status: 'idle',
    data: null,
    error: null,
  },
  user: null,
};

const authorizationSlice = createSlice({
  name: 'authorization',
  initialState,
  reducers: {},
  extraReducers: bulder => {
    bulder
      .addCase(registerUser.pending, state => {
        state.registration.status = 'loading';
        state.registration.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.registration.status = 'succeeded';
        state.user = action.payload.user;

        document.cookie = `accessToken=${action.payload.accessToken}`;
        document.cookie = `refreshToken=${action.payload.refreshToken}`;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registration.status = 'failed';
        state.registration.error =
          action.error.message || 'Error registering profile';
      })

      .addCase(loginUser.pending, state => {
        state.login.status = 'loading';
        state.login.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.login.status = 'succeeded';
        state.user = action.payload.user;

        document.cookie = `accessToken=${action.payload.accessToken}`;
        document.cookie = `refreshToken=${action.payload.refreshToken}`;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.login.error = action.error.message || 'Authorization error';
      })

      .addCase(logoutUser.pending, (state, action) => {})
      .addCase(logoutUser.fulfilled, state => {
        state.user = null;

        deleteCookie('accessToken');
        deleteCookie('refreshToken');
      })
      .addCase(logoutUser.rejected, (state, action) => {})

      .addCase(fetchUserProfile.pending, state => {
        state.userFetch.status = 'loading';
        state.userFetch.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.userFetch.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.userFetch.status = 'failed';
        state.userFetch.error = action.error.code || 'Error received user data';
      })

      .addCase(updateUserData.pending, state => {
        state.profileUpdate.status = 'loading';
        state.profileUpdate.error = null;
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.profileUpdate.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.userFetch.status = 'failed';
        state.profileUpdate.error =
          action.error.message || 'Error updating user data';
      });
  },
});

export const loginUser = createAsyncThunk(
  'authorization/loginUser',
  async authorizationData => {
    const res = await request('/api/auth/login', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authorizationData),
    });
    return res;
  }
);

export const registerUser = createAsyncThunk(
  'authorization/registerUser',
  async userData => {
    const res = await request('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    return res;
  }
);

export const logoutUser = createAsyncThunk(
  'authorization/logoutUser',
  async () => {
    const res = await request('/api/auth/logout', {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: getCookie('refreshToken') }),
    });
    return res;
  }
);

export const fetchUserProfile = createAsyncThunk(
  'authorization/fetchUserProfile',
  async () => {
    const response = await fetchWithAuth('/api/auth/user', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },

      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data;
  }
);

export const updateUserData = createAsyncThunk(
  'authorization/updateUserData',
  async updatedData => {
    const res = await request('/api/auth/user', {
      method: 'PATCH',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        Authorization: getCookie('accessToken'),
      },
      body: JSON.stringify(updatedData),
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });
    return res;
  }
);

export default authorizationSlice.reducer;
