import { BASE_URL } from '../constans/api';

const checkResponse = async (res: Response) => {
  if (!res.ok) {
    throw new Error(`Response status: ${res.status}`);
  }

  const json = await res.json();

  if (!json.success) {
    throw new Error('Failed to fetch data: success = false');
  }

  return json;
};

export async function request(endpoint: string, options: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${endpoint}`, options);
  return checkResponse(res);
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        // eslint-disable-next-line no-useless-escape
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)'
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

interface CookieProps {
  expires?: number | Date | string;
  [key: string]: string | number | boolean | undefined | Date;
}

export function setCookie(
  name: string,
  value: string | null,
  props: CookieProps = {}
) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && (exp as Date).toUTCString) {
    props.expires = (exp as Date).toUTCString();
  }
  if (value) {
    value = encodeURIComponent(value);
  }

  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;

    const propValue = props[propName];

    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}
