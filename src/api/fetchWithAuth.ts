import { BASE_URL } from '../constans/api';
import { getCookie } from '../utils/utils';
import { updateAccessToken } from './auth';

const defaultOptions: RequestInit = {
  cache: 'no-cache',
  credentials: 'same-origin',
  headers: {
    ContentType: 'application/json',
  },
  method: 'GET',
  mode: 'cors',
  redirect: 'follow',
  referrerPolicy: 'no-referrer',
};

export const fetchWithAuth = async (
  endpoint: string,
  option: RequestInit = defaultOptions
) => {
  try {
    const accessToken = getCookie('accessToken');

    option.headers = {
      ...option.headers,
      ...(accessToken ? { Authorization: accessToken } : {}),
    };

    let response = await fetch(`${BASE_URL}${endpoint}`, option);

    if (response.status === 403) {
      await updateAccessToken();

      const newAccessToken = getCookie('accessToken');

      const updatedHeaders = {
        ...option.headers,
        ...(newAccessToken ? { Authorization: newAccessToken } : {}),
      };

      option.headers = updatedHeaders;

      response = await fetch(`${BASE_URL}${endpoint}`, option);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in fetchWithAuth:', error);
    throw error;
  }
};
