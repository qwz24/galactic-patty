import { FC } from 'react';
import style from './order-dashboard.module.css';
import { useAppSelector } from '../../services/store';
import { chunkArray } from '../../utils/utils';
import { Order } from '../../types';

const OrderDashboard: FC = () => {
  const { orders, total, totalToday } = useAppSelector(
    state => state.ordersFeed
  );

  const ordersDone = chunkArray(
    orders.filter(order => order.status === 'done').slice(0, 20),
    10
  );
  const ordersPending = chunkArray(
    orders.filter(order => order.status === 'pending').slice(0, 20),
    10
  );

  const renderOrderColumns = (orderGroups: Order[][], statusClass: string) => (
    <div className={style.orderColumns}>
      {orderGroups.map((group, index) => (
        <ul key={index} className={style.readyOrdersList}>
          {group.map(order => (
            <li
              key={order._id}
              className={`${statusClass} text text_type_digits-default`}
            >
              {order.number}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );

  return (
    <>
      <div className={style.orderStats} aria-label='Статистика заказов'>
        <div className={`${style.orderStatus} pb-15`}>
          <div className={style.readyOrders}>
            <p className={`${style.statusTitle} text text_type_main-medium`}>
              Готовы:
            </p>
            {renderOrderColumns(ordersDone, style.orderIdDone)}
          </div>
          <div className={style.inProgressOrders}>
            <p className={`${style.statusTitle} text text_type_main-medium`}>
              В работе:
            </p>
            {renderOrderColumns(ordersPending, style.orderIdPending)}
          </div>
        </div>
      </div>

      <div className={`${style.completedOrders} pb-15`}>
        <p className={`${style.completedTitle} text text_type_main-medium`}>
          Выполнено за все время:
        </p>
        <p className='text text_type_digits-large'>{total}</p>
      </div>

      <div className={style.completedOrdersToday}>
        <p className={`${style.completedTitle} text text_type_main-medium`}>
          Выполнено за сегодня:
        </p>
        <p className='text text_type_digits-large'>{totalToday}</p>
      </div>
    </>
  );
};

export default OrderDashboard;
