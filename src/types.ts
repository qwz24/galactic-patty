export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  id?: string;
};

export type TConstructorIngredients = {
  buns: TIngredient[];
  mains: TIngredient[];
};

export type Categories = {
  buns: TIngredient[];
  sauces: TIngredient[];
  mains: TIngredient[];
};

export type Order = {
  ingredients: string[];
  _id: string;
  name: string;
  status: 'created' | 'pending' | 'done';
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TMessage = {
  orders: Order[];
  total: number;
  totalToday: number;
};
