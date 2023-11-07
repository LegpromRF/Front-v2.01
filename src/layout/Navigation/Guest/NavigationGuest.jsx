import styles from './NavigationGuest.module.scss'

import ButtonNavigation from '@/UI/ButtonNavigation/ButtonNavigation';



import ad from 'public/icon/ad.svg';
import {Link} from "react-router-dom";

const NavigationGuest = ({active, setActive}) => {

  const tarif = 'Pro'

  return ( 
    <div onClick={() => setActive(false)}  className={active ? [styles.nav__bg, styles.nav__bg_active].join(' ') : styles.nav__bg}>
        <nav onClick={(e) => e.stopPropagation()} className={active ? [styles.nav, styles.nav__active].join(' ') : styles.nav}>
          <div className={styles.nav__content}>
            <div className={styles.nav__head}>
              <div className="nav__profileContainer">
                <h2 className={styles.nav__title}>Гость</h2>
                
              </div>
            </div>
            <div className={styles.nav__buttons}>
              <div className="nav__profileContainer">
              <div className={styles.nav__buttons}>
        <ButtonNavigation 
        title="Главная" 
        href="/profile/home" 
        activeLink={
          pathname[2] == 'home' 
          ? 
            true 
          : 
            false
        }>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M5.2974 7.56134V13.0494" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.03073 4.93524V13.0494" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.7035 10.4614V13.0494" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.7488 1H5.25167C2.63834 1 1.00024 2.84967 1.00024 5.46813V12.5319C1.00024 15.1503 2.63072 17 5.25167 17H12.7488C15.3698 17 17.0002 15.1503 17.0002 12.5319V5.46813C17.0002 2.84967 15.3698 1 12.7488 1Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ButtonNavigation>

        <ButtonNavigation 
          title="Просмотр ТЗ" 
          href="/profile/checkTz"
          activeLink={
            pathname[2] == 'checkTz' 
            ? 
             true 
            : 
              false
          }>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M5.2974 7.56134V13.0494" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9.03073 4.93524V13.0494" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12.7035 10.4614V13.0494" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.7488 1H5.25167C2.63834 1 1.00024 2.84967 1.00024 5.46813V12.5319C1.00024 15.1503 2.63072 17 5.25167 17H12.7488C15.3698 17 17.0002 15.1503 17.0002 12.5319V5.46813C17.0002 2.84967 15.3698 1 12.7488 1Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ButtonNavigation>

        <ButtonNavigation 
          title="Реестр заказов" 
          href="/profile/registry" 
          activeLink={
            pathname[2] == 'registry' 
            ? 
              true 
            : 
              false
            }>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M12.4281 1H15.0414C16.1226 1 16.9997 1.88472 16.9997 2.97615V5.61128C16.9997 6.70188 16.1226 7.58743 15.0414 7.58743H12.4281C11.3461 7.58743 10.469 6.70188 10.469 5.61128V2.97615C10.469 1.88472 11.3461 1 12.4281 1Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M2.95938 1H5.57184C6.65387 1 7.53097 1.88472 7.53097 2.97615V5.61128C7.53097 6.70188 6.65387 7.58743 5.57184 7.58743H2.95938C1.87735 7.58743 1.00024 6.70188 1.00024 5.61128V2.97615C1.00024 1.88472 1.87735 1 2.95938 1Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M2.95938 10.4126H5.57184C6.65387 10.4126 7.53097 11.2973 7.53097 12.3896V15.0239C7.53097 16.1153 6.65387 17 5.57184 17H2.95938C1.87735 17 1.00024 16.1153 1.00024 15.0239V12.3896C1.00024 11.2973 1.87735 10.4126 2.95938 10.4126Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M12.4281 10.4126H15.0414C16.1226 10.4126 16.9997 11.2973 16.9997 12.3896V15.0239C16.9997 16.1153 16.1226 17 15.0414 17H12.4281C11.3461 17 10.469 16.1153 10.469 15.0239V12.3896C10.469 11.2973 11.3461 10.4126 12.4281 10.4126Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ButtonNavigation>

        <ButtonNavigation 
          title="О платформе" 
          href="/profile/about" 
          activeLink={
            pathname[2] == 'about' 
            ? 
              true 
            : 
              false
          }>
          <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
            <path d="M11.3991 12.7099H5.12427" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.3991 9.07127H5.12427" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M7.51862 5.44138H5.12427" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M11.5667 1C11.5667 1 4.89465 1.00348 4.88422 1.00348C2.48552 1.01825 1.00024 2.59652 1.00024 5.00391V12.9961C1.00024 15.4156 2.49682 17 4.91638 17C4.91638 17 11.5875 16.9974 11.5988 16.9974C13.9975 16.9826 15.4837 15.4035 15.4837 12.9961V5.00391C15.4837 2.58436 13.9862 1 11.5667 1Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </ButtonNavigation>
      </div>
              </div>
            </div>
            <div className={styles.nav__footer}>

                  <div className={styles.nav__referal}>
                      <div className="nav__profileContainer">
                        <Link to="/nolayout">Реферальная программа</Link>
                      </div>
                  </div>

                  <div className={styles.nav__ad}>
                    {
                      tarif !== 'Pro' 
                      ? 
                        <Link to="/">
                          <img
                              src={ad} 
                              alt="LegpromRF"  
                              width={257} 
                              height={212}
                            />
                        </Link>
                      :
                        null
                    }
                  </div>

                  <div className={styles.nav__wrapper}>
                    <div className={styles.nav__balance}>
                      <div className={styles.nav__money}>
                        <div className={styles.nav__money_number}>0 ₽</div>
                        <div className={styles.nav__money_text}>остаток счета</div>
                      </div>
                      <div className={styles.nav__buttonsFooter}>
                        <div className={styles.nav__button}>+</div>
                        <div className={styles.nav__button}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                            <path d="M1 5.08335H11M11 5.08335L7.25 1M11 5.08335L7.25 9" stroke="#FAFAFA" strokeWidth="1.06364" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
            </div>
          </div>
        </nav>
    </div>
   );
}
 
export default NavigationGuest;