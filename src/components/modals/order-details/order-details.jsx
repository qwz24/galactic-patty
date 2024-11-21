import {
  Button,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import done from '../../../images/done.png';
import style from './order-details.module.css';
import PropTypes from 'prop-types';

const OrderDetails = ({ setIsModalOpen }) => {
  return (
    <div
      className={`${style.popupСontainer} ${'pt-30 pr-25 pb-30 pl-25'}`}
      style={{ position: 'relative' }}
    >
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
          <CloseIcon />
        </Button>
      </div>
      <p className='text text_type_digits-large mb-8'>034536</p>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <img
        style={{ maxWidth: '120px', maxHeight: '120px' }}
        src={done}
        alt='Ваш заказ начали готовить'
        className='pt-15 pb-15'
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
