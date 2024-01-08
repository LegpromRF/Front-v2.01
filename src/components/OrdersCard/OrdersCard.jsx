import { Link } from "react-router-dom";
import styles from "./OrdersCard.module.scss";
import { useState } from "react";

const id = 544 //TODO

const OrdersCard = ({ title, number, status, href }) => {
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.card__body}>
        <div className={styles.card__title}>
          <h2>{title}</h2>
        </div>
        <div className={styles.card__number}>Брючная одежда </div>
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
                  fill="#002BCD"
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
          <div className={styles.card__selection}>22.12.2024</div>
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
              <Link to={`/profile/order/edit/${id}`} className={styles.card__itemMenu}>
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
                <span>Редактировать</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersCard;
