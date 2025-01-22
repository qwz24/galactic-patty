import {
  Button,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import done from '../../../images/done.png';
import style from './order-details.module.css';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../loader/loader';
import { closeModal } from '../../../services/modalSlice';
import { RootState } from '../../../services/store';
import { FC } from 'react';

const OrderDetails: FC = () => {
  const orderNumber = useSelector(
    (state: RootState) => state.ingredients.order.orderDetails?.orderNumber
  );
  const orderStatus: any = useSelector(
    (state: RootState) => state.ingredients.order.orderStatus
  );
  const dispatch = useDispatch();

  return (
    <>
      {orderStatus === 'loading' ? (
        <Loader />
      ) : (
        <div className={`${style.popupСontainer} ${'pt-30 pr-25 pb-30 pl-25'}`}>
          <div className={style.popupClose}>
            <Button
              htmlType='button'
              type='secondary'
              size='small'
              style={{ padding: '0px' }}
              onClick={() => {
                dispatch(closeModal());
              }}
            >
              <CloseIcon type='primary' />
            </Button>
          </div>

          <p className='text text_type_digits-large mb-8'>{orderNumber}</p>
          <p className='text text_type_main-medium'>идентификатор заказа</p>
          <img
            src={done}
            alt='Ваш заказ начали готовить'
            className={`${style.popupImg} ${'pt-15 pb-15'}`}
          ></img>
          <p className='text text_type_main-default mb-2'>
            Ваш заказ начали готовить
          </p>
          <p className='text text_type_main-default text_color_inactive'>
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
