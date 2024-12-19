import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-сard.module.css';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewedIngredient } from '../../../services/ingredientsSlice';
import { useDrag } from 'react-dnd';
import { openModal } from '../../../services/modalSlice';
import { NavLink, useLocation } from 'react-router-dom';

const IngredientCard = props => {
  const { _id, type, image, name, price } = props;

  const constructorIngredients = useSelector(
    state => state.ingredients.constructorIngredients
  );

  const location = useLocation();

  const dispatch = useDispatch();

  const count = useCallback(
    id => {
      return (
        constructorIngredients.buns.reduce((acc, el) => {
          if (el._id === id) {
            return acc + 1;
          }
          return acc;
        }, 0) +
        constructorIngredients.mains.reduce((acc, el) => {
          if (el._id === id) {
            return acc + 1;
          }
          return acc;
        }, 0)
      );
    },
    [constructorIngredients]
  );
  const [, dragRef] = useDrag({
    type,
    item: { _id, type },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleClick = () => {
    dispatch(openModal('ingredient'));
    dispatch(setViewedIngredient({ ...props }));
  };

  return (
    <NavLink
      to={`/ingredients/${_id}`}
      state={{ background: location }}
      key={_id}
    >
      <div onClick={handleClick} className={style.card} role='button'>
        {count(_id) > 0 && (
          <Counter count={count(_id)} size='default' extraClass='m-1' />
        )}
        <div>
          <div className={`${style.cardContent} ${'mr-4 ml-4'}`}>
            <img
              ref={dragRef}
              src={image}
              alt={name}
              className={style.cardImage}
            />
          </div>

          <div className={`${style.cardPrice} mt-1 mb-1`}>
            <p className='text text_type_digits-default'>{price}</p>
            <CurrencyIcon />
          </div>

          <div className={style.cardTitle}>
            <p className='text text_type_main-default mb-6'>{name}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  _id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default IngredientCard;
