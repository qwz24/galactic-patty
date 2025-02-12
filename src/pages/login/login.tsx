import {
  Button,
  EmailInput,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './login.module.css';
import RedirectBlock from '../../components/redirect-block/redirect-block';
import { loginUser } from '../../services/authorizationSlice';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import useAuthCheck from '../../hooks/useAuthCheck';
import Loader from '../../components/loader/loader';
import { useForm } from '../../hooks/useForm';
import { FC, FormEvent } from 'react';
import { useAppDispatch } from '../../services/store';

const LoginPage: FC = () => {
  const { values, handleChange } = useForm({ email: '', password: '' });
  const { user, isUserLoaded } = useAuthCheck();

  const isFormValid = values.email && values.password;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath =
    new URLSearchParams(location.search).get('redirect') || '/';

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const resultAction = await dispatch(loginUser(values));

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
    <div className={style.authContainer}>
      <div className={style.authWrapper}>
        <form className={style.authForm} onSubmit={handleSubmit}>
          <h1 className='text text_type_main-medium'>Вход</h1>
          <EmailInput
            autoComplete='email'
            name={'email'}
            onChange={handleChange}
            value={values?.email || ''}
          />

          <PasswordInput
            autoComplete='current-password'
            onChange={handleChange}
            value={values?.password || ''}
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
  );
};

export default LoginPage;
