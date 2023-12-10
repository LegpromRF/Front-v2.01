import styles from "./Layout.module.scss";
import LogoHeader from "@public/Logo/logo.png";
import { useEffect, useState } from "react";
// import NavigationPerformer from '@layout/Navigation/Performer/NavigationPerformer'
import NavigationClient from "@layout/Navigation/Client/NavigationClient";
// import NavigationGuest from '@layout/Navigation/Guest/NavigationGuest';
import { useDispatch, useSelector } from "react-redux";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import getUserName from "@/utils/services/profileData/getUserName.js";
import { setUserName } from "@store/session/userdata.slice.js";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const username = useSelector((state) => state.userdata.username);

  useEffect(() => {
    async function fetchUser() {
      const fetchedUsername = await getUserName();
      dispatch(setUserName(fetchedUsername));
    }

    fetchUser();
  }, [username]);

  /*=========== Window and Nav =============*/

  const [activeHeader, setActiveHeader] = useState(() => {
    return !isMobile;
  });
  const isNavOpen = useSelector((state) => state.navigation.isNavOpen);

  return (
    <>
      <header>
        <div className={styles.header}>
          <div className="header__profileContainer">
            <div className={styles.header__wrapper}>
              <div className={styles.header__logo}>
                <Link to="/profile/home">
                  <img
                    src={LogoHeader}
                    alt="LegpromRF"
                    width={135}
                    height={35}
                  />
                </Link>
              </div>
              <div
                onClick={() => setActiveHeader(!activeHeader)}
                className={
                  activeHeader
                    ? [styles.header__menuActive, styles.header__burger].join(
                        " "
                      )
                    : styles.header__burger
                }
              >
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            isNavOpen
              ? [styles.home__header, styles.home__header_open].join(" ")
              : [styles.home__header, styles.home__header_close].join(" ")
          }
        >
          <div className={[styles.home__welcome, styles.home__text].join(" ")}>
            Добро пожаловать{username ? `, ${username}!` : "!"}
          </div>
          <div className={styles.home__contacts}>
            <div className={styles.home__text_nowrap}>
              Обращайтесь! Тел: +7-958-111-4884
            </div>
            <div className={styles.home__links}>
              <a href={"https://wa.me/+79261894737"}>
                <img
                  className={styles.home__link}
                  src={"/icon/SocialMedia/whatsapp.png"}
                  alt={"whatsapp"}
                />
              </a>
              <a href={"https://t.me/LegpromRF_bot"}>
                <img
                  className={styles.home__link}
                  src={"/icon/SocialMedia/telegram.png"}
                  alt={"telegram"}
                />
              </a>
            </div>
          </div>
        </div>
      </header>
      <main className="page profile" style={{ backgroundColor: "#f4f4f4" }}>
        {
          // userRoll === 'Заказчик'
          //     ?
          <NavigationClient />
          // :
          // userRoll === 'Гость' ?
          // <NavigationGuest />
          // :
          // <NavigationPerformer />
        }

        <div className="page__profileContainer">
          <section className={isNavOpen ? styles.openMenu : styles.closeMenu}>
            {children}
          </section>
        </div>
      </main>

      <footer className={styles.footer}>
        {/*<div className="footer__profileContainer">*/}
        {/*  <div className={activeHeader ? [styles.footer__wrapper, styles.openMenu].join(' ') : [styles.footer__wrapper, styles.closeMenu].join(' ')}>*/}
        {/*    /!*<div className={styles.footer__content}>*!/*/}
        {/*    /!*  *!/*/}
        {/*    /!*  <div className={styles.footer__control}>*!/*/}
        {/*    /!*    /!*<div title="Меню" onClick={() => setActiveHeader(!activeHeader)} className={[styles.footer__contolButton, styles.footer__contolButton_collapse].join(' ')}>*!/*!/*/}
        {/*    /!*    /!*  {*!/*!/*/}
        {/*    /!*    /!*    activeHeader*!/*!/*/}
        {/*    /!*    /!*    ?*!/*!/*/}
        {/*    /!*    /!*    '«'*!/*!/*/}
        {/*    /!*    /!*    :*!/*!/*/}
        {/*    /!*    /!*    "»"*!/*!/*/}
        {/*    /!*    /!*  }*!/*!/*/}
        {/*    /!*    /!*</div>*!/*!/*/}
        {/*    /!*    /!*<div  className={styles.footer__contolButton}>*!/*!/*/}
        {/*    /!*    /!*  <span>Поддержка</span>*!/*!/*/}
        {/*    /!*    /!*  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">*!/*!/*/}
        {/*    /!*    /!*    <mask id="path-1-inside-1_973_37854" fill="white">*!/*!/*/}
        {/*    /!*    /!*      <path fillRule="evenodd" clipRule="evenodd" d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM7.9997 1.23096C4.26116 1.23096 1.23047 4.26164 1.23047 8.00019C1.23047 11.7387 4.26116 14.7694 7.9997 14.7694C11.7382 14.7694 14.7689 11.7387 14.7689 8.00019C14.7689 4.26164 11.7382 1.23096 7.9997 1.23096ZM8 10.4615C8.33987 10.4615 8.61539 10.7371 8.61539 11.0769C8.61539 11.4168 8.33987 11.6923 8 11.6923C7.66013 11.6923 7.38462 11.4168 7.38462 11.0769C7.38462 10.7371 7.66013 10.4615 8 10.4615ZM8.0006 4.30762C9.36007 4.30762 10.4621 5.40969 10.4621 6.76916C10.4621 7.87365 9.7347 8.80825 8.73278 9.11997L8.61599 9.15314V9.23069C8.61599 9.57056 8.34047 9.84608 8.0006 9.84608C7.68501 9.84608 7.4249 9.60852 7.38936 9.30246L7.38522 9.23069V8.61531C7.38522 8.29972 7.62278 8.03961 7.92883 8.00407L8.09245 7.99655C8.72929 7.94957 9.23137 7.41799 9.23137 6.76916C9.23137 6.08942 8.68034 5.53839 8.0006 5.53839C7.32087 5.53839 6.76983 6.08942 6.76983 6.76916C6.76983 7.10902 6.49431 7.38454 6.15445 7.38454C5.81458 7.38454 5.53906 7.10902 5.53906 6.76916C5.53906 5.40969 6.64113 4.30762 8.0006 4.30762Z"/>*!/*!/*/}
        {/*    /!*    /!*    </mask>*!/*!/*/}
        {/*    /!*    /!*    <path fillRule="evenodd" clipRule="evenodd" d="M8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0ZM7.9997 1.23096C4.26116 1.23096 1.23047 4.26164 1.23047 8.00019C1.23047 11.7387 4.26116 14.7694 7.9997 14.7694C11.7382 14.7694 14.7689 11.7387 14.7689 8.00019C14.7689 4.26164 11.7382 1.23096 7.9997 1.23096ZM8 10.4615C8.33987 10.4615 8.61539 10.7371 8.61539 11.0769C8.61539 11.4168 8.33987 11.6923 8 11.6923C7.66013 11.6923 7.38462 11.4168 7.38462 11.0769C7.38462 10.7371 7.66013 10.4615 8 10.4615ZM8.0006 4.30762C9.36007 4.30762 10.4621 5.40969 10.4621 6.76916C10.4621 7.87365 9.7347 8.80825 8.73278 9.11997L8.61599 9.15314V9.23069C8.61599 9.57056 8.34047 9.84608 8.0006 9.84608C7.68501 9.84608 7.4249 9.60852 7.38936 9.30246L7.38522 9.23069V8.61531C7.38522 8.29972 7.62278 8.03961 7.92883 8.00407L8.09245 7.99655C8.72929 7.94957 9.23137 7.41799 9.23137 6.76916C9.23137 6.08942 8.68034 5.53839 8.0006 5.53839C7.32087 5.53839 6.76983 6.08942 6.76983 6.76916C6.76983 7.10902 6.49431 7.38454 6.15445 7.38454C5.81458 7.38454 5.53906 7.10902 5.53906 6.76916C5.53906 5.40969 6.64113 4.30762 8.0006 4.30762Z" fill="#FAFAFA"/>*!/*!/*/}
        {/*    /!*    /!*    <path d="M8.73278 9.11997L8.78745 9.31242L8.7922 9.31094L8.73278 9.11997ZM8.61599 9.15314L8.56134 8.96076L8.41599 9.00204V9.15314H8.61599ZM7.38936 9.30246L7.18935 9.314L7.19069 9.32554L7.38936 9.30246ZM7.38522 9.23069H7.18488L7.18555 9.24221L7.38522 9.23069ZM7.92883 8.00407L7.91963 7.80379L7.90576 7.8054L7.92883 8.00407ZM8.09245 7.99655L8.10164 8.19642L8.10717 8.19601L8.09245 7.99655ZM8 0.2C12.3078 0.2 15.8 3.69218 15.8 8H16.2C16.2 3.47127 12.5287 -0.2 8 -0.2V0.2ZM15.8 8C15.8 12.3078 12.3078 15.8 8 15.8V16.2C12.5287 16.2 16.2 12.5287 16.2 8H15.8ZM8 15.8C3.69218 15.8 0.2 12.3078 0.2 8H-0.2C-0.2 12.5287 3.47127 16.2 8 16.2V15.8ZM0.2 8C0.2 3.69218 3.69218 0.2 8 0.2V-0.2C3.47127 -0.2 -0.2 3.47127 -0.2 8H0.2ZM7.9997 1.03096C4.1507 1.03096 1.03047 4.15119 1.03047 8.00019H1.43047C1.43047 4.3721 4.37161 1.43096 7.9997 1.43096V1.03096ZM1.03047 8.00019C1.03047 11.8492 4.1507 14.9694 7.9997 14.9694V14.5694C4.37161 14.5694 1.43047 11.6283 1.43047 8.00019H1.03047ZM7.9997 14.9694C11.8487 14.9694 14.9689 11.8492 14.9689 8.00019H14.5689C14.5689 11.6283 11.6278 14.5694 7.9997 14.5694V14.9694ZM14.9689 8.00019C14.9689 4.15119 11.8487 1.03096 7.9997 1.03096V1.43096C11.6278 1.43096 14.5689 4.3721 14.5689 8.00019H14.9689ZM8 10.6615C8.22941 10.6615 8.41538 10.8475 8.41538 11.0769H8.81538C8.81538 10.6266 8.45033 10.2615 8 10.2615V10.6615ZM8.41538 11.0769C8.41538 11.3063 8.22941 11.4923 8 11.4923V11.8923C8.45033 11.8923 8.81538 11.5272 8.81538 11.0769H8.41538ZM8 11.4923C7.77059 11.4923 7.58462 11.3063 7.58462 11.0769H7.18462C7.18462 11.5272 7.54968 11.8923 8 11.8923V11.4923ZM7.58462 11.0769C7.58462 10.8475 7.77059 10.6615 8 10.6615V10.2615C7.54968 10.2615 7.18462 10.6266 7.18462 11.0769H7.58462ZM8.0006 4.50762C9.24961 4.50762 10.2621 5.52014 10.2621 6.76916H10.6621C10.6621 5.29923 9.47053 4.10762 8.0006 4.10762V4.50762ZM10.2621 6.76916C10.2621 7.78361 9.59405 8.64255 8.67337 8.929L8.7922 9.31094C9.87534 8.97394 10.6621 7.9637 10.6621 6.76916H10.2621ZM8.67813 8.92758L8.56134 8.96076L8.67064 9.34553L8.78743 9.31236L8.67813 8.92758ZM8.41599 9.15314V9.23069H8.81599V9.15314H8.41599ZM8.41599 9.23069C8.41599 9.4601 8.23001 9.64608 8.0006 9.64608V10.0461C8.45093 10.0461 8.81599 9.68102 8.81599 9.23069H8.41599ZM8.0006 9.64608C7.78772 9.64608 7.61199 9.48576 7.58802 9.27939L7.19069 9.32554C7.23782 9.73127 7.5823 10.0461 8.0006 10.0461V9.64608ZM7.58902 9.29094L7.58488 9.21918L7.18555 9.24221L7.18969 9.31398L7.58902 9.29094ZM7.58522 9.23069V8.61531H7.18522V9.23069H7.58522ZM7.58522 8.61531C7.58522 8.40243 7.74553 8.2267 7.95191 8.20273L7.90576 7.8054C7.50003 7.85253 7.18522 8.19701 7.18522 8.61531H7.58522ZM7.93801 8.20385L8.10163 8.19634L8.08328 7.79676L7.91966 7.80428L7.93801 8.20385ZM8.10717 8.19601C8.84769 8.14137 9.43137 7.52352 9.43137 6.76916H9.03137C9.03137 7.31247 8.61089 7.75776 8.07774 7.79709L8.10717 8.19601ZM9.43137 6.76916C9.43137 5.97896 8.79079 5.33839 8.0006 5.33839V5.73839C8.56988 5.73839 9.03137 6.19988 9.03137 6.76916H9.43137ZM8.0006 5.33839C7.21041 5.33839 6.56983 5.97896 6.56983 6.76916H6.96983C6.96983 6.19988 7.43132 5.73839 8.0006 5.73839V5.33839ZM6.56983 6.76916C6.56983 6.99857 6.38386 7.18454 6.15445 7.18454V7.58454C6.60477 7.58454 6.96983 7.21948 6.96983 6.76916H6.56983ZM6.15445 7.18454C5.92504 7.18454 5.73906 6.99857 5.73906 6.76916H5.33906C5.33906 7.21948 5.70412 7.58454 6.15445 7.58454V7.18454ZM5.73906 6.76916C5.73906 5.52014 6.75159 4.50762 8.0006 4.50762V4.10762C6.53067 4.10762 5.33906 5.29923 5.33906 6.76916H5.73906Z" fill="#242424" mask="url(#path-1-inside-1_973_37854)"/>*!/*!/*/}
        {/*    /!*    /!*  </svg>*!/*!/*/}
        {/*    /!*    /!*</div>*!/*!/*/}
        {/*    /!*  </div>*!/*/}
        {/*    /!*</div>*!/*/}
        {/*    /!*<div className={styles.footer__logo}>*!/*/}
        {/*    /!*  <Image *!/*/}
        {/*    /!*    src={LogoFooter} *!/*/}
        {/*    /!*    alt="LegpromRF"  *!/*/}
        {/*    /!*    width={135} *!/*/}
        {/*    /!*    height={35}*!/*/}
        {/*    /!*  />*!/*/}
        {/*    /!*</div>*!/*/}
        {/*  </div>*/}
        {/*</div>*/}
      </footer>
    </>
  );
};

export default Layout;
