import { Outlet } from 'react-router-dom';
import style from './ingredient.module.css';

const IngredientPage = () => {
  return (
    <div className={style.container}>
      <Outlet />
    </div>
  );
};

export default IngredientPage;
