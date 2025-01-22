import style from './modal-overlay.module.css';
import { useDispatch } from 'react-redux';
import { closeModal } from '../../../services/modalSlice';
import { useNavigate } from 'react-router-dom';
import { FC, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const ModalOverlay: FC<Props> = ({ children }) => {
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

export default ModalOverlay;
