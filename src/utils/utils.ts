import { BASE_URL } from '../constans/api';
import { Order } from '../types';

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

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const now = new Date();

  const options: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
  };

  const formattedTime = new Intl.DateTimeFormat('ru-RU', options).format(date);

  const diffMs = now.setHours(0, 0, 0, 0) - date.setHours(0, 0, 0, 0);
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return `Сегодня, ${formattedTime}`;
  if (diffDays === 1) return `Вчера, ${formattedTime}`;
  return `${diffDays} ${getDayWord(diffDays)} назад, ${formattedTime}`;
}

function getDayWord(days: number): string {
  if (days % 10 === 1 && days % 100 !== 11) return 'день';
  if ([2, 3, 4].includes(days % 10) && ![12, 13, 14].includes(days % 100))
    return 'дня';
  return 'дней';
}

// Функция для разбиения массива на группы по 10 элементов
export const chunkArray = (arr: Order[], size: number) =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, index) =>
    arr.slice(index * size, index * size + size)
  );
