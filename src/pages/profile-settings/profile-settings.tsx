import { FC, FormEvent, useEffect, useRef, useState } from 'react';
import style from './profile-settings.module.css';
import {
  Button,
  EmailInput,
  Input,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { updateUserData } from '../../services/authorizationSlice';
import { useForm } from '../../hooks/useForm';
import { useAppDispatch, useAppSelector } from '../../services/store';
import ProfileNav from '../../components/profile-nav/profile-nav';

const ProfilePage: FC = () => {
  const { user } = useAppSelector(state => state.authorization);

  const initialForm = {
    name: user?.name ?? '',
    email: user?.email ?? '',
    password: '',
  };
  const { values, handleChange, setValues } = useForm(initialForm);

  const [modificationForm, setModificationForm] = useState<boolean>(false);

  const prevFormRef = useRef(values);

  const dispatch = useAppDispatch();

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

  const resetForm = () => {
    setValues(initialForm);
    prevFormRef.current = initialForm;
    setModificationForm(false);
  };

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <ProfileNav />

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
