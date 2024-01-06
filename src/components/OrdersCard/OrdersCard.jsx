import styles from "./OrdersCard.module.scss";
import { useState } from "react";

const OrdersCard = ({ title, number, status, href }) => {
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.card__body}>
        <div className={styles.card__title}>
          <Link href={href}>{title}</Link>
        </div>
        <div className={styles.card__number}>{number}</div>
        <div className={styles.card__footer}>
          <div className={styles.card__status}>
            {status == "В работе" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <path
                  d="M0 0H37C40.866 0 44 3.13401 44 7V44L0 0Z"
                  fill="#0036FF"
                />
                <path
                  d="M44 44H7C3.13401 44 0 40.866 0 37V0L44 44Z"
                  fill="#002BCD"
                />
                <circle cx="21.5" cy="21.5" r="6.5" fill="white" />
                <path
                  d="M0 0H37C40.866 0 44 3.13401 44 7V44L0 0Z"
                  fill="#0036FF"
                />
                <path
                  d="M44 44H7C3.13401 44 0 40.866 0 37V0L44 44Z"
                  ffill="#002BCD"
                />
                <circle cx="21.5" cy="21.5" r="6.5" fill="white" />
              </svg>
            ) : status == "Закончен" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <path
                  d="M0 0H37C40.866 0 44 3.13401 44 7V44L0 0Z"
                  fill="#00B334"
                />
                <path
                  d="M44 44H7C3.13401 44 0 40.866 0 37V0L44 44Z"
                  fill="#00902A"
                />
                <circle cx="21.5" cy="21.5" r="6.5" fill="white" />
                <path
                  d="M0 0H37C40.866 0 44 3.13401 44 7V44L0 0Z"
                  fill="#00B334"
                />
                <path
                  d="M44 44H7C3.13401 44 0 40.866 0 37V0L44 44Z"
                  fill="#00902A"
                />
                <circle cx="21.5" cy="21.5" r="6.5" fill="white" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="44"
                height="44"
                viewBox="0 0 44 44"
                fill="none"
              >
                <path
                  d="M0 0H37C40.866 0 44 3.13401 44 7V44L0 0Z"
                  fill="#FF0A00"
                />
                <path
                  d="M44 44H7C3.13401 44 0 40.866 0 37V0L44 44Z"
                  fill="#CD0A02"
                />
                <circle cx="21.5" cy="21.5" r="6.5" fill="white" />
                <path
                  d="M0 0H37C40.866 0 44 3.13401 44 7V44L0 0Z"
                  fill="#FF0A00"
                />
                <path
                  d="M44 44H7C3.13401 44 0 40.866 0 37V0L44 44Z"
                  fill="#CD0A02"
                />
                <circle cx="21.5" cy="21.5" r="6.5" fill="white" />
              </svg>
            )}
          </div>
          <div className={styles.card__selection}>Подбор исполнителя</div>
          {activeMenu ? (
            <div
              onClick={() => setActiveMenu(!activeMenu)}
              className={styles.card__additionally}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.5 1C12.6416 1 16 4.35838 16 8.5C16 12.6416 12.6416 16 8.5 16C4.35757 16 1 12.6416 1 8.5C1 4.35838 4.35757 1 8.5 1Z"
                  stroke="#0036FF"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.86784 9.47021C4.33189 9.47021 3.89648 9.03481 3.89648 8.49967C3.89648 7.96454 4.33189 7.52832 4.86784 7.52832C5.40378 7.52832 5.83919 7.96454 5.83919 8.49967C5.83919 9.03481 5.40378 9.47021 4.86784 9.47021Z"
                  fill="#0036FF"
                />
                <path
                  d="M8.4987 9.47021C7.96275 9.47021 7.52734 9.03481 7.52734 8.49967C7.52734 7.96454 7.96275 7.52832 8.4987 7.52832C9.03464 7.52832 9.47005 7.96454 9.47005 8.49967C9.47005 9.03481 9.03464 9.47021 8.4987 9.47021Z"
                  fill="#0036FF"
                />
                <path
                  d="M12.1315 9.47021C11.5956 9.47021 11.1602 9.03481 11.1602 8.49967C11.1602 7.96454 11.5956 7.52832 12.1315 7.52832C12.6675 7.52832 13.1029 7.96454 13.1029 8.49967C13.1029 9.03481 12.6675 9.47021 12.1315 9.47021Z"
                  fill="#0036FF"
                />
              </svg>
            </div>
          ) : (
            <div
              onClick={() => setActiveMenu(!activeMenu)}
              className={styles.card__additionally}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="17"
                height="17"
                viewBox="0 0 17 17"
                fill="none"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.5 1C12.6416 1 16 4.35838 16 8.5C16 12.6416 12.6416 16 8.5 16C4.35757 16 1 12.6416 1 8.5C1 4.35838 4.35757 1 8.5 1Z"
                  stroke="#242424"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.86784 9.47021C4.33189 9.47021 3.89648 9.03481 3.89648 8.49967C3.89648 7.96454 4.33189 7.52832 4.86784 7.52832C5.40378 7.52832 5.83919 7.96454 5.83919 8.49967C5.83919 9.03481 5.40378 9.47021 4.86784 9.47021Z"
                  fill="#242424"
                />
                <path
                  d="M8.4987 9.47021C7.96275 9.47021 7.52734 9.03481 7.52734 8.49967C7.52734 7.96454 7.96275 7.52832 8.4987 7.52832C9.03464 7.52832 9.47005 7.96454 9.47005 8.49967C9.47005 9.03481 9.03464 9.47021 8.4987 9.47021Z"
                  fill="#242424"
                />
                <path
                  d="M12.1315 9.47021C11.5956 9.47021 11.1602 9.03481 11.1602 8.49967C11.1602 7.96454 11.5956 7.52832 12.1315 7.52832C12.6675 7.52832 13.1029 7.96454 13.1029 8.49967C13.1029 9.03481 12.6675 9.47021 12.1315 9.47021Z"
                  fill="#242424"
                />
              </svg>
            </div>
          )}
          <div
            onMouseEnter={() => setActiveMenu(true)}
            className={
              activeMenu
                ? [styles.card__menu, styles.card__menuActive].join(" ")
                : styles.card__menu
            }
          >
            <div className={styles.card__wrapperMenu}>
              <Link href="/profile/checkTz" className={styles.card__itemMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="12"
                  viewBox="0 0 11 12"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.86131 0.727539H2.97776C1.77586 0.727539 0.739746 1.70178 0.739746 2.90426V9.15775C0.739746 10.4279 1.70815 11.4407 2.97776 11.4407H7.64117C8.84365 11.4407 9.81789 10.3608 9.81789 9.15775V3.80729L6.86131 0.727539Z"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.70959 0.719727V2.41779C6.70959 3.24669 7.3803 3.91914 8.20861 3.92089C8.97738 3.92265 9.76366 3.92323 9.81678 3.91973"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.59765 8.19616H3.44727"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.40626 5.30639H3.44727"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Отправить по своей базе</span>
              </Link>
              <Link href="/" className={styles.card__itemMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="11"
                  height="13"
                  viewBox="0 0 11 13"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M6.86072 1.22656H2.97776C1.77586 1.22656 0.739746 2.20081 0.739746 3.40329V9.73616C0.739746 11.0064 1.70757 11.9397 2.97776 11.9397H7.64059C8.84307 11.9397 9.81789 10.9386 9.81789 9.73616V4.30631L6.86072 1.22656Z"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.70691 1.21973V2.91779C6.70691 3.74669 7.37761 4.41914 8.20651 4.42089C8.97469 4.42265 9.76098 4.42323 9.8141 4.41973"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M6.60255 7.15319H3.7417"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5.17199 8.58351V5.72266"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Дублировать ТЗ</span>
              </Link>
              <Link href="/" className={styles.card__itemMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.39661 1.05957H10.1475C10.8719 1.05957 11.4596 1.65233 11.4596 2.38359V4.14913C11.4596 4.87983 10.8719 5.47315 10.1475 5.47315H8.39661C7.67164 5.47315 7.08398 4.87983 7.08398 4.14913V2.38359C7.08398 1.65233 7.67164 1.05957 8.39661 1.05957Z"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.05286 1.05957H3.8032C4.52816 1.05957 5.11582 1.65233 5.11582 2.38359V4.14913C5.11582 4.87983 4.52816 5.47315 3.8032 5.47315H2.05286C1.32789 5.47315 0.740234 4.87983 0.740234 4.14913V2.38359C0.740234 1.65233 1.32789 1.05957 2.05286 1.05957Z"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2.05286 7.36523H3.8032C4.52816 7.36523 5.11582 7.958 5.11582 8.68981V10.4548C5.11582 11.1861 4.52816 11.7788 3.8032 11.7788H2.05286C1.32789 11.7788 0.740234 11.1861 0.740234 10.4548V8.68981C0.740234 7.958 1.32789 7.36523 2.05286 7.36523Z"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.39661 7.36523H10.1475C10.8719 7.36523 11.4596 7.958 11.4596 8.68981V10.4548C11.4596 11.1861 10.8719 11.7788 10.1475 11.7788H8.39661C7.67164 11.7788 7.08398 11.1861 7.08398 10.4548V8.68981C7.08398 7.958 7.67164 7.36523 8.39661 7.36523Z"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Опубликовать в реестр</span>
              </Link>
              <Link href="/" className={styles.card__itemMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="13"
                  viewBox="0 0 10 13"
                  fill="none"
                >
                  <circle
                    cx="5.30521"
                    cy="3.564"
                    r="2.66458"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.08009 9.9339C1.07937 9.74658 1.12126 9.56156 1.2026 9.39282C1.45782 8.88236 2.17757 8.61182 2.7748 8.48931C3.20553 8.39739 3.6422 8.33599 4.08157 8.30554C4.89503 8.23409 5.71319 8.23409 6.52665 8.30554C6.96599 8.33634 7.40264 8.39774 7.83342 8.48931C8.43066 8.61182 9.1504 8.85684 9.40563 9.39282C9.56919 9.73679 9.56919 10.1361 9.40563 10.4801C9.1504 11.0161 8.43066 11.2611 7.83342 11.3785C7.4032 11.4742 6.96637 11.5374 6.52665 11.5674C5.86456 11.6235 5.19938 11.6337 4.53588 11.598C4.38274 11.598 4.23471 11.598 4.08157 11.5674C3.6435 11.5377 3.20834 11.4746 2.77991 11.3785C2.17757 11.2611 1.46293 11.0161 1.2026 10.4801C1.12168 10.3094 1.07983 10.1228 1.08009 9.9339Z"
                    stroke="#242424"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Подобрать исполнителя</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersCard;
