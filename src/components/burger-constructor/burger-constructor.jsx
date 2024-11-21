import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { ingredientsItemType } from '../../types/prop-types';
import Modal from '../modals/modal';
import { useState } from 'react';
import OrderDetails from '../modals/order-details/order-details';

const BurgerConstructor = ({ mainItem, bunItem }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && (
        <Modal setIsModalOpen={setIsModalOpen}>
          <OrderDetails setIsModalOpen={setIsModalOpen} />
        </Modal>
      )}

      <div className='mt-25' style={{ maxWidth: '600px' }}>
        <ul style={{ listStyle: 'none', padding: '0px' }}>
          {bunItem[0] && (
            <li className='ml-8 mb-4 pr-4'>
              <ConstructorElement
                type='top'
                isLocked={true}
                text={bunItem[0].name}
                price={bunItem[0].price}
                thumbnail={bunItem[0].image}
              />
            </li>
          )}
          <div className={style.ingredientsContainer}>
            {mainItem.map(main => {
              return (
                <li
                  className='mb-4 pr-2'
                  style={{ display: 'flex', alignItems: 'center' }}
                  key={main._id}
                >
                  <DragIcon className='mr-2' />
                  <ConstructorElement
                    text={main.name}
                    price={main.price}
                    thumbnail={main.image}
                  />
                </li>
              );
            })}
          </div>
          {bunItem[0] && (
            <li className='ml-8 mb-4 pr-4'>
              <ConstructorElement
                type='bottom'
                isLocked={true}
                text={bunItem[0].name}
                price={bunItem[0].price}
                thumbnail={bunItem[0].image}
              />
            </li>
          )}
        </ul>
        <div
          style={{
            display: 'flex',
            justifyContent: 'end',
          }}
          className='mt-10 mr-4'
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginRight: '40px',
            }}
          >
            <p className='text text_type_digits-medium mr-2'>610</p>
            <CurrencyIcon />
          </div>
          <Button
            htmlType='button'
            type='primary'
            size='medium'
            onClick={() => setIsModalOpen(true)}
          >
            Оформить заказ
          </Button>
        </div>
      </div>
    </>
  );
};

BurgerConstructor.propTypes = {
  bunItem: PropTypes.arrayOf(ingredientsItemType),
  mainItem: PropTypes.arrayOf(ingredientsItemType),
};

export default BurgerConstructor;
