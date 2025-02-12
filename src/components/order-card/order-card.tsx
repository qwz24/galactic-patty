import { FC } from 'react';
import {
  Button,
  CloseIcon,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import style from './order-card.module.css';
import { useOrderDetails } from '../../hooks/useOrderDetails';
import { closeModal } from '../../services/modalSlice';

import Loader from '../loader/loader';
import { formatDate } from '../../utils/utils';
import { useAppDispatch } from '../../services/store';

type Props = { isModal?: boolean };

const OrderCard: FC<Props> = ({ isModal = true }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { order, ingredients, totalPrice } = useOrderDetails();

  const statusMap: Record<
    'created' | 'pending' | 'done',
    { label: string; color: string }
  > = {
    created: { label: 'Готовится', color: '#F2F2F3' },
    pending: { label: 'Отменён', color: '#F2F2F3' },
    done: { label: 'Выполнен', color: '#00CCCC' },
  };

  const orderStatus = order?.status as 'created' | 'pending' | 'done';

  return (
    <>
      {!order ? (
        <Loader />
      ) : (
        <div className={isModal ? style.orderCardModal : style.orderCard}>
          <div className={isModal ? '' : style.orderCardContent}>
            <div
              className={`${
                isModal ? style.orderHeaderModal : style.orderHeader
              } pb-10`}
            >
              <p className='text text_type_digits-default'>
                {`#${order?.number}`}
              </p>
              {isModal && (
                <Button
                  htmlType='button'
                  type='secondary'
                  size='small'
                  onClick={() => {
                    dispatch(closeModal());
                    navigate(-1);
                  }}
                >
                  <CloseIcon type='primary' />
                </Button>
              )}
            </div>

            <h2
              className={`${style.orderName} text text_type_main-medium pb-3`}
            >
              {order?.name}
            </h2>
            <p
              className={`${style.orderStatus} text text_type_main-default pb-15`}
              style={{ color: statusMap[orderStatus]?.color }}
            >
              {statusMap[orderStatus]?.label}
            </p>

            <p className='text text_type_main-medium pb-4'>Состав:</p>
            <div className={`${style.orderStructure} mb-10`}>
              <ul className={style.orderList}>
                {ingredients?.map(ing => (
                  <li key={ing?._id} className={`${style.orderItem} mr-6 mb-4`}>
                    <div className={style.ingredientInfo}>
                      <img src={ing?.image} alt={ing?.name} />
                      <p
                        className={`${style.ingredientName} text text_type_main-default pl-4 pr-4`}
                      >
                        {ing?.name}
                      </p>
                    </div>
                    <div className={style.ingredientPrice}>
                      {ing.count > 1 && (
                        <p
                          className={`${style.ingredientQuantity} text text_type_digits-default`}
                        >
                          {ing?.count} x
                        </p>
                      )}
                      <p
                        className={`${style.ingredientCost} text text_type_digits-default`}
                      >
                        {ing?.price} <CurrencyIcon type='primary' />
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className={style.orderFooter}>
              <p className='text text_type_main-default text_color_inactive'>
                {formatDate(order?.createdAt)}
              </p>
              <div
                className={`${style.totalPrice} text text_type_digits-default`}
              >
                {totalPrice} <CurrencyIcon type='primary' className='pl-2' />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderCard;
