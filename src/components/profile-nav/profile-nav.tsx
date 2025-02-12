import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import style from './profile-nav.module.css';
import { useAppDispatch } from '../../services/store';
import { logoutUser } from '../../services/authorizationSlice';

const descriptions: Record<string, string> = {
  '/profile': 'В этом разделе вы можете изменить свои персональные данные',
  '/profile/orders':
    'В этом разделе вы можете просмотреть свою историю заказов',
};

const ProfileNav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const description = descriptions[location.pathname] || '';

  const onClick = async () => {
    await dispatch(logoutUser());
    navigate('/login', { replace: true });
  };

  return (
    <nav className={style.navMenu}>
      <NavLink
        to='/profile'
        end
        style={({ isActive }) => ({
          color: isActive ? '#F2F2F3' : '#8585AD',
        })}
      >
        <p className='text text_type_main-medium'>Профиль</p>
      </NavLink>

      <NavLink
        to='/profile/orders'
        style={({ isActive }) => ({
          color: isActive ? '#F2F2F3' : '#8585AD',
        })}
      >
        <p className='text text_type_main-medium'>История заказов</p>
      </NavLink>

      <p
        className='text text_type_main-medium text_color_inactive'
        onClick={onClick}
      >
        Выход
      </p>

      {description && (
        <p className='text text_type_main-default text_color_inactive mt-20'>
          {description}
        </p>
      )}
    </nav>
  );
};

export default ProfileNav;
