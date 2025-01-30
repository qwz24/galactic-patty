import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './app-header.module.css';
import CustomNavLink from '../custom-link/custom-link';
import { FC } from 'react';

const AppHeader: FC = () => {
  return (
    <div className={headerStyle.containerHeader}>
      <header className={headerStyle.headerContainer}>
        <div className={headerStyle.header}>
          <nav
            aria-label='Основная навигация'
            className={headerStyle.navigation}
          >
            <ul className={headerStyle.navList}>
              <li className={`${headerStyle.navItem} ${'pr-5 mr-2'}`}>
                <CustomNavLink to='/' icon={BurgerIcon} label='Конструктор' />
              </li>
              <li className={headerStyle.navItem}>
                <CustomNavLink
                  to='/order'
                  icon={ListIcon}
                  label='Лента заказов'
                />
              </li>
            </ul>
          </nav>

          <div className={headerStyle.logo}>
            <CustomNavLink to='/' icon={Logo} />
          </div>

          <nav aria-label='Навигация входа' className={headerStyle.navigation}>
            <ul className={headerStyle.navList}>
              <li className={headerStyle.navItem}>
                <CustomNavLink
                  to='/profile'
                  icon={ProfileIcon}
                  label='Личный кабинет'
                />
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default AppHeader;
