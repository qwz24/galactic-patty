import { useState } from 'react';
import AppHeader from '../../components/app-header/app-header';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './register.module.css';
import RedirectBlock from '../../components/redirect-block/redirect-block';

import { useDispatch } from 'react-redux';
import { registerUser } from './../../services/authorizationSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuthCheck from '../../hooks/useAuthCheck';
import Loader from '../../components/loader/loader';

const RegisterPage = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { user, isUserLoaded } = useAuthCheck();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const resultAction = dispatch(registerUser(form));
    if (registerUser.fulfilled.match(resultAction)) {
      navigate('/');
    }
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

      <div className={style.registerContainer}>
        <div className={style.registerWrapper}>
          <form
            autoComplete='off'
            className={style.formContainer}
            onSubmit={handleSubmit}
          >
            <h1 className='text text_type_main-medium'>Регистрация</h1>
            <Input
              placeholder={'Имя'}
              onChange={handleChange}
              value={form.name}
              name={'name'}
              error={false}
              errorText={'Ошибка'}
              size={'default'}
            />

            <EmailInput
              type={'email'}
              onChange={handleChange}
              value={form.email}
              name={'email'}
            />

            <PasswordInput
              onChange={handleChange}
              value={form.password}
              name={'password'}
              extraClass='mb-2'
            />

            <Button htmlType='submit'>Зарегистрироваться</Button>
          </form>

          <div className='mt-20'>
            <RedirectBlock
              text='Уже зарегистрированы?'
              buttonLabel='Войти'
              pathname={'/login'}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;