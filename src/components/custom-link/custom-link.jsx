import { NavLink } from 'react-router-dom';
import style from './custom-link.module.css';
import PropTypes from 'prop-types';

const CustomNavLink = ({ to, icon: Icon, label }) => {
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

CustomNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  icon: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
};
