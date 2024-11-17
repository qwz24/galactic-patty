import PropTypes from 'prop-types';

export const ingredientsItemType = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrate: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string.isRequired,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number,
  type: PropTypes.string.isRequired,
  __v: PropTypes.number,
  _id: PropTypes.string.isRequired,
});
