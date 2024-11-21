import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-сard.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
import IngredientDetails from '../../modals/ingredient-details/ingredient-details';
import Modal from '../../modals/modal';

const IngredientCard = props => {
  const { image, name, price } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <IngredientDetails setIsModalOpen={setIsModalOpen} {...props} />
        </Modal>
      )}
      <div
        onClick={handleClick}
        style={{ cursor: 'pointer' }}
        className={style.card}
        role='button'
      >
        <Counter count={1} size='default' extraClass='m-1' />
        <div>
          <div
            className={'mr-4 ml-4'}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'end',
            }}
          >
            <img src={image} alt={name} className={style.cardImage} />
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
    </>
  );
};

IngredientCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isScrollable: PropTypes.bool,
};

export default IngredientCard;
