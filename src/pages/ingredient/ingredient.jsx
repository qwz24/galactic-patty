import { Outlet } from 'react-router-dom';
import style from './ingredient.module.css';
import AppHeader from '../../components/app-header/app-header';

const IngredientPage = () => {
  return (
    <>
      <AppHeader />
      <div className={style.container}>
        <Outlet />
      </div>
    </>
  );
};

export default IngredientPage;
