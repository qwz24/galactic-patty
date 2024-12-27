import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import style from './order-summary.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { openModal } from '../../../services/modalSlice';
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ orderPrice, ingredientIds, onConfirmOrder }) => {
  const user = useSelector(state => state.authorization.user);

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
        <CurrencyIcon />
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

OrderSummary.propTypes = {
  orderPrice: PropTypes.number.isRequired,
  ingredientIds: PropTypes.array.isRequired,
  onConfirmOrder: PropTypes.func.isRequired,
};

export default OrderSummary;
