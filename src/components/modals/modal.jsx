import { createPortal } from 'react-dom';
import style from './modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ModalOverlay from './modal-overlay/modal-overlay';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../services/modalSlice';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ children }) => {
  const { isOpen } = useSelector(state => state.modal);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleEscapeKey = e => {
      if (e.key === 'Escape') {
        dispatch(closeModal());
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [dispatch]);

  if (!children) return null;
  if (!isOpen) return null;

  return createPortal(
    <ModalOverlay>
      <div className={style.modalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  children: PropTypes.element,
};

export default Modal;
