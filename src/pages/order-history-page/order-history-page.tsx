import style from './order-history-page.module.css';
import ProfileNav from '../../components/profile-nav/profile-nav';
import OrderCard from '../../components/feed-order-card/feed-order-card';
import { useEffect } from 'react';
import { ordersHistoryActions } from '../../services/ordersHistorySlice';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { getCookie } from '../../utils/utils';
import { WSS_URL } from '../../constans/api';

const OrderHistoryPage = () => {
  const ordersHistory = useAppSelector(state => state.ordersHistory.orders);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = getCookie('accessToken')?.replace('Bearer ', '');
    const initialUrl = `${WSS_URL}?token=${accessToken}`;

    dispatch(ordersHistoryActions.connect(initialUrl));

    return () => {
      dispatch(ordersHistoryActions.onDisconnected());
    };
  }, [dispatch]);

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        <ProfileNav />

        <section className={style.orderFeed}>
          {ordersHistory
            ?.slice()
            .reverse()
            .map(order => {
              return (
                <OrderCard
                  key={order._id}
                  ingredientIds={order.ingredients}
                  orderStatus={order.status}
                  number={order.number}
                  name={order.name}
                  createdAt={order.createdAt}
                />
              );
            })}
        </section>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
