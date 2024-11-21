import style from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import IngredientCard from './ingredient-сard/ingredient-сard';
import TabMenu from './tab-menu/tab-menu';
import { ingredientsItemType } from '../../types/prop-types';

const BurgerIngredients = ({ bunItem, sauceItem, mainItem }) => {
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
            return <IngredientCard key={bun._id} {...bun} />;
          })}
        </div>
        <div>
          <p className='text text_type_main-medium'>Соусы</p>
          <div className={`${style.cardsContainer} ${'mt-6 mr-4 mb-10 ml-4'}`}>
            {sauceItem.map(sauce => {
              return <IngredientCard key={sauce._id} {...sauce} />;
            })}
          </div>
        </div>
        <div>
          <p className='text text_type_main-medium'>Начинки</p>

          <div className={`${style.cardsContainer} ${'mt-6 mr-4 mb-10 ml-4'}`}>
            {mainItem.map(main => {
              return <IngredientCard key={main._id} {...main} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

BurgerIngredients.propTypes = {
  bunItem: PropTypes.arrayOf(ingredientsItemType),
  sauceItem: PropTypes.arrayOf(ingredientsItemType),
  mainItem: PropTypes.arrayOf(ingredientsItemType),
};

export default BurgerIngredients;
