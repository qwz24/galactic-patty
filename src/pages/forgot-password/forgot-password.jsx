import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../../components/app-header/app-header';
import RedirectBlock from '../../components/redirect-block/redirect-block';
import style from './forgot-password.module.css';
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../../services/api';
import useAuthCheck from '../../hooks/useAuthCheck';
import Loader from '../../components/loader/loader';

const ForgotPasswordPage = () => {
  const { user, isUserLoaded } = useAuthCheck();
  const [form, setForm] = useState({
    email: '',
  });

  const { state, pathname } = useLocation();
  const url = window.location.href;
  const isFormValid = form.email;

  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onClick = () => {
    requestPasswordReset(form);
    const currentState = Array.isArray(state) ? state : [];
    navigate('/reset-password', {
      state: [
        ...currentState,
        { path: pathname, url, title: 'forgot-password' },
      ],
      replace: true,
    });
  };

  if (user) {
    return <Navigate to='/' />;
  }

  if (!isUserLoaded) {
    return <Loader />;
  }

  return (
    <>
      <AppHeader />

      <div className={style.passwordRecoveryContainer}>
        <div className={style.passwordRecoveryWrapper}>
          <div className={style.passwordRecoveryForm}>
            <h1 className='text text_type_main-medium'>
              Восстановление пароля
            </h1>
            <EmailInput
              type={'email'}
              onChange={handleChange}
              value={form.email}
              name={'email'}
              placeholder='Укажите e-mail'
            />

            <Button htmlType='submit' disabled={!isFormValid} onClick={onClick}>
              Восстановить
            </Button>
          </div>

          <div className='mt-20'>
            <RedirectBlock
              text='Вспомнили пароль?'
              buttonLabel='Войти'
              pathname={'/login'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPasswordPage;
