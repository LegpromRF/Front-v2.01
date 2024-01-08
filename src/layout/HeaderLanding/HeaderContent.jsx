import { links } from "./menu.data.js";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./HeaderLanding.module.scss";

const HeaderContent = ({ activeMenu, isFullscreen }) => {
  const auth = Cookies.get("uuid_user");

  return (
    <div
      className={`${styles.header__content} ${
        activeMenu ? styles.header__menuActive : ""
      } ${
        isFullscreen
          ? styles.header__content_fullscreen
          : styles.header__content_builtin
      }`}
    >
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
  );
};
export default HeaderContent;
