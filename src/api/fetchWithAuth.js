import { BASE_URL } from '../constans/api';
import { getCookie } from '../utils/utils';
import { updateAccessToken } from './auth';

export const fetchWithAuth = async (endpoint, option = {}) => {
  try {
    const accessToken = getCookie('accessToken');

    option.headers = {
      ...option.headers,
      Authorization: accessToken,
    };

    let response = await fetch(`${BASE_URL}${endpoint}`, option);

    if (response.status === 403) {
      await updateAccessToken();

      const newAccessToken = getCookie('accessToken');
      option.headers.Authorization = newAccessToken;

      response = await fetch(`${BASE_URL}${endpoint}`, option);
    }

    return response;
  } catch (error) {
    console.error('Error in fetchWithAuth:', error);
    throw error;
  }
};
