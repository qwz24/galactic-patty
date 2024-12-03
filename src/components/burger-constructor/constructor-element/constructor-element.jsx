import PropTypes from 'prop-types';
import style from './constructor-element.module.css';

const CustomConstructorElement = ({ position, text, borderColor }) => {
  return (
    <div
      className={`${
        position
          ? `constructor-element constructor-element_pos_${position}`
          : 'constructor-element'
      } ${style.сonstructorElement}`}
      style={{
        border: borderColor,
      }}
    >
      <p className='text text_type_main-default'>{text}</p>
    </div>
  );
};

CustomConstructorElement.propTypes = {
  position: PropTypes.string,
  text: PropTypes.string.isRequired,
  borderColor: PropTypes.string.isRequired,
};

export default CustomConstructorElement;
