import { Outlet } from 'react-router-dom';
import style from './ingredient.module.css';
import { FC } from 'react';

const IngredientPage: FC = () => {
  return (
    <div className={style.container}>
      <Outlet />
    </div>
  );
};

export default IngredientPage;
