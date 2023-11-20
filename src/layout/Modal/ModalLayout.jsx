import styles from './ModalLayout.module.scss'
import closeModal from '@/../public/icon/close.svg'
import { useDispatch, useSelector } from "react-redux";
import { setModal } from "@store/auth/authModal.slice.js";

const Modal = ({ children, active, setActive}) => {
  return ( 
    <div className={active ? [styles.modal, styles.modal__active].join(' ') : styles.modal} onClick={() => setActive}>
      <div className={styles.modal__content} onClick={e => e.stopPropagation()}>
        <div className={styles.modal__close} onClick={() => dispatch(setModal(false))}>
          <img
            src={closeModal}
            width={20}
            height={20}
          />
        </div>
        {children}
      </div>
    </div>
   );
}
 
export default Modal;