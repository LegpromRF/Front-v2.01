import styles from './HeaderProfile.module.scss'
import Logo from '/public/Logo/logo.png'
import {Link} from "react-router-dom";

const HeaderProfile = ({active}) => {
  // const username = getUserName()
  // console.log(username)
  return (
    <header>
      <div className={[styles.header, styles.header__profileContainer].join(' ')}>
        <div className={styles.header__content}>
          <div className={styles.header__logo}>
            <Link to='/'>
              <img
                src={Logo}
                alt="LegpromRF"
                width={135}
                height={35}
              />
            </Link>
          </div>
          <div className={active ? [styles.header__burger, styles.header__menuActive].join(' ') : styles.header__burger}>
            <span></span>
          </div>
        </div>
        <div className={styles.home__header}>
          <div className={styles.home__contacts}>
            <div className={styles.home__text}>Обращайтесь! Тел: +7-958-111-4884</div>
            <div className={styles.home__links}>
              <a
                  className={styles.home__link}
                  href={"https://wa.me/+79261894737"}
              >
                <img src={"/icon/SocialMedia/whatsapp.png"} alt={"whatsapp"}/>
              </a>
              <a
                  className={styles.home__link}
                  href={"https://t.me/LegpromRF_bot"}
              >
                <img src={"/icon/SocialMedia/telegram.png"} alt={"telegram"}/>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
   );
}

export default HeaderProfile;