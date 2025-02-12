import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../services/store';
import { Order, TIngredient } from '../types';
import { getOrderDetails } from '../services/api';

const groupIngredients = (ingredients: TIngredient[]) => {
  return ingredients.reduce((acc, ing) => {
    if (acc[ing._id]) {
      acc[ing._id].count += 1;
    } else {
      acc[ing._id] = { ...ing, count: 1 };
    }
    return acc;
  }, {} as Record<string, TIngredient & { count: number }>);
};

export const useOrderDetails = () => {
  const [fetchedOrder, setFetchedOrder] = useState<Order | null>(null);
  const { number } = useParams();
  const orders = useAppSelector(state => state.ordersFeed.orders);
  const ingredientsMap = useAppSelector(
    state => state.ingredients.ingredientsMap
  );

  const order = useMemo(() => {
    const foundOrder =
      orders?.find(order => order.number === Number(number)) || fetchedOrder;

    if (
      !foundOrder ||
      !foundOrder.number ||
      !Array.isArray(foundOrder.ingredients)
    ) {
      return null;
    }

    return foundOrder;
  }, [orders, number, fetchedOrder]);

  useEffect(() => {
    if (!order && number) {
      const fetchOrder = async () => {
        const response = await getOrderDetails(number);
        setFetchedOrder(response.orders[0]);
      };

      fetchOrder();
    }
  }, [order, number]);

  const ingredientsToDisplay = useMemo(() => {
    return (
      order?.ingredients?.map(id => ingredientsMap[id]).filter(Boolean) || []
    );
  }, [order, ingredientsMap]);

  const groupedIngredients = useMemo(
    () => groupIngredients(ingredientsToDisplay),
    [ingredientsToDisplay]
  );

  const totalPrice = useMemo(() => {
    return ingredientsToDisplay.reduce((acc, ing) => acc + ing.price, 0);
  }, [ingredientsToDisplay]);

  return {
    order,
    ingredients: Object.values(groupedIngredients),
    totalPrice,
  };
};
