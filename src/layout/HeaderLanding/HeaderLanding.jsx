import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { links } from "./menu.data.js";
import Logo from "@/../public/Logo/logo.png";
import styles from "./HeaderLanding.module.scss";

const HeaderLanding = () => {
  const auth = Cookies.get("uuid_user");

  return (
    <header className={styles.header}>
      <div className="header__container">
        <div className={styles.header__wrapper}>
          <div className={styles.header__navBar}>
            <div className={styles.header__logo}>
              <Link to="/">
                <img src={Logo} alt="LegpromRF" width={135} height={35} />
              </Link>
            </div>
            {/* <div
              onClick={() => setActiveMenu(!activeMenu)}
              className={
                activeMenu
                  ? [styles.header__burger, styles.header__menuActive].join(" ")
                  : styles.header__burger
              }
            >
              <span></span>
            </div> */}
          </div>
          <div className={styles.header__content}>
            <div className={styles.header__menu}>
              <nav className={styles.header__nav}>
                <ul className={styles.header__list}>
                  {links.map((link, index) => {
                    return (
                      <li className={styles.header__item} key={index}>
                        <Link to={link.href} className={styles.header__link}>
                          {link.nameViews}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            <div className={styles.header__button}>
              <div className={styles.header__question}>
                <Link to="/nolayout">Задать вопрос</Link>
              </div>
              {auth ? (
                <Link className={styles.header__login} to={"/profile"}>
                  Личный кабинет
                </Link>
              ) : (
                <Link className={styles.header__login} to={"/auth"}>
                  Авторизация
                </Link>
              )}
              {/* <ModalAuth /> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeaderLanding;
