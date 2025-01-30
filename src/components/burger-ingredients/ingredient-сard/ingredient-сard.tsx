import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-сard.module.css';
import { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setViewedIngredient } from '../../../services/ingredientsSlice';
import { useDrag } from 'react-dnd';
import { openModal } from '../../../services/modalSlice';
import { NavLink, useLocation } from 'react-router-dom';
import { RootState } from '../../../services/store';
import { TConstructorIngredients } from '../../../types';

type Props = {
  _id: string;
  type: string;
  image: string;
  name: string;
  price: number;
};

type exponentCallback = (id: string) => number;

const IngredientCard: FC<Props> = props => {
  const { _id, type, image, name, price } = props;

  const constructorIngredients: TConstructorIngredients = useSelector(
    (state: RootState) => state.ingredients.constructorIngredients
  );

  const location = useLocation();

  const dispatch = useDispatch();

  const count = useCallback<exponentCallback>(
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
            <CurrencyIcon type='primary' />
          </div>

          <div className={style.cardTitle}>
            <p className='text text_type_main-default mb-6'>{name}</p>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default IngredientCard;
