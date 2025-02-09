import { request } from '../utils/utils';

export const requestPasswordReset = async (email: { email: string }) => {
  const res = await request('/api/password-reset', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(email),
  });
  return res;
};

export const updatePassword = async (updatedPassword: {
  token: string;
  password: string;
}) => {
  const res = await request('/api/password-reset/reset', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(updatedPassword),
  });
  return res;
};

export const getOrderDetails = async (orderNumber: string) => {
  const res = await request(`/api/orders/${orderNumber}`, {
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
  return res;
};
