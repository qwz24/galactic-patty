import { BASE_URL } from '../constans/api';
import { getCookie, setCookie } from '../utils/utils';

export async function updateAccessToken() {
  const refreshToken = getCookie('refreshToken');

  if (!refreshToken) {
    throw new Error('Refresh token not found.');
  }

  const response = await fetch(`${BASE_URL}/api/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error('Failed to refresh token');
  }

  const data = await response.json();

  const newAccessToken = data.accessToken;

  setCookie('accessToken', newAccessToken);

  return newAccessToken;
}
