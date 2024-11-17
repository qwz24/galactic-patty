import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-сard.module.css';
import PropTypes from 'prop-types';

const IngredientCard = ({ img, title, price, isScrollable = false }) => {
  return (
    <article
      className={`${style.card} ${isScrollable ? style.scrollable : ''}`}
    >
      <p className={`${style.counter} ${'text text_type_digits-default'}`}>1</p>
      <div>
        <div
          className={'mr-4 ml-4'}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'end',
          }}
        >
          <img src={img} alt={title} className={style.cardImage} />
        </div>

        <div className={`${style.cardPrice} mt-1 mb-1`}>
          <p className='text text_type_digits-default'>{price}</p>
          <CurrencyIcon />
        </div>

        <div className={style.cardTitle}>
          <p className='text text_type_main-default mb-6'>{title}</p>
        </div>
      </div>
    </article>
  );
};

IngredientCard.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isScrollable: PropTypes.bool,
};

export default IngredientCard;
