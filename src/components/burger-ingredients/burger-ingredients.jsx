import {
  CurrencyIcon,
  Tab,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import { useState } from 'react';
import PropTypes from 'prop-types';

const IngredientCard = ({ img, title, price, isScrollable = false }) => {
  return (
    <article
      className={`${style.card} ${isScrollable ? style.scrollable : ''}`}
    >
      <p className={`${style.counter} ${'text text_type_digits-default'}`}>1</p>
      <div>
        <div
          className={'mr-4 ml-4'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
          }}
        >
          <img src={img} alt={title} className={style.cardImage} />
        </div>

        <div className={`${style.cardPrice} mt-1 mb-1`}>
          <p className='text text_type_digits-default'>{price}</p>
          <CurrencyIcon />
        </div>

        <div className={style.cardTitle}>
          <p className='text text_type_main-default mb-6'>{title}</p>
        </div>
      </div>
    </article>
  );
};

IngredientCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isScrollable: PropTypes.bool,
};

const TabMenu = () => {
  const [current, setCurrent] = useState('one');

  return (
    <>
      <Tab value='Булки' active={current === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value='Соусы' active={current === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value='Начинки' active={current === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </>
  );
};

const BurgerIngredients = ({ bunItem, sauceItem }) => {
  return (
    <div className={style.container}>
      <p className='text text_type_main-large pb-5'>Соберите бургер</p>

      <div style={{ display: 'flex' }}>
        <TabMenu />
      </div>

      <div className={`${style.ingredientsContainer} ${'mt-10'}`}>
        <p className='text text_type_main-medium'>Булки</p>
        <div className={`${style.cardsContainer} ${'mt-6 mr-4 mb-10 ml-4'}`}>
          {bunItem.map(bun => {
            return (
              <IngredientCard
                key={bun._id}
                img={bun.image}
                price={bun.price}
                title={bun.name}
              />
            );
          })}
        </div>
        <div>
          <p className='text text_type_main-medium'>Соусы</p>
          <div className={`${style.cardsContainer} ${'mt-6 mr-4 mb-10 ml-4'}`}>
            {sauceItem.map(sauce => {
              return (
                <IngredientCard
                  key={sauce._id}
                  img={sauce.image}
                  price={sauce.price}
                  title={sauce.name}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const ingredientsItemType = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrate: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number,
  type: PropTypes.string.isRequired,
  __v: PropTypes.number,
  _id: PropTypes.string.isRequired,
});

BurgerIngredients.propTypes = {
  bunItem: PropTypes.arrayOf(ingredientsItemType),
  sauceItem: PropTypes.arrayOf(ingredientsItemType),
};

export default BurgerIngredients;
