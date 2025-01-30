import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { request } from '../utils/utils';
import { TIngredient } from '../types';

type TState = {
  ingredientsList: [] | TIngredient[];
  categories: {
    buns: [] | TIngredient[];
    sauces: [] | TIngredient[];
    mains: [] | TIngredient[];
  };
  isLoadingIngredients: boolean;
  hasErrorIngredients: boolean | string;
  constructorIngredients: {
    buns: [] | TIngredient[];
    mains: [] | TIngredient[];
  };
  viewedIngredient: [] | TIngredient;
  order: {
    orderPrice: null | number;
    orderStatus: 'idle' | 'error' | 'success' | 'loading';
    orderError: null | string;
    orderDetails: null | {
      name: string;
      orderNumber: number;
    };
  };
};

const initialOrderState: TState['order'] = {
  orderPrice: null,
  orderStatus: 'idle',
  orderError: null,
  orderDetails: null,
};

const initialState: TState = {
  ingredientsList: [],
  categories: {
    buns: [],
    sauces: [],
    mains: [],
  },
  isLoadingIngredients: false,
  hasErrorIngredients: false,

  constructorIngredients: { buns: [], mains: [] },

  viewedIngredient: [],

  order: initialOrderState,
};

type AddIngredientPayload = { _id: string; uniqueId: string };

type AddIngredientAction = {
  payload: AddIngredientPayload;
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',

  initialState,
  reducers: {
    setViewedIngredient: (state, action) => {
      state.viewedIngredient = action.payload;
    },
    resetViewedIngredient: state => {
      state.viewedIngredient = [];
    },

    addIngredientToConstructor: {
      reducer: (state, action: AddIngredientAction) => {
        const ingredientMain = state.ingredientsList.find(
          i => i._id === action.payload._id && i.type !== 'bun'
        );

        const ingredientBun = state.ingredientsList.find(
          i => i._id === action.payload._id && i.type === 'bun'
        );

        if (ingredientMain) {
          (state.constructorIngredients.mains as TIngredient[]).push({
            ...ingredientMain,
            id: action.payload.uniqueId,
          });

          if (state.order.orderPrice) {
            state.order.orderPrice += ingredientMain.price;
          }
        }

        if (ingredientBun) {
          state.constructorIngredients.buns =
            state.constructorIngredients.buns.filter(
              (ing: TIngredient) => ing.type !== 'bun'
            );

          state.constructorIngredients.buns.push(
            { ...ingredientBun, id: action.payload.uniqueId },
            { ...ingredientBun, id: action.payload.uniqueId }
          );

          state.order.orderPrice = calculateOrderPrice(
            state.constructorIngredients
          );
        }
      },
      prepare: ingredient => {
        const uniqueId = `${uuidv4()}-${Date.now()}`;
        return { payload: { ...ingredient, uniqueId } };
      },
    },

    deleteIngredientToConstructor: (state, action) => {
      const ingredientToRemove = state.constructorIngredients.mains.find(
        (ing: TIngredient) => ing.id === action.payload
      );
      if (ingredientToRemove) {
        state.constructorIngredients.mains =
          state.constructorIngredients.mains.filter(
            (ing: TIngredient) => ing.id !== action.payload
          );
        if (state.order.orderPrice) {
          state.order.orderPrice -= ingredientToRemove.price;
        }
      }
    },

    updateIngredientToConstructor: (state, action) => {
      const { dragIndex, hoverIndex } = action.payload;

      const ingredients = state.constructorIngredients.mains;

      const draggedCard = ingredients.splice(dragIndex, 1)[0];

      ingredients.splice(hoverIndex, 0, draggedCard);
    },
  },

  extraReducers: builder => {
    builder
      .addCase(fetchIngredients.pending, state => {
        state.isLoadingIngredients = true;
        state.hasErrorIngredients = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoadingIngredients = false;
        state.ingredientsList = action.payload;
        state.categories = {
          buns: action.payload.filter((i: TIngredient) => i.type === 'bun'),
          sauces: action.payload.filter((i: TIngredient) => i.type === 'sauce'),
          mains: action.payload.filter((i: TIngredient) => i.type === 'main'),
        };
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoadingIngredients = false;
        state.hasErrorIngredients =
          action.error.message ?? 'Error fetching ingredients';
      })
      .addCase(createOrder.pending, state => {
        state.order.orderStatus = 'loading';
        state.order.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order.orderStatus = 'success';
        state.constructorIngredients = { buns: [], mains: [] };
        state.order = { ...initialOrderState, orderDetails: action.payload };
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.order.orderStatus = 'error';
        state.order.orderError = action.error.message ?? 'Error creating order';
      });
  },
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async () => {
    const res = await request('/api/ingredients');

    return res.data;
  }
);

export const createOrder = createAsyncThunk<
  { name: string; orderNumber: number },
  string[],
  { rejectValue: string }
>('ingredients/createOrder', async constructorIngredients => {
  const res = await request('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ingredients: constructorIngredients }),
  });

  return {
    name: res.name,
    orderNumber: res.order.number,
  };
});

const calculateOrderPrice = (ingredients: {
  buns: TIngredient[];
  mains: TIngredient[];
}) => {
  const bunsPrice = ingredients.buns.reduce(
    (acc: number, bun: TIngredient) => acc + bun.price,
    0
  );
  const mainsPrice = ingredients.mains.reduce(
    (acc: number, main: TIngredient) => acc + main.price,
    0
  );
  return bunsPrice + mainsPrice;
};

export const {
  setViewedIngredient,
  resetViewedIngredient,
  addIngredientToConstructor,
  deleteIngredientToConstructor,
  updateIngredientToConstructor,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
