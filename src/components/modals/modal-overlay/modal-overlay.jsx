import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../services/modalSlice';
import { useNavigate } from 'react-router-dom';

const ModalOverlay = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div
      className={style.modalOverlay}
      onClick={() => {
        dispatch(closeModal());
        navigate('/');
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
