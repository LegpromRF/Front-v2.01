import styles from './HeaderProfile.module.scss'
import {Link} from "react-router-dom";

const HeaderProfile = ({title, href, number, active}) => {
  return ( 
    <div className={styles.header}>
      <div className={active ? [styles.header__item, styles.header__item_active].join(' ') : styles.header__item}>
          <Link to={href}>
            <span>{title}</span>
            <div className={active ? [styles.header__itemNumber, styles.header__itemNumber_active].join(' ') : styles.header__itemNumber}>
                {
                    active?
                        <svg fill="#ffffff" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                             xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 78.369 78.369" xml:space="preserve"
                             stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> <g> <path d="M78.049,19.015L29.458,67.606c-0.428,0.428-1.121,0.428-1
                            .548,0L0.32,40.015c-0.427-0.426-0.427-1.119,0-1.547l6.704-6.704 c0.428-0.427,1.121-0.427,1.548,0l2
                            0.113,20.112l41.113-41.113c0.429-0.427,1.12-0.427,1.548,0l6.703,6.704 C78.477,17.894,78.477,18.586,78.049,19.015z"></path> </g>
                            </g></svg>
                        :
                        {number}
                }
            </div>
          </Link>
        </div>
    </div>
   );
}
 
export default HeaderProfile;