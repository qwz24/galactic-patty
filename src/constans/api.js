export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const fetchWithChecks = async url => {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }

    const json = await res.json();

    if (!json.success) {
      throw new Error('Failed to fetch data: success = false');
    }

    return json.data;
  } catch (e) {
    console.error(`Error fetching from ${url}:`, e.message);
    throw e;
  }
};
