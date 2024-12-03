import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

const OrderSummary = ({
  orderPrice,
  setIsModalOpen,
  ingredientIds,
  onConfirmOrder,
}) => {
  const handleClick = () => {
    setIsModalOpen(true);
    onConfirmOrder(ingredientIds);
  };
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'end',
      }}
      className='mt-10 mr-8'
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginRight: '40px',
        }}
      >
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
  setIsModalOpen: PropTypes.func.isRequired,
  onConfirmOrder: PropTypes.func.isRequired,
};

export default OrderSummary;
