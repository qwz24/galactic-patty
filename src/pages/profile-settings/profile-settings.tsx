import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import style from './profile-settings.module.css';
import {
  Button,
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateUserData } from '../../services/authorizationSlice';
import { useNavigate } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import { AppDispatch, RootState } from '../../services/store';

const ProfilePage: FC = () => {
  const { user } = useSelector((state: RootState) => state.authorization);

  const initialForm = {
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  };
  const { values, handleChange, setValues } = useForm(initialForm);

  const [modificationForm, setModificationForm] = useState<boolean>(false);

  const prevFormRef = useRef(values);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    const isFormModified =
      JSON.stringify(prevFormRef.current) !== JSON.stringify(values);

    setModificationForm(isFormModified);

    prevFormRef.current = values;
  }, [values]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setValues(values);
    dispatch(updateUserData(values));
    setModificationForm(false);
  };

  const onClick = async () => {
    await dispatch(logoutUser());
    navigate('/login', { replace: true });
  };

  const resetForm = () => {
    setValues(initialForm);
    prevFormRef.current = initialForm;
    setModificationForm(false);
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <nav className={style.navMenu}>
          <p className={`text text_type_main-medium ${style.activeLink}`}>
            Профиль
          </p>
          <p className='text text_type_main-medium text_color_inactive'>
            История заказов
          </p>
          <p
            onClick={onClick}
            className='text text_type_main-medium text_color_inactive'
          >
            Выход
          </p>

          <p className='text text_type_main-default text_color_inactive mt-20'>
            В этом разделе вы можете изменить свои персональные данные
          </p>
        </nav>

        <section className={style.formSection}>
          <form className={style.form} onSubmit={handleSubmit}>
            {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
            <Input
              autoComplete='name'
              placeholder='Имя'
              onChange={handleChange}
              value={values?.name}
              name='name'
              icon='EditIcon'
              size='default'
            />

            <EmailInput
              onChange={handleChange}
              value={values?.email}
              name='email'
            />
            {/* @ts-expect-error: onPointerEnterCapture, onPointerLeaveCapture warnings otherwise */}
            <Input
              autoComplete='off'
              onChange={handleChange}
              value={values?.password}
              name='password'
              icon='EditIcon'
              placeholder='Пароль'
            />
            {modificationForm && (
              <div className={style.buttonWrapper}>
                <Button
                  htmlType='button'
                  type='secondary'
                  size='large'
                  onClick={resetForm}
                >
                  Отменить
                </Button>
                <Button htmlType='submit'>Сохранить</Button>
              </div>
            )}
          </form>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
