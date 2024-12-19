import { DndProvider } from 'react-dnd';
import AppHeader from '../../components/app-header/app-header';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';
import style from './home.module.css';

const HomePage = () => {
  return (
    <>
      <AppHeader />

      <div className={style.containerMain}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
    </>
  );
};

export default HomePage;
