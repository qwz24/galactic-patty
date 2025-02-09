import { FC, useEffect } from 'react';
import style from './feed.module.css';
import OrderDashboard from '../../components/order-dashboard/order-dashboard';
import OrderCard from '../../components/feed-order-card/feed-order-card';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { ordersFeedActions } from '../../services/ordersFeedSlice';
import { Outlet, useLocation } from 'react-router-dom';
import { WSS_URL } from '../../constans/api';

const FeedPage: FC = () => {
  const orders = useAppSelector(state => state.ordersFeed.orders);

  const dispatch = useAppDispatch();
  const location = useLocation();

  useEffect(() => {
    const initialUrl = `${WSS_URL}/all`;

    dispatch(ordersFeedActions.connect(initialUrl));

    return () => {
      dispatch(ordersFeedActions.onDisconnected());
    };
  }, [dispatch]);

  const isModal = location.state?.modal;

  return (
    <>
      <div className={style.container}>
        <p className='text text_type_main-large pb-5 pl-2'>Лента заказов</p>
        <div className={style.containerMain}>
          <section className={`${style.orderFeed} mb-4 pr-2 mr-15`}>
            {orders.map(order => {
              return (
                <OrderCard
                  key={order._id}
                  number={order.number}
                  name={order.name}
                  ingredientIds={order.ingredients}
                  createdAt={order.createdAt}
                  id={order._id}
                />
              );
            })}
          </section>
          <section className={style.orderDashboard}>
            <OrderDashboard />
          </section>
        </div>
      </div>
      {!isModal && <Outlet />}
    </>
  );
};

export default FeedPage;
