import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../../components/app-header/app-header';
import style from './login.module.css';
import { useState } from 'react';
import RedirectBlock from '../../components/redirect-block/redirect-block';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../services/authorizationSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuthCheck from '../../hooks/useAuthCheck';
import Loader from '../../components/loader/loader';

const LoginPage = () => {
  const { user, isUserLoaded } = useAuthCheck();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const isFormValid = form.email && form.password;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath =
    new URLSearchParams(location.search).get('redirect') || '/';

  const handleChange = e => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const resultAction = await dispatch(loginUser(form));

    if (loginUser.fulfilled.match(resultAction)) {
      navigate(redirectPath);
    }
  };

  if (user) {
    return <Navigate to={'/'} />;
  }

  if (!isUserLoaded) {
    return <Loader />;
  }
  return (
    <>
      <AppHeader />

      <div className={style.authContainer}>
        <div className={style.authWrapper}>
          <form className={style.authForm} onSubmit={handleSubmit}>
            <h1 className='text text_type_main-medium'>Вход</h1>
            <EmailInput
              autoComplete='email'
              type={'email'}
              name={'email'}
              onChange={handleChange}
              value={form.email}
            />

            <PasswordInput
              autoComplete='current-password'
              onChange={handleChange}
              value={form.password}
              type={'password'}
              name={'password'}
              extraClass='mb-2'
            />

            <Button htmlType='submit' disabled={!isFormValid}>
              Войти
            </Button>
          </form>

          <div className='mt-20'>
            <RedirectBlock
              text='Вы — новый пользователь?'
              buttonLabel='Зарегистрироваться'
              pathname={'/register'}
            />
            <RedirectBlock
              text='Забыли пароль?'
              buttonLabel='Восстановить пароль'
              pathname={'/forgot-password'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
