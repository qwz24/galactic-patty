import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../services/modalSlice';

const ModalOverlay = ({ children }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={style.modalOverlay}
      onClick={() => {
        dispatch(closeModal());
      }}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element,
};

export default ModalOverlay;
