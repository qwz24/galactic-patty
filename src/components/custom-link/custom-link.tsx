import { NavLink } from 'react-router-dom';
import style from './custom-link.module.css';
import { FC } from 'react';
import { TIconProps } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons/utils';

type Props = {
  to: string;
  icon: FC<TIconProps>;
  label?: string;
};

const CustomNavLink: FC<Props> = ({ to, icon: Icon, label }) => {
  return (
    <NavLink
      to={to}
      style={({ isActive }) => ({
        color: isActive ? '#F2F2F3' : '#8585AD',
      })}
      className={style.navLink}
    >
      {({ isActive }) => (
        <span className={style.navLinkContent}>
          <Icon className='mr-2' type={isActive ? 'primary' : 'secondary'} />
          <p className='text text_type_main-default'>{label}</p>
        </span>
      )}
    </NavLink>
  );
};

export default CustomNavLink;
