import style from './burger-ingredients.module.css';
import IngredientCard from './ingredient-сard/ingredient-сard';
import TabMenu from './tab-menu/tab-menu';
import { useRef, useState } from 'react';
import { useAppSelector } from '../../services/store';
import { Categories } from '../../types';
import Modal from '../modals/modal';
import OrderDetails from '../modals/order-details/order-details';
import Loader from '../loader/loader';

const BurgerIngredients = () => {
  const { buns, sauces, mains } = useAppSelector(
    (state): Categories => state.ingredients.categories
  );

  const orderStatus = useAppSelector(
    state => state.ingredients.order.orderStatus
  );

  const [activeTab, setActiveTab] = useState<string>('bun');
  const tabRef = useRef<HTMLDivElement | null>(null);
  const headersRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const modalType = localStorage.getItem('modalType');

  const handleScroll = () => {
    if (!tabRef.current) return;

    const distances = headersRef.current.map(header => {
      if (!header) return Infinity;
      if (!tabRef.current) return Infinity;

      const tabTop = header.getBoundingClientRect().top;
      const headerTop = tabRef.current.getBoundingClientRect().top;
      return Math.abs(headerTop - tabTop);
    });

    const closestIndex = distances.indexOf(Math.min(...distances));
    const tabs = ['bun', 'sauce', 'main'];
    setActiveTab(tabs[closestIndex]);
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);

    const tabIndex = ['bun', 'sauce', 'main'].indexOf(tab);
    const headerElement = headersRef.current[tabIndex];
    if (headerElement) {
      headerElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      {modalType === 'order' && (
        <Modal>
          {orderStatus === 'loading' ? <Loader /> : <OrderDetails />}
        </Modal>
      )}
      <div className={style.container}>
        <p className='text text_type_main-large pb-5'>Соберите бургер</p>

        <div className={style.containerTab} ref={tabRef}>
          <TabMenu activeTab={activeTab} setActiveTab={handleTabClick} />
        </div>

        <div
          className={`${style.ingredientsContainer} ${'mt-10'}`}
          onScroll={handleScroll}
        >
          <p
            className='text text_type_main-medium'
            ref={el => (headersRef.current[0] = el)}
          >
            Булки
          </p>
          <div className={`${style.cardsContainer} ${'mt-6 mr-4 mb-10 ml-4'}`}>
            {buns.map(bun => {
              return <IngredientCard key={bun._id} {...bun} />;
            })}
          </div>
          <div>
            <p
              className='text text_type_main-medium'
              ref={el => (headersRef.current[1] = el)}
            >
              Соусы
            </p>
            <div
              className={`${style.cardsContainer} ${'mt-6 mr-4 mb-10 ml-4'}`}
            >
              {sauces.map(sauce => {
                return <IngredientCard key={sauce._id} {...sauce} />;
              })}
            </div>
          </div>
          <div>
            <p
              className='text text_type_main-medium'
              ref={el => (headersRef.current[2] = el)}
            >
              Начинки
            </p>

            <div
              className={`${style.cardsContainer} ${'mt-6 mr-4 mb-10 ml-4'}`}
            >
              {mains.map(main => {
                return <IngredientCard key={main._id} {...main} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BurgerIngredients;
