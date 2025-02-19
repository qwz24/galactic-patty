import reducer, { closeModal, openModal } from './modalSlice';

const initialState = {
  isOpen: false,
  modalType: null,
};

describe('modalSlice reducer', () => {
  beforeEach(() => {
    jest.spyOn(Storage.prototype, 'setItem');
    jest.spyOn(Storage.prototype, 'clear');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  test('Начальное состояние соответствует ожидаемому', () => {
    expect(reducer(undefined, { type: 'unknown' })).toEqual({
      isOpen: false,
      modalType: null,
    });
  });

  test('Должен открыть модальное окно', () => {
    expect(reducer(initialState, openModal('order'))).toEqual({
      isOpen: true,
      modalType: 'order',
    });

    expect(localStorage.setItem).toHaveBeenCalled();
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('modalType', 'order');
  });

  test('Должен закрыть модальное окно', () => {
    expect(reducer(initialState, closeModal())).toEqual({
      ...initialState,
    });

    expect(localStorage.clear).toHaveBeenCalledTimes(1);
  });
});
