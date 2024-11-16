import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import headerStyle from './app-header.module.css';

const AppHeader = () => {
  return (
    <header className={headerStyle.headerContainer}>
      <div className={headerStyle.header}>
        <nav aria-label='Основная навигация' className={headerStyle.navigation}>
          <ul className={headerStyle.navList}>
            <li className={`${headerStyle.navItem} ${'pr-5 mr-2'}`}>
              <a href='#' className={headerStyle.navLink}>
                <BurgerIcon className='mr-2' type='primary' />
                <p className='text text_type_main-default'>Конструктор</p>
              </a>
            </li>
            <li className={headerStyle.navItem}>
              <a href='#' className={headerStyle.navLink}>
                <ListIcon className='mr-2' type='secondary' />
                <p className='text text_type_main-default text_color_inactive'>
                  Лента заказов
                </p>
              </a>
            </li>
          </ul>
        </nav>

        <Logo />

        <nav aria-label='Навигация входа' className={headerStyle.navigation}>
          <ul className={headerStyle.navList}>
            <li className={headerStyle.navItem}>
              <ProfileIcon className='mr-2' type='secondary' />
              <a href='#' className={headerStyle.navLink}>
                <p className='text text_type_main-default text_color_inactive'>
                  Личный кабинет
                </p>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AppHeader;
