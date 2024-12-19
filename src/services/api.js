export const requestPasswordReset = async email => {
  await fetch('https://norma.nomoreparties.space/api/password-reset', {
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
  })
    .then(res => res.json())
    .then(data => console.log(data));
};

export const updatePassword = async updatedPassword => {
  await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
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
  })
    .then(res => res.json())
    .then(data => console.log(data));
};
