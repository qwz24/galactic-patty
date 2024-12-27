import {
  Button,
  EmailInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import RedirectBlock from '../../components/redirect-block/redirect-block';
import style from './forgot-password.module.css';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { requestPasswordReset } from '../../services/api';
import useAuthCheck from '../../hooks/useAuthCheck';
import Loader from '../../components/loader/loader';
import { useForm } from '../../hooks/useForm';

const ForgotPasswordPage = () => {
  const { values, handleChange } = useForm();
  const { user, isUserLoaded } = useAuthCheck();

  const { state, pathname } = useLocation();
  const url = window.location.href;
  const isFormValid = values.email;

  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    await requestPasswordReset(values);

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
    <div className={style.passwordRecoveryContainer}>
      <div className={style.passwordRecoveryWrapper}>
        <form className={style.passwordRecoveryForm} onSubmit={handleSubmit}>
          <h1 className='text text_type_main-medium'>Восстановление пароля</h1>
          <EmailInput
            type={'email'}
            onChange={handleChange}
            value={values?.email || ''}
            name={'email'}
            placeholder='Укажите e-mail'
          />

          <Button htmlType='submit' disabled={!isFormValid}>
            Восстановить
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

export default ForgotPasswordPage;
