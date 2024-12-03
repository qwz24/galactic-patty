import { BASE_URL } from '../constans/api';

const checkResponse = async res => {
  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error('Failed to fetch data: success = false');
  }

  return json;
};

export async function request(endpoint, options = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  return checkResponse(res);
}
