import { DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import style from './render-mains.module.css';
import CustomConstructorElement from '../constructor-element/constructor-element';
import { FC, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { updateIngredientToConstructor } from '../../../services/ingredientsSlice';
import RenderMain from './render-main/render-main';
import { TIngredient } from '../../../types';

type Props = {
  mains: TIngredient[];
  borderColor: string;
  onDelete: (id: string) => void;
};

type exponentCallback = (dragIndex: number, hoverIndex: number) => void;

const RenderMains: FC<Props> = ({ mains, borderColor, onDelete }) => {
  const dispatch = useDispatch();

  const moveCard = useCallback<exponentCallback>(
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
            handleClose={() => onDelete(main.id as string)}
            moveItem={moveCard}
          />
        ))
      ) : (
        <li className={`${style.ingredientsList} ${'pr-2'}`}>
          <DragIcon type='primary' className='mr-2' />
          <CustomConstructorElement
            text='Выберите начинку'
            borderColor={borderColor}
          />
        </li>
      )}
    </div>
  );
};

export default RenderMains;
