import style from './burger-ingredients.module.css';
import IngredientCard from './ingredient-сard/ingredient-сard';
import TabMenu from './tab-menu/tab-menu';
import { useSelector } from 'react-redux';
import { useRef, useState } from 'react';

const BurgerIngredients = () => {
  const { buns, sauces, mains } = useSelector(
    state => state.ingredients.categories
  );

  const [activeTab, setActiveTab] = useState('bun');
  const tabRef = useRef();
  const headersRef = useRef([]);

  const handleScroll = () => {
    const distances = headersRef.current.map(header => {
      const tabTop = header.getBoundingClientRect().top;
      const headerTop = tabRef.current.getBoundingClientRect().top;
      return Math.abs(headerTop - tabTop);
    });

    const closestIndex = distances.indexOf(Math.min(...distances));
    const tabs = ['bun', 'sauce', 'main'];
    setActiveTab(tabs[closestIndex]);
  };

  const handleTabClick = tab => {
    setActiveTab(tab);

    const tabIndex = ['bun', 'sauce', 'main'].indexOf(tab);
    const headerElement = headersRef.current[tabIndex];
    if (headerElement) {
      headerElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <div className={style.container}>
      <p className='text text_type_main-large pb-5'>Соберите бургер</p>

      <div className={style.containerTab} ref={tabRef}>
        <TabMenu activeTab={activeTab} setActiveTab={handleTabClick} />
      </div>

      <div
        className={`${style.ingredientsContainer} ${'mt-10'}`}
        onScroll={handleScroll}
      >
        <p
          className='text text_type_main-medium'
          ref={el => (headersRef.current[0] = el)}
        >
          Булки
        </p>
        <div className={`${style.cardsContainer} ${'mt-6 mr-4 mb-10 ml-4'}`}>
          {buns.map(bun => {
            return <IngredientCard key={bun._id} {...bun} />;
          })}
        </div>
        <div>
          <p
            className='text text_type_main-medium'
            ref={el => (headersRef.current[1] = el)}
          >
            Соусы
          </p>
          <div className={`${style.cardsContainer} ${'mt-6 mr-4 mb-10 ml-4'}`}>
            {sauces.map(sauce => {
              return <IngredientCard key={sauce._id} {...sauce} />;
            })}
          </div>
        </div>
        <div>
          <p
            className='text text_type_main-medium'
            ref={el => (headersRef.current[2] = el)}
          >
            Начинки
          </p>

          <div className={`${style.cardsContainer} ${'mt-6 mr-4 mb-10 ml-4'}`}>
            {mains.map(main => {
              return <IngredientCard key={main._id} {...main} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BurgerIngredients;
