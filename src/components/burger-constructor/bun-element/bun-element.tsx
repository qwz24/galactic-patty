import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomConstructorElement from '../constructor-element/constructor-element';
import { FC } from 'react';
import { TIngredient } from '../../../types';

type Props = {
  position: 'top' | 'bottom';
  bun: TIngredient;
  borderColor: string;
  positionText: string;
};

const BunElement: FC<Props> = ({
  position,
  bun,
  borderColor,
  positionText,
}) => {
  return (
    <li className='ml-8 mb-4 pr-4'>
      {bun ? (
        <ConstructorElement
          type={position}
          isLocked={true}
          text={`${bun.name} ${positionText}`}
          price={bun.price}
          thumbnail={bun.image}
        />
      ) : (
        <CustomConstructorElement
          text='Выберите булку'
          borderColor={borderColor}
        />
      )}
    </li>
  );
};

export default BunElement;
