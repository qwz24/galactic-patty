import PropTypes from 'prop-types';

const CustomConstructorElement = ({ position, text, borderColor }) => {
  return (
    <div
      className={
        position
          ? `constructor-element constructor-element_pos_${position}`
          : 'constructor-element'
      }
      style={{
        width: '100%',
        maxWidth: '536px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
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
