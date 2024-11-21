import { createPortal } from 'react-dom';
import style from './modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import ModalOverlay from './modal-overlay/modal-overlay';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ children, setIsModalOpen }) => {
  useEffect(() => {
    const handleEscapeKey = e => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [setIsModalOpen]);

  return createPortal(
    <ModalOverlay setIsModalOpen={setIsModalOpen}>
      <div className={style.modalContent} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  setIsModalOpen: PropTypes.func,
  children: PropTypes.element,
};

export default Modal;
