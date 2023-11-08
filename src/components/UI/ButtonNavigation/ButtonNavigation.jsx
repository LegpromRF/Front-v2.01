import styles from './ButtonNavigation.module.scss'
import {Link} from "react-router-dom";

const ButtonNavigation = ({children, href, title, stopPropagation, active, activeLink}) => {
  return ( 

    /*onClick={(e) => stopPropagation == 'true' ? e.stopPropagation() : null*/ 
    <div className={[styles.button, active && styles.button_closed].join(' ')}>
        {
        stopPropagation === 'true' ?

        <div className={active ? [styles.button__link, styles.button__linkActive].join(' ') : styles.button__link}>
          <span className={styles.button__title}>{title}</span>
          {children}
        </div>
      :
        <Link className={activeLink ? [styles.button__link, styles.button__linkActiveMenuBase].join(' ') : styles.button__link} to={href} >
          <span className={styles.button__title}>{title}</span>
          {children}
        </Link>
      }
    </div>
   );
}
 
export default ButtonNavigation;