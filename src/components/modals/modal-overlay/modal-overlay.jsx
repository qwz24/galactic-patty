import PropTypes from 'prop-types';
import style from './modal-overlay.module.css';

const ModalOverlay = ({ setIsModalOpen, children }) => {
  return (
    <div
      className={style.modalOverlay}
      onClick={() => {
        setIsModalOpen(false);
      }}
    >
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  setIsModalOpen: PropTypes.func,
  children: PropTypes.element,
};

export default ModalOverlay;
