import reducer, {
  connect,
  disconnect,
  onConnected,
  onDisconnected,
  onMessageReceived,
} from './ordersFeedSlice';

const initialState = {
  orders: [],
  total: 0,
  totalToday: 0,
  connected: false,
  error: null,
};

describe('ordersFeedSlice reducer', () => {
  test('Начальное состояние соответствует ожидаемому', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  test('Статус соединения должен стать "подключен"', () => {
    expect(reducer(initialState, connect('Run the tests'))).toEqual({
      ...initialState,
      connected: true,
    });
  });

  test('Статус соединения должен стать "отключен"', () => {
    expect(reducer({ ...initialState, connected: true }, disconnect())).toEqual(
      {
        ...initialState,
        connected: false,
      }
    );
  });

  test('onConnected должен устанавливать соединение', () => {
    expect(reducer(initialState, onConnected())).toEqual({
      ...initialState,
      connected: true,
    });
  });

  test('onDisconnected должен разрывать соединение', () => {
    expect(
      reducer({ ...initialState, connected: true }, onDisconnected())
    ).toEqual({
      ...initialState,
      connected: false,
    });
  });

  test('Полученное сообщение должно обновить состояние', () => {
    const newMessage = {
      orders: [
        {
          ingredients: ['643d69a5c3f7b9001cfa093d'],
          _id: '67a486d1133acd001be4edf6',
          name: 'Экзо-плантаго space флюоресцентный метеоритный бургер',
          status: 'done' as const,
          number: 67678,
          createdAt: '2025-02-06T09:54:25.366Z',
          updatedAt: '2025-02-06T09:54:26.010Z',
        },
      ],
      total: 67885,
      totalToday: 94,
    };

    expect(reducer(initialState, onMessageReceived(newMessage))).toEqual({
      ...initialState,
      ...newMessage,
    });
  });
});
