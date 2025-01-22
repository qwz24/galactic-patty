import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './order-summary.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../services/modalSlice';
import { useNavigate } from 'react-router-dom';
import { FC } from 'react';
import { RootState } from '../../../services/store';

type Props = {
  orderPrice: number;
  ingredientIds: string[];
  onConfirmOrder: (ingredientIds: string[]) => void;
};

const OrderSummary: FC<Props> = ({
  orderPrice,
  ingredientIds,
  onConfirmOrder,
}) => {
  const user = useSelector((state: RootState) => state.authorization.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      navigate('/login');
    } else {
      dispatch(openModal('order'));
      onConfirmOrder(ingredientIds);
    }
  };

  return (
    <div className={`${style.orderSummary} ${'mt-10 mr-8'}`}>
      <div className={style.orderSummaryPrice}>
        <p className='text text_type_digits-medium mr-2'>{orderPrice}</p>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='medium'
        onClick={handleClick}
      >
        Оформить заказ
      </Button>
    </div>
  );
};
export default OrderSummary;
