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
