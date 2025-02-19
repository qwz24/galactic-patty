import { deleteCookie } from '../utils/utils';
import reducer, {
  fetchUserProfile,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
} from './authorizationSlice';

jest.mock('../utils/utils', () => ({
  deleteCookie: jest.fn(),
}));

describe('authorizationSlice reducer', () => {
  it('Должен вернуть начальное состояние при инициализации', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      ...initialState,
    });
  });

  it('Должен обработать registerUser.pending', () => {
    const action = { type: registerUser.pending.type };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      registration: {
        status: 'loading',
        data: null,
        error: null,
      },
    });
  });

  it('Должен сохранить данные пользователя и установить куки при успешной регистрации (registerUser.fulfilled)', () => {
    jest.spyOn(document, 'cookie', 'set');

    const mockUser = {
      success: true,
      user: {
        email: 'emai-test',
        name: 'name-test',
      },
      accessToken: 'accessToken-test',
      refreshToken: 'refreshToken-test',
    };

    const action = { type: registerUser.fulfilled.type, payload: mockUser };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      registration: {
        status: 'succeeded',
        data: null,
        error: null,
      },
      user: mockUser.user,
    });

    expect(document.cookie).toContain('accessToken=accessToken-test');
    expect(document.cookie).toContain('refreshToken=refreshToken-test');
  });

  it('Должен обработать registerUser.rejected', () => {
    const errorMessage = 'Error registering profile';

    const action = {
      type: registerUser.rejected.type,
      error: { message: errorMessage },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      registration: {
        status: 'failed',
        data: null,
        error: errorMessage,
      },
    });
  });

  it('Должен обработать loginUser.pending', () => {
    const action = { type: loginUser.pending.type };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      login: {
        status: 'loading',
        data: null,
        error: null,
      },
    });
  });

  it('Должен обработать loginUser.fulfilled', () => {
    jest.spyOn(document, 'cookie', 'set');
    const mockLoginUser = {
      success: true,
      user: {
        email: 'emai-test',
        name: 'name-test',
      },
      accessToken: 'accessToken-test',
      refreshToken: 'refreshToken-test',
    };

    const action = { type: loginUser.fulfilled.type, payload: mockLoginUser };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      login: {
        ...initialState.login,
        status: 'succeeded',
      },
      user: {
        email: 'emai-test',
        name: 'name-test',
      },
    });

    expect(document.cookie).toContain('accessToken=accessToken-test');
    expect(document.cookie).toContain('refreshToken=refreshToken-test');
  });

  it('Должен обработать loginUser.rejected', () => {
    const errorMessage = 'Error registering profile';

    const action = {
      type: loginUser.rejected.type,
      error: { message: errorMessage },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      login: {
        status: 'failed',
        data: null,
        error: errorMessage,
      },
    });
  });

  it('Должен обработать logoutUser.fulfilled', () => {
    const action = { type: logoutUser.fulfilled.type };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: null,
    });

    expect(deleteCookie).toHaveBeenCalledWith('accessToken');
    expect(deleteCookie).toHaveBeenCalledWith('refreshToken');
  });

  it('Должен обработать fetchUserProfile.pending', () => {
    const action = { type: fetchUserProfile.pending.type };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      userFetch: {
        data: null,
        status: 'loading',
        error: null,
      },
    });
  });

  it('Должен обработать fetchUserProfile.fulfilled', () => {
    const mockUser = {
      email: 'test@example.com',
      name: 'Test User',
    };

    const action = {
      type: fetchUserProfile.fulfilled.type,
      payload: { user: mockUser },
    };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      userFetch: {
        data: null,
        status: 'succeeded',
        error: null,
      },
      user: mockUser,
    });
  });

  it('Должен обработать fetchUserProfile.rejected', () => {
    const mockError = { code: '500', message: 'Internal Server Error' };
    const action = { type: fetchUserProfile.rejected.type, error: mockError };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      userFetch: {
        data: null,
        status: 'failed',
        error: '500',
      },
    });
  });

  it('Должен обработать fetchUserProfile.rejected без кода ошибки', () => {
    const action = { type: fetchUserProfile.rejected.type, error: {} };
    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      userFetch: {
        data: null,
        status: 'failed',
        error: 'Error received user data',
      },
    });
  });
});
