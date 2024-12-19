import { useEffect, useRef, useState } from 'react';
import AppHeader from '../../components/app-header/app-header';
import style from './profile-settings.module.css';
import {
  Button,
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser, updateUserData } from '../../services/authorizationSlice';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user } = useSelector(state => state.authorization);
  const [modificationForm, setModificationForm] = useState(false);
  const initialForm = {
    name: user?.name,
    email: user?.email,
    password: '',
  };
  const [form, setForm] = useState(initialForm);
  const prevFormRef = useRef(form);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const isFormModified =
      JSON.stringify(prevFormRef.current) !== JSON.stringify(form);

    setModificationForm(isFormModified);

    prevFormRef.current = form;
  }, [form]);

  const handleChange = e => {
    const { name, value } = e.target;

    setForm(prevForm => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setForm(form);
    dispatch(updateUserData(form));
    setModificationForm(false);
  };

  const onClick = async () => {
    await dispatch(logoutUser());
    navigate('/login', { replace: true });
  };

  const resetForm = () => {
    setForm(initialForm);
    prevFormRef.current = initialForm;
    setModificationForm(false);
  };

  return (
    <>
      <AppHeader />

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
              <Input
                autoComplete='name'
                placeholder='Имя'
                onChange={handleChange}
                value={form?.name}
                name='name'
                icon='EditIcon'
                size='default'
              />

              <EmailInput
                onChange={handleChange}
                value={form?.email}
                type='email'
                name='email'
                icon='EditIcon'
              />

              <Input
                autoComplete='off'
                onChange={handleChange}
                value={form?.password}
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
    </>
  );
};

export default ProfilePage;
