import { DropTargetMonitor, useDrop } from 'react-dnd';
import {
  addIngredientToConstructor,
  deleteIngredientToConstructor,
} from '../../services/ingredientsSlice';
import OrderSummary from './order-summary/order-summary';
import BunElement from './bun-element/bun-element';
import RenderMains from './render-mains/render-mains';
import style from './burger-constructor.module.css';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { TConstructorIngredients } from '../../types';
import { FC } from 'react';

type ItemType = 'bun' | 'main' | 'sauce';

const BurgerConstructor: FC = () => {
  const constructorIngredients: TConstructorIngredients = useAppSelector(
    state => state.ingredients.constructorIngredients
  );
  const orderPrice = useAppSelector(
    state => state.ingredients.order.orderPrice
  );

  const dispatch = useAppDispatch();

  const { buns, mains } = constructorIngredients;

  const ingredientMainIds = mains.map(ing => ing._id);

  const allIngredients: string[] = [
    buns[0]?._id,
    ...ingredientMainIds,
    buns[1]?._id,
  ].filter(Boolean);

  const handleDrop = (
    itemId: { type: string; _id: string } | unknown,
    type: DropTargetMonitor
  ) => {
    dispatch(addIngredientToConstructor(itemId));
  };

  const [{ isHover, itemType }, dropTarget] = useDrop({
    accept: ['bun', 'main', 'sauce'],
    drop(itemId, type) {
      handleDrop(itemId, type);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      itemType: monitor.getItemType() as ItemType,
    }),
  });

  const getBorderColor = (type: string[]) =>
    isHover && type.includes(itemType)
      ? '1px solid #4C4CFF'
      : '1px solid transparent';

  const borderColorBun = getBorderColor(['bun']);
  const borderColorIngredient = getBorderColor(['main', 'sauce']);

  return (
    <div ref={dropTarget} className={`${style.listContainer}${' mt-25'}`}>
      <ul className={style.list}>
        <BunElement
          position={'top'}
          positionText={'(верх)'}
          bun={buns[0]}
          borderColor={borderColorBun}
        />
      </ul>

      <RenderMains
        mains={mains}
        borderColor={borderColorIngredient}
        onDelete={id => dispatch(deleteIngredientToConstructor(id))}
      />

      <ul className={style.list}>
        <BunElement
          position={'bottom'}
          positionText={'(низ)'}
          bun={buns[1]}
          borderColor={borderColorBun}
        />
      </ul>

      {orderPrice && (
        <OrderSummary orderPrice={orderPrice} ingredientIds={allIngredients} />
      )}
    </div>
  );
};

export default BurgerConstructor;
