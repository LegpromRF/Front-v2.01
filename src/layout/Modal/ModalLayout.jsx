import styles from "./ModalLayout.module.scss";
import closeModal from "@/../public/icon/close.svg";

const Modal = ({ children }) => {
  return (
    <div className={styles.modal}>
      <div
        className={styles.modal__content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.modal__close}>
          <img src={closeModal} width={20} height={20} />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
