import { FC, FormEvent, useEffect } from 'react';
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
import { useForm } from '../../hooks/useForm';
import { RootState } from '../../services/store';

const ResetPasswordPage: FC = () => {
  const { user } = useSelector((state: RootState) => state.authorization);
  const { values, setValues, handleChange } = useForm<{
    token: string;
    password: string;
  }>({
    token: '',
    password: '',
  });

  const navigate = useNavigate();
  const location = useLocation();
  const isFormValid = values.token && values.password;

  useEffect(() => {
    if (
      !Array.isArray(location.state) ||
      !location.state.some(route => route.path === '/forgot-password')
    ) {
      navigate('/forgot-password');
    }
  }, [location.state, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updatePassword(values);
    setValues({
      token: '',
      password: '',
    });
    navigate('/login');
  };

  if (user) {
    return <Navigate to='/' replace />;
  }

  return (
    <div className={style.resetPasswordContainer}>
      <div className={style.resetPasswordWrapper}>
        <form className={style.resetPasswordForm} onSubmit={handleSubmit}>
          <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
          <PasswordInput
            autoComplete='new-password'
            onChange={handleChange}
            value={values?.password || ''}
            name={'password'}
            placeholder='Введите новый пароль'
          />
          {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
          <Input
            autoComplete='one-time-code'
            placeholder={'Введите код из письма'}
            onChange={handleChange}
            value={values?.token || ''}
            name={'token'}
          />

          <Button htmlType='submit' disabled={!isFormValid}>
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
  );
};

export default ResetPasswordPage;
