import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './render-mains.module.css';
import CustomConstructorElement from '../constructor-element/constructor-element';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateIngredientToConstructor } from '../../../services/ingredientsSlice';
import RenderMain from './render-main/render-main';
import PropTypes from 'prop-types';
import { ingredientsItemType } from '../../../types/prop-types';

const RenderMains = ({ mains, borderColor, onDelete }) => {
  const dispatch = useDispatch();

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(updateIngredientToConstructor({ dragIndex, hoverIndex }));
    },
    [dispatch]
  );
  return (
    <div className={style.ingredientsContainer}>
      {mains.length > 0 ? (
        mains.map((main, index) => (
          <RenderMain
            index={index}
            key={main.id}
            main={main}
            handleClose={() => onDelete(main.id)}
            moveItem={moveCard}
          />
        ))
      ) : (
        <li className='pr-2' style={{ display: 'flex', alignItems: 'center' }}>
          <DragIcon className='mr-2' />
          <CustomConstructorElement
            text='Выберите начинку'
            borderColor={borderColor}
          />
        </li>
      )}
    </div>
  );
};

RenderMains.propTypes = {
  mains: PropTypes.arrayOf(ingredientsItemType),
  borderColor: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default RenderMains;
