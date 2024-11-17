import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import '../../index.css';
import { useEffect, useState } from 'react';
import { fetchMockData } from '../../utils/data';

function App() {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchMockData().then(res => setIngredients(res));
  }, []);

  const bunItem = ingredients.filter(i => i.type === 'bun');
  const sauceItem = ingredients.filter(i => i.type === 'sauce');
  const mainItem = ingredients.filter(i => i.type === 'main');

  return (
    <>
      <div className={appStyle.containerHeader}>
        <AppHeader />
      </div>
      <div className={appStyle.containerMain}>
        <BurgerIngredients
          bunItem={bunItem}
          sauceItem={sauceItem}
          mainItem={mainItem}
        />
        <BurgerConstructor mainItem={mainItem} bunItem={bunItem} />
      </div>
    </>
  );
}

export default App;
