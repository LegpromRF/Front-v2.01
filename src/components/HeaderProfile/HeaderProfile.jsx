import styles from './HeaderProfile.module.scss'
import {Link} from "react-router-dom";

const HeaderProfile = ({title, href, number, active}) => {
  return ( 
    <div className={styles.header}>
      <div className={active ? [styles.header__item, styles.header__item_active].join(' ') : styles.header__item}>
          <Link to={href}>
            <span>{title}</span>
            <div className={active ? [styles.header__itemNumber, styles.header__itemNumber_active].join(' ') : styles.header__itemNumber}>
              {number}
            </div>
          </Link>
        </div>
    </div>
   );
}
 
export default HeaderProfile;