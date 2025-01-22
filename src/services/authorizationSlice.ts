import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie, getCookie, request } from '../utils/utils';

import { fetchWithAuth } from '../api/fetchWithAuth';

type TStatus = 'idle' | 'loading' | 'failed' | 'succeeded';

type TApiState<T> = {
  status: TStatus;
  data: T;
  error: null | string;
};

type TUser = {
  email: string;
  name: string;
};

type TState = {
  login: TApiState<null>;
  registration: TApiState<null>;
  userFetch: TApiState<null>;
  profileUpdate: TApiState<null>;
  user: null | TUser;
};

const initialState: TState = {
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
          action.error.message ?? 'Error registering profile';
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
        state.login.error = action.error.message ?? 'Authorization error';
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
        state.userFetch.error = action.error.code ?? 'Error received user data';
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
          action.error.message ?? 'Error updating user data';
      });
  },
});

export const loginUser = createAsyncThunk<
  {
    success: boolean;
    user: {
      email: string;
      name: string;
    };

    accessToken: string;
    refreshToken: string;
  },
  { email: string; password: string }
>('authorization/loginUser', async authorizationData => {
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
});

export const registerUser = createAsyncThunk<
  {
    success: boolean;
    user: {
      email: string;
      name: string;
    };

    accessToken: string;
    refreshToken: string;
  },
  {
    name: string;
    email: string;
    password: string;
  }
>('authorization/registerUser', async userData => {
  const res = await request('/api/auth/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return res;
});

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
    const res = await fetchWithAuth('/api/auth/user', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        ContentType: 'application/json',
      },

      redirect: 'follow',
      referrerPolicy: 'no-referrer',
    });

    return res;
  }
);

export const updateUserData = createAsyncThunk<
  {
    user: {
      email: string;
      name: string;
    };
  },
  {
    name: string;
    email: string;
  }
>('authorization/updateUserData', async updatedData => {
  const accessToken = getCookie('accessToken');
  const res = await request('/api/auth/user', {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',

    headers: {
      'Content-Type': 'application/json',
      ...(accessToken && { Authorization: accessToken }),
    },
    body: JSON.stringify(updatedData),
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  });
  return res;
});

export default authorizationSlice.reducer;
