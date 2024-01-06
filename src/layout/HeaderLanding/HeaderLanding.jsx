import { Link } from "react-router-dom";
import Logo from "@/../public/Logo/logo.png";
import styles from "./HeaderLanding.module.scss";
import { useState } from "react";
import HeaderContent from "./HeaderContent.jsx";

const HeaderLanding = () => {
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className="header__container">
          <div className={styles.header__wrapper}>
            <div className={styles.header__navBar}>
              <div className={styles.header__logo}>
                <Link to="/">
                  <img src={Logo} alt="LegpromRF" width={135} height={35} />
                </Link>
              </div>
              <div
                onClick={() => setActiveMenu(!activeMenu)}
                className={
                  activeMenu
                    ? [styles.header__burger, styles.header__menuActive].join(
                        " "
                      )
                    : styles.header__burger
                }
              >
                <span></span>
              </div>
            </div>
            <HeaderContent activeMenu={activeMenu} isFullscreen={false} />
          </div>
        </div>
      </header>
      <HeaderContent activeMenu={activeMenu} isFullscreen={true} />
    </>
  );
};

export default HeaderLanding;
