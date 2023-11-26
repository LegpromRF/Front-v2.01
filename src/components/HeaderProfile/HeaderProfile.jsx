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
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                             id="Layer_1" x="0px" y="0px" stroke="#ffffff" width="122.881px" height="89.842px" viewBox="0 0 122.881 89.842"
                             enable-background="new 0 0 122.881 89.842" xml:space="preserve"><g><path
                            d="M1.232,55.541c-1.533-1.388-1.652-3.756-0.265-5.289c1.388-1.534,3.756-1.652,5.29-0.265l34.053
                            ,30.878l76.099-79.699 c1.429-1.501,3.804-1.561,5.305-0.132c1.502,1.428,1.561,3.803,0.133,5.305L
                            43.223,88.683l-0.005-0.005 c-1.396,1.468-3.716,1.563-5.227,0.196L1.232,55.541L1.232,55.541z"/></g></svg>
                        :
                        <>
                            {number}
                        </>
                }
            </div>
          </Link>
        </div>
    </div>
   );
}
 
export default HeaderProfile;