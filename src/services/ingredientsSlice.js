import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BASE_URL } from '../constans/api';
import { v4 as uuidv4 } from 'uuid';

const initialConstructorIngredients = { buns: [], mains: [] };
const initialOrderState = {
  orderPrice: null,
  orderStatus: 'idle',
  orderError: null,
  orderDetails: null,
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredientsList: [],
    categories: {
      buns: [],
      sauces: [],
      mains: [],
    },
    isLoadingIngredients: false,
    hasErrorIngredients: false,

    constructorIngredients: initialConstructorIngredients,

    viewedIngredient: [],

    order: initialOrderState,
  },
  reducers: {
    setViewedIngredient: (state, action) => {
      state.viewedIngredient = action.payload;
    },
    resetViewedIngredient: state => {
      state.viewedIngredient = [];
    },

    addIngredientToConstructor: (state, action) => {
      const ingredientMain = state.ingredientsList.find(
        i => i._id === action.payload._id && i.type !== 'bun'
      );

      const ingredientBun = state.ingredientsList.find(
        i => i._id === action.payload._id && i.type === 'bun'
      );

      if (ingredientMain) {
        const uniqueId = `${uuidv4()}-${Date.now()}`;
        state.constructorIngredients.mains.push({
          ...ingredientMain,
          id: uniqueId,
        });
        state.order.orderPrice += ingredientMain.price;
      }

      if (ingredientBun) {
        const uniqueId1 = `${uuidv4()}-${Date.now()}`;
        const uniqueId2 = `${uuidv4()}-${Date.now()}`;
        state.constructorIngredients.buns =
          state.constructorIngredients.buns.filter(ing => ing.type !== 'bun');

        state.constructorIngredients.buns.push({
          ...ingredientBun,
          id: uniqueId1,
        });

        state.constructorIngredients.buns.push({
          ...ingredientBun,
          id: uniqueId2,
        });

        state.order.orderPrice = calculateOrderPrice(
          state.constructorIngredients
        );
      }
    },

    deleteIngredientToConstructor: (state, action) => {
      const ingredientToRemove = state.constructorIngredients.mains.find(
        ing => ing.id === action.payload
      );
      if (ingredientToRemove) {
        state.constructorIngredients.mains =
          state.constructorIngredients.mains.filter(
            ing => ing.id !== action.payload
          );

        state.order.orderPrice -= ingredientToRemove.price;
      }
    },

    resetOrderState: state => {
      state.order.orderStatus = 'idle';
      state.order.orderError = null;
      state.order.orderDetails = null;
      state.order.orderPrice = null;
      state.constructorIngredients = { buns: [], mains: [] };
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
          buns: action.payload.filter(i => i.type === 'bun'),
          sauces: action.payload.filter(i => i.type === 'sauce'),
          mains: action.payload.filter(i => i.type === 'main'),
        };
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoadingIngredients = false;
        state.hasErrorIngredients = true;
        console.error(action.payload);
      })
      .addCase(createOrder.pending, state => {
        state.order.orderStatus = 'loading';
        state.order.orderError = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.order.orderStatus = 'success';
        state.order.orderDetails = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.order.orderStatus = 'error';
        state.order.orderError = action.payload || 'Unknown error';
      });
  },
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/fetchIngredients',
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/ingredients`);

      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }

      const json = await res.json();

      if (!json.success) {
        throw new Error('Failed to fetch data: success = false');
      }

      return json.data;
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  'ingredients/createOrder',
  async (constructorIngredients, { rejectWithValue }) => {
    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: constructorIngredients }),
      });

      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }

      const data = await res.json();

      if (!data.success) {
        throw new Error('Failed to create order: success = false');
      }

      return {
        name: data.name,
        orderNumber: data.order.number,
      };
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

const calculateOrderPrice = ingredients => {
  const bunsPrice = ingredients.buns.reduce((acc, bun) => acc + bun.price, 0);
  const mainsPrice = ingredients.mains.reduce(
    (acc, main) => acc + main.price,
    0
  );
  return bunsPrice + mainsPrice;
};

export const {
  setViewedIngredient,
  resetViewedIngredient,
  addIngredientToConstructor,
  deleteIngredientToConstructor,
  resetOrderState,
  updateIngredientToConstructor,
} = ingredientsSlice.actions;

export default ingredientsSlice.reducer;
