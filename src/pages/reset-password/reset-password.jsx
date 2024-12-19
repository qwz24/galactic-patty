import { useEffect, useState } from 'react';
import AppHeader from '../../components/app-header/app-header';
import {
  Button,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import RedirectBlock from '../../components/redirect-block/redirect-block';
import style from './reset-password.module.css';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { updatePassword } from '../../services/api';

const ResetPasswordPage = () => {
  const { user } = useSelector(state => state.authorization);
  const [form, setForm] = useState({
    password: '',
    token: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isFormValid = form.token && form.password;

  useEffect(() => {
    if (
      !Array.isArray(location.state) ||
      !location.state.some(route => route.path === '/forgot-password')
    ) {
      navigate('/forgot-password');
    }
  }, [location.state, navigate]);

  const handleChange = e => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    updatePassword(form);
    setForm({
      password: '',
      token: '',
    });
  };

  const onClick = () => {
    navigate('/login');
  };

  if (user) {
    return <Navigate to='/' replace />;
  }

  return (
    <>
      <AppHeader />

      <div className={style.resetPasswordContainer}>
        <div className={style.resetPasswordWrapper}>
          <form className={style.resetPasswordForm} onSubmit={handleSubmit}>
            <h1 className='text text_type_main-medium'>
              Восстановление пароля
            </h1>
            <PasswordInput
              onChange={handleChange}
              value={form.password}
              name={'password'}
              placeholder='Введите новый пароль'
            />

            <Input
              placeholder={'Введите код из письма'}
              onChange={handleChange}
              value={form.token}
              name={'token'}
            />

            <Button htmlType='submit' disabled={!isFormValid} onClick={onClick}>
              Сохранить
            </Button>
          </form>

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

export default ResetPasswordPage;
