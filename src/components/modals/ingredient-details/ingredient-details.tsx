import {
  Button,
  CloseIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './ingredient-details.module.css';
import { resetViewedIngredient } from '../../../services/ingredientsSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../services/store';
import { TIngredient } from '../../../types';
import { FC } from 'react';

type Props = {
  isModal?: boolean;
  onClose: () => void;
};

const IngredientDetails: FC<Props> = ({ onClose, isModal = true }) => {
  const { id } = useParams();
  const ingredients: TIngredient[] = useAppSelector(
    state => state.ingredients.ingredientsList
  );

  const openedIngredient: TIngredient | undefined = ingredients.find(
    ing => ing._id === id
  );

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className={`${style.popupСontainer} ${'pt-10 pr-10 pb-15 pl-10'}`}>
      <div className={isModal ? style.popupHeader : ''}>
        <p className='text text_type_main-large'>Детали ингредиента</p>

        {isModal && (
          <Button
            htmlType='button'
            type='secondary'
            size='small'
            style={{ padding: '0px' }}
            onClick={() => {
              onClose();
              navigate('/');
              dispatch(resetViewedIngredient());
            }}
          >
            <CloseIcon type='primary' />
          </Button>
        )}
      </div>

      <img
        src={openedIngredient?.image_large}
        alt={`Изображение ингредиента ${openedIngredient?.name}`}
      />

      <p
        className={`${
          style.popupTitle
        } ${'text text_type_main-medium mt-4 mb-8'}`}
      >
        {openedIngredient?.name}
      </p>

      <div className={style.popupNutrients}>
        <div>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Калории,ккал
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {openedIngredient?.calories}
          </p>
        </div>

        <div>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Белки, г
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {openedIngredient?.proteins}
          </p>
        </div>

        <div>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Жиры, г
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {openedIngredient?.fat}
          </p>
        </div>

        <div>
          <p className='text text_type_main-default text_color_inactive mb-2'>
            Углеводы, г
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {openedIngredient?.carbohydrates}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IngredientDetails;
