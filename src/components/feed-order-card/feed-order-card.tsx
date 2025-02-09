import { FC } from 'react';
import style from './feed-order-card.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { openModal } from '../../services/modalSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { TIngredient } from '../../types';
import { formatDate } from '../../utils/utils';
import { NavLink, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  ingredientIds: string[];
  number: number;
  name: string;
  createdAt: string;
  orderStatus?: string;
  id?: string;
};

const OrderCard: FC<Props> = ({
  orderStatus,
  name,
  number,
  ingredientIds,
  createdAt,
}) => {
  const ingredientsMap = useAppSelector(
    state => state.ingredients.ingredientsMap
  );

  const ingredientsToDisplay = ingredientIds?.map(id => ingredientsMap[id]);

  const totalPrice = ingredientsToDisplay?.reduce(
    (acc: number, i: TIngredient) => {
      acc += i?.price;

      return acc;
    },
    0
  );

  const statusMap: Record<
    'created' | 'pending' | 'done',
    { label: string; color: string }
  > = {
    created: { label: 'Готовится', color: '#F2F2F3' },
    pending: { label: 'Отменён', color: '#F2F2F3' },
    done: { label: 'Выполнен', color: '#00CCCC' },
  };

  const orderStatusinfo = orderStatus as 'created' | 'pending' | 'done';

  const location = useLocation();
  const { pathname } = location;

  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(openModal('feedOrder'));
  };
  return (
    <NavLink
      to={`${
        pathname === '/profile/orders'
          ? `/profile/orders/${number}`
          : `/feed/${number}`
      }`}
      state={{ background: location }}
    >
      <div className={style.orderCard} onClick={handleClick}>
        <div className={style.orderCardContent}>
          <div className={`${style.orderHeader} pb-6`}>
            <p className={`${style.orderId} text text_type_digits-default`}>
              {`#${number}`}
            </p>
            <p
              className={`${style.orderTimestamp} text text_type_main-default text_color_inactive`}
            >
              {createdAt && formatDate(createdAt)}
            </p>
          </div>
          <h2
            className={`${style.orderName} text text_type_main-medium ${
              orderStatus ? 'pb-2' : 'pb-6'
            }`}
          >
            {name}
          </h2>
          {orderStatus && (
            <p
              className={`${style.orderStatus} text text_type_main-default mb-6`}
              style={{ color: statusMap[orderStatusinfo]?.color }}
            >
              {statusMap[orderStatusinfo]?.label}
            </p>
          )}

          <div className={style.orderDetails}>
            <div className={style.ingredientsImages}>
              {ingredientsToDisplay?.slice(0, 5).map(ing => {
                return (
                  <div key={`${uuidv4()}`} className={style.ingredientImage}>
                    <img src={ing?.image} alt={ing?.name} />
                  </div>
                );
              })}

              {ingredientsToDisplay && ingredientsToDisplay?.length > 5 && (
                <div className={style.ingredientImage}>
                  <img
                    src={ingredientsToDisplay[5].image}
                    alt={ingredientsToDisplay[5].name}
                  />
                  <span
                    className={`${style.ingredientCounter} text text_type_main-default`}
                  >
                    +{ingredientsToDisplay.length - 5}
                  </span>
                </div>
              )}
            </div>
            <div
              className={`${style.orderPrice} text text_type_digits-default`}
            >
              {totalPrice} <CurrencyIcon type='primary' className='pl-2' />
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default OrderCard;
