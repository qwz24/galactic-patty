import appStyle from './app.module.css';
import AppHeader from '../app-header/app-header';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import '../../index.css';
import { useEffect, useMemo, useState } from 'react';
import { BASE_URL, fetchWithChecks } from '../../constans/api';

function App() {
  const [ingredientsData, setIngredientsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWithChecks(`${BASE_URL}/api/ingredients`);
        setIngredientsData(data);
      } catch (e) {
        console.error(e.message);
      }
    };

    fetchData();
  }, []);

  const bunItem = useMemo(
    () => ingredientsData.filter(i => i.type === 'bun'),
    [ingredientsData]
  );

  const sauceItem = useMemo(
    () => ingredientsData.filter(i => i.type === 'sauce'),
    [ingredientsData]
  );

  const mainItem = useMemo(
    () => ingredientsData.filter(i => i.type === 'main'),
    [ingredientsData]
  );

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
