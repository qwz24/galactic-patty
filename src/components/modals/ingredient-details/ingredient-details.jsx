import {
  Button,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { ingredientsItemType } from '../../../types/prop-types';

const IngredientDetails = ({
  setIsModalOpen,
  carbohydrates,
  fat,
  proteins,
  calories,
  image_large,
  name,
}) => {
  return (
    <div className={`${style.popupСontainer} ${'pt-10 pr-10 pb-15 pl-10'}`}>
      <div className={style.popupHeader}>
        <p className='text text_type_main-large' style={{ lineHeight: '64px' }}>
          Детали ингредиента
        </p>

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

      <img src={image_large} alt={`Изображение ингредиента ${name}`} />

      <p
        className={`${
          style.popupTitle
        } ${'text text_type_main-medium mt-4 mb-8'}`}
      >
        {name}
      </p>

      <div className={style.popupNutrients}>
        <div>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Калории,ккал
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {calories}
          </p>
        </div>

        <div>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Белки, г
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {proteins}
          </p>
        </div>

        <div>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Жиры, г
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {fat}
          </p>
        </div>

        <div>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Углеводы, г
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;

IngredientDetails.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  ...ingredientsItemType.propTypes,
};
