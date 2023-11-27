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
                    active ?
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" xml:space="preserve">
                            <path
                                clip-rule="evenodd"
                                d="M27.704 8.397a1.016 1.016 0 0 0-1.428 0L11.988
                                22.59l-6.282-6.193a1.016 1.016 0 0 0-1.428 0 .994.994 0 0 0 0 1.414l6.999 6.899c.39.386
                                1.039.386 1.429 0L27.704 9.811a.992.992 0 0 0 0-1.414c-.394-.391.395.39 0 0z"
                                fill="#ffffff"
                                fill-rule="evenodd"
                                className="fill-121313"/>
                        </svg> :
                        number
                }
            </div>
          </Link>
        </div>
    </div>
   );
}
 
export default HeaderProfile;