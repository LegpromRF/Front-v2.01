import styles from './HeaderProfile.module.scss'

import Link from "next/link";
import Image from 'next/image';
import Logo from 'public/logo.png'

const HeaderProfile = ({active}) => {

  return ( 
    <header>
      <div className={[styles.header, styles.header__profileContainer].join(' ')}>
        <div className={styles.header__content}>
          <div className={styles.header__logo}>
            <Link href='/'>
              <Image 
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
          <div className={[styles.home__welcome, styles.home__text].join(' ')}>Добро пожаловать, ekb-invest103@yandex.ru !</div>
          <div className={styles.home__contacts}>
            <div className={styles.home__text}>Обращайтесь! Тел: +7-958-111-4884</div>
            <div className={styles.home__links}>
              <Link
                  className={""}
                  href={"https://wa.me/+79261894737"}
              >
                WA
              </Link>
              <Link
                  className={""}
                  href={"http://t.me/LegpromRF_bot"}
              >
                TG
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
   );
}
 
export default HeaderProfile;