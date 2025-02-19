import reducer, {
  addIngredientToConstructor,
  createOrder,
  deleteIngredientToConstructor,
  fetchIngredients,
  initialState,
  resetViewedIngredient,
  setViewedIngredient,
  updateIngredientToConstructor,
} from './ingredientsSlice';

jest.mock('uuid', () => ({
  v4: () => 'test-unique-id',
}));

describe('ingredientsSlice reducer', () => {
  it('Должен вернуть начальное состояние при инициализации', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      ...initialState,
    });
  });

  it('Должен установить выбранный ингредиент в state', () => {
    const viewedIngredientAction = {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0,
    };
    expect(
      reducer(initialState, setViewedIngredient(viewedIngredientAction))
    ).toEqual({
      ...initialState,
      viewedIngredient: viewedIngredientAction,
    });
  });

  it('Должен сбросить выбранный ингредиент в state', () => {
    expect(reducer(initialState, resetViewedIngredient())).toEqual({
      ...initialState,
      viewedIngredient: [],
    });
  });

  it('Должен добавить основной ингредиент в конструктор', () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1739461046052);

    const newState = reducer(
      {
        ...initialState,
        ingredientsList: [
          {
            _id: '643d69a5c3f7b9001cfa0943',
            name: 'Соус фирменный Space Sauce',
            type: 'sauce',
            proteins: 50,
            fat: 22,
            carbohydrates: 11,
            calories: 14,
            price: 80,
            image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/sauce-04-large.png',
            __v: 0,
          },
        ],
      },
      addIngredientToConstructor({
        type: 'sauce',
        _id: '643d69a5c3f7b9001cfa0943',
        uniqueId: 'test-unique-id-1739461046052',
      })
    );

    expect(newState.constructorIngredients.mains).toEqual([
      expect.objectContaining({
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        price: 80,
        id: 'test-unique-id-1739461046052',
      }),
    ]);

    jest.restoreAllMocks();
  });

  it('Должен добавить 2 булки в конструктор и обновить цену заказа', () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1739461046052);

    const bun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
    };

    const newState = reducer(
      {
        ...initialState,
        ingredientsList: [
          {
            ...bun,
          },
        ],
      },
      addIngredientToConstructor({
        type: 'bun',
        _id: '643d69a5c3f7b9001cfa093c',
      })
    );

    expect(newState.constructorIngredients.buns).toEqual([
      {
        ...bun,
        id: 'test-unique-id-1739461046052',
      },
      {
        ...bun,
        id: 'test-unique-id-1739461046052',
      },
    ]);

    expect(newState.order.orderPrice).toEqual(bun.price * 2);

    jest.restoreAllMocks();
  });

  test('Должен заменить текущую булку в конструкторе на новую', () => {
    jest.spyOn(global.Date, 'now').mockImplementation(() => 1739461046052);

    const fluorescentBun = {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0,
    };
    const craterBun = {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      __v: 0,
    };
    const newState = reducer(
      {
        ...initialState,
        ingredientsList: [{ ...fluorescentBun, ...craterBun }],
        constructorIngredients: {
          buns: [
            {
              ...fluorescentBun,
              id: 'ae3221c7-3af0-426b-b5a4-816bf59299df-1739465045108',
            },
            {
              ...fluorescentBun,
              id: 'ae3221c7-3af0-426b-b5a4-816bf59299df-1739465045108',
            },
          ],
          mains: [],
        },
      },
      addIngredientToConstructor({
        _id: '643d69a5c3f7b9001cfa093c',
        type: 'bun',
      })
    );

    expect(newState.constructorIngredients.buns).toEqual([
      {
        ...craterBun,
        id: 'test-unique-id-1739461046052',
      },
      {
        ...craterBun,
        id: 'test-unique-id-1739461046052',
      },
    ]);

    expect(newState.order.orderPrice).toEqual(craterBun.price * 2);

    jest.restoreAllMocks();
  });

  test('Должен удалить ингредиент из конструктора и обновить цену заказа', () => {
    const newState = reducer(
      {
        ...initialState,
        constructorIngredients: {
          buns: [],
          mains: [
            {
              _id: '643d69a5c3f7b9001cfa0943',
              name: 'Соус фирменный Space Sauce',
              type: 'sauce',
              proteins: 50,
              fat: 22,
              carbohydrates: 11,
              calories: 14,
              price: 80,
              image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/sauce-04-large.png',
              __v: 0,
              id: '226d2187-a26c-4836-80b3-550771638e5a-1739463416262',
            },
          ],
        },
      },
      deleteIngredientToConstructor(
        '226d2187-a26c-4836-80b3-550771638e5a-1739463416262'
      )
    );

    expect(newState.constructorIngredients.mains).toEqual([]);
    expect(newState.order.orderPrice).toEqual(null);
  });

  test('Должен изменить порядок начинок в конструкторе', () => {
    const newState = reducer(
      {
        ...initialState,

        constructorIngredients: {
          buns: [],
          mains: [
            {
              _id: '643d69a5c3f7b9001cfa0943',
              name: 'Соус фирменный Space Sauce',
              type: 'sauce',
              proteins: 50,
              fat: 22,
              carbohydrates: 11,
              calories: 14,
              price: 80,
              image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/sauce-04-large.png',
              __v: 0,
              id: '7e0f0fba-2a3d-423e-8419-cec533732b3a-1739464736278',
            },
            {
              _id: '643d69a5c3f7b9001cfa0945',
              name: 'Соус с шипами Антарианского плоскоходца',
              type: 'sauce',
              proteins: 101,
              fat: 99,
              carbohydrates: 100,
              calories: 100,
              price: 88,
              image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
              image_mobile:
                'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
              image_large:
                'https://code.s3.yandex.net/react/code/sauce-01-large.png',
              __v: 0,
              id: 'a16cda7c-cf60-43df-ae13-a944d1fbfa67-1739464737526',
            },
          ],
        },
      },
      updateIngredientToConstructor({ dragIndex: 1, hoverIndex: 0 })
    );

    expect(newState.constructorIngredients.mains).toEqual([
      {
        _id: '643d69a5c3f7b9001cfa0945',
        name: 'Соус с шипами Антарианского плоскоходца',
        type: 'sauce',
        proteins: 101,
        fat: 99,
        carbohydrates: 100,
        calories: 100,
        price: 88,
        image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png',
        __v: 0,
        id: 'a16cda7c-cf60-43df-ae13-a944d1fbfa67-1739464737526',
      },

      {
        _id: '643d69a5c3f7b9001cfa0943',
        name: 'Соус фирменный Space Sauce',
        type: 'sauce',
        proteins: 50,
        fat: 22,
        carbohydrates: 11,
        calories: 14,
        price: 80,
        image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
        image_mobile:
          'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
        __v: 0,
        id: '7e0f0fba-2a3d-423e-8419-cec533732b3a-1739464736278',
      },
    ]);
  });

  test('Должен обработать fetchIngredients.pending', () => {
    const action = { type: fetchIngredients.pending.type };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoadingIngredients: true,
      hasErrorIngredients: false,
    });
  });

  test('Должен обработать fetchIngredients.fulfilled', () => {
    const mockIngredients = [
      {
        _id: '643d69a5c3f7b9001cfa093c',
        name: 'Краторная булка N-200i',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-02.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
        __v: 0,
      },
      {
        _id: '643d69a5c3f7b9001cfa093d',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 80,
        fat: 24,
        carbohydrates: 53,
        calories: 420,
        price: 1255,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
      },
    ];

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: mockIngredients,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoadingIngredients: false,
      ingredientsList: mockIngredients,
      categories: {
        buns: [...mockIngredients],
        mains: [],
        sauces: [],
      },
      ingredientsMap: {
        '643d69a5c3f7b9001cfa093c': mockIngredients[0],
        '643d69a5c3f7b9001cfa093d': mockIngredients[1],
      },
    });
  });

  test('Должен обработать fetchIngredients.rejected', () => {
    const errorMessage = 'Error fetching ingredients';

    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoadingIngredients: false,
      hasErrorIngredients: errorMessage,
      constructorIngredients: {
        buns: [],
        mains: [],
      },
    });
  });

  test('Должен обработать createOrder.pending', () => {
    const action = {
      type: createOrder.pending.type,
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoadingIngredients: false,
      order: {
        orderStatus: 'loading',
        orderError: null,
        orderDetails: null,
        orderPrice: null,
      },
    });
  });

  test('Должен обработать createOrder.fulfilled', () => {
    const mockOrder = {
      name: 'Краторный астероидный бургер',
      orderNumber: 68415,
    };
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      order: {
        orderPrice: null,
        orderStatus: 'idle',
        orderError: null,
        orderDetails: {
          name: 'Краторный астероидный бургер',
          orderNumber: 68415,
        },
      },
      constructorIngredients: {
        buns: [],
        mains: [],
      },
    });
  });

  test('Должен обработать createOrder.rejected', () => {
    const errorMessage = 'Error fetching ingredients';

    const action = {
      type: fetchIngredients.rejected.type,
      error: { message: errorMessage },
    };

    const state = reducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoadingIngredients: false,
      hasErrorIngredients: errorMessage,
      constructorIngredients: {
        buns: [],
        mains: [],
      },
    });
  });
});
