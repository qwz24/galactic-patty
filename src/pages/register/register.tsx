import { FormEvent } from 'react';
import {
  Button,
  EmailInput,
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './register.module.css';
import RedirectBlock from '../../components/redirect-block/redirect-block';

import { useDispatch } from 'react-redux';
import { registerUser } from '../../services/authorizationSlice';
import { Navigate, useNavigate } from 'react-router-dom';
import useAuthCheck from '../../hooks/useAuthCheck';
import Loader from '../../components/loader/loader';
import { useForm } from '../../hooks/useForm';
import { AppDispatch } from '../../services/store';

const RegisterPage = () => {
  const { values, handleChange } = useForm<{
    name: string;
    email: string;
    password: string;
  }>({ name: '', email: '', password: '' });

  const { user, isUserLoaded } = useAuthCheck();

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resultAction = dispatch(registerUser(values));
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
    <div className={style.registerContainer}>
      <div className={style.registerWrapper}>
        <form
          autoComplete='off'
          className={style.formContainer}
          onSubmit={handleSubmit}
        >
          <h1 className='text text_type_main-medium'>Регистрация</h1>

          {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
          <Input
            placeholder={'Имя'}
            onChange={handleChange}
            value={values?.name || ''}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
          />

          <EmailInput
            onChange={handleChange}
            value={values?.email || ''}
            name={'email'}
            autoComplete='username'
          />

          <PasswordInput
            onChange={handleChange}
            value={values?.password || ''}
            name={'password'}
            extraClass='mb-2'
            autoComplete='new-password'
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
  );
};

export default RegisterPage;
