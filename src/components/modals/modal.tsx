import { createPortal } from 'react-dom';
import style from './modal.module.css';
import { FC, ReactNode, useEffect } from 'react';
import ModalOverlay from './modal-overlay/modal-overlay';
import { closeModal } from '../../services/modalSlice';
import { useAppDispatch, useAppSelector } from '../../services/store';

type Props = {
  children: ReactNode;
  onClose?: () => void;
};

const modalRoot = document.getElementById('react-modals');

const Modal: FC<Props> = ({ children }) => {
  const { isOpen } = useAppSelector(state => state.modal);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(closeModal());
      }
    };
    document.addEventListener('keydown', handleEscapeKey);
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [dispatch]);

  if (!children || !modalRoot) return null;
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

export default Modal;
