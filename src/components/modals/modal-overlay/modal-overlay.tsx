import style from './modal-overlay.module.css';
import { closeModal } from '../../../services/modalSlice';
import { useNavigate } from 'react-router-dom';
import { FC, ReactNode } from 'react';
import { useAppDispatch } from '../../../services/store';

type Props = {
  children: ReactNode;
};

const ModalOverlay: FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  return (
    <div
      className={style.modalOverlay}
      onClick={() => {
        dispatch(closeModal());
        navigate(-1);
      }}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
