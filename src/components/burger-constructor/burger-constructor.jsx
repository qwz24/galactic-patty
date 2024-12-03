import Modal from '../modals/modal';
import { useState } from 'react';
import OrderDetails from '../modals/order-details/order-details';
import { useDispatch, useSelector } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  addIngredientToConstructor,
  createOrder,
  deleteIngredientToConstructor,
} from '../../services/ingredientsSlice';
import OrderSummary from './order-summary/order-summary';
import BunElement from './bun-element/bun-element';
import RenderMains from './render-mains/render-mains';
import style from './burger-constructor.module.css';

const BurgerConstructor = () => {
  const constructorIngredients = useSelector(
    state => state.ingredients.constructorIngredients
  );
  const orderPrice = useSelector(state => state.ingredients.order.orderPrice);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { buns, mains } = constructorIngredients;

  const ingredientMainIds = mains.map(ing => ing._id);

  const allIngredients = [
    buns[0]?._id,
    ...ingredientMainIds,
    buns[1]?._id,
  ].filter(Boolean);

  const handleDrop = (itemId, type) => {
    dispatch(addIngredientToConstructor(itemId, type));
  };

  const [{ isHover, itemType }, dropTarget] = useDrop({
    accept: ['bun', 'main', 'sauce'],
    drop(itemId, type) {
      handleDrop(itemId, type);
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
      itemType: monitor.getItemType(),
    }),
  });

  const getBorderColor = type =>
    isHover && type.includes(itemType)
      ? '1px solid #4C4CFF'
      : '1px solid transparent';

  const borderColorBun = getBorderColor(['bun']);
  const borderColorIngredient = getBorderColor(['main', 'sauce']);

  return (
    <>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <OrderDetails setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}

      <div ref={dropTarget} className={`${style.listContainer}${' mt-25'}`}>
        <ul className={style.list}>
          <BunElement
            position={'top'}
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
            bun={buns[1]}
            borderColor={borderColorBun}
          />
        </ul>

        {orderPrice && (
          <OrderSummary
            setIsModalOpen={setIsModalOpen}
            orderPrice={orderPrice}
            ingredientIds={allIngredients}
            onConfirmOrder={() => dispatch(createOrder(allIngredients))}
          />
        )}
      </div>
    </>
  );
};

export default BurgerConstructor;
