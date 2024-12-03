import {
  Button,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import done from '../../../images/done.png';
import style from './order-details.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { resetOrderState } from '../../../services/ingredientsSlice';

const OrderDetails = ({ setIsModalOpen }) => {
  const orderNumber = useSelector(
    state => state.ingredients.order.orderDetails?.orderNumber
  );
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(resetOrderState());
  };
  return (
    <div className={`${style.popupСontainer} ${'pt-30 pr-25 pb-30 pl-25'}`}>
      <div className={style.popupClose}>
        <Button
          htmlType='button'
          type='secondary'
          size='small'
          style={{ padding: '0px' }}
          onClick={() => {
            setIsModalOpen(false);
          }}
        >
          <CloseIcon onClick={handleClick} />
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
  );
};

OrderDetails.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
};

export default OrderDetails;
