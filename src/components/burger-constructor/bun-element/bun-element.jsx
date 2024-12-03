import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import CustomConstructorElement from '../constructor-element/constructor-element';
import PropTypes from 'prop-types';

const BunElement = ({ position, bun, borderColor }) => (
  <li className='ml-8 mb-4 pr-4'>
    {bun ? (
      <ConstructorElement
        type={position}
        isLocked={true}
        text={bun.name}
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
BunElement.propTypes = {
  position: PropTypes.string,
  bun: PropTypes.object,
  borderColor: PropTypes.string.isRequired,
};
export default BunElement;
