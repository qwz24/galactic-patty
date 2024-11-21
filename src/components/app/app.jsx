import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import '../../index.css';
import { useEffect, useState } from 'react';
import { BASE_URL } from '../../constans/api';

function App() {
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    const fetchIngredientsData = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/ingredients`);
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        const json = await res.json();

        if (!json.success) {
          throw new Error('Failed to fetch ingredients: success = false');
        }

        setIngredientsData(json.data);
      } catch (e) {
        console.error(e.message);
      }
    };

    fetchIngredientsData();
  }, []);

  const bunItem = ingredientsData.filter(i => i.type === 'bun');
  const sauceItem = ingredientsData.filter(i => i.type === 'sauce');
  const mainItem = ingredientsData.filter(i => i.type === 'main');

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
