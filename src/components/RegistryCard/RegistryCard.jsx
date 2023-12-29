import styles from "./RegistryCard.module.scss";

import Img1 from "public/Landing/card_img_1.png";
import { useState } from "react";

const RegistryCard = ({
  title,
  number,
  edition,
  datePublic,
  dateChange,
  budget,
  region,
  alt,
  status,
}) => {
  const [activeMenu, setActiveMenu] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.card__wrapper}>
        <Image src={Img1} alt="Фото изделия" width={100} height={153} />

        <div className={styles.card__head}>
          <h4 className={styles.card__title}>{title}</h4>
          <p className={styles.card__number}>{number}</p>
        </div>
        <div className={styles.card__body}>
          <div className={styles.card__item}>
            <div className={styles.card__itemTitle}>Тираж</div>
            <div className={styles.card__itemInfo}>{edition} шт.</div>
          </div>
          <div className={styles.card__item}>
            <div className={styles.card__itemTitle}>Опубликовано</div>
            <div className={styles.card__itemInfo}>{datePublic}</div>
          </div>
          <div className={styles.card__item}>
            <div className={styles.card__itemTitle}>Бюджет</div>
            <div className={styles.card__itemInfo}>{budget} ₽</div>
          </div>
          <div className={styles.card__item}>
            <div className={styles.card__itemTitle}>Сдача</div>
            <div className={styles.card__itemInfo}>{dateChange}</div>
          </div>
          <div className={styles.card__item}>
            <div className={styles.card__itemTitle}>Регион доставки</div>
            <div className={styles.card__itemInfo}>{region}</div>
          </div>
        </div>
        <div className={styles.card__footer}>
          <div className={styles.card__link}>
            <Link className={styles.card__selection} href="/profile/checkTz">
              Подбор исполнителя
            </Link>
          </div>
          <div className={styles.card__status}>
            {status === "В работе" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  d="M0 0L42.0455 0C46.4386 0 50 3.56137 50 7.95455L50 50L0 0Z"
                  fill="#EBEBEB"
                />
                <path
                  d="M50 50L7.95454 50C3.56137 50 4.76837e-07 46.4386 4.76837e-07 42.0455L4.76837e-07 4.76837e-07L50 50Z"
                  fill="#DADADA"
                />
                <circle cx="24.4318" cy="24.4318" r="7.38636" fill="white" />
                <path
                  d="M0 0L43 0C46.866 0 50 3.13401 50 7L50 50L0 0Z"
                  fill="#0036FF"
                />
                <path
                  d="M50 50L7 50C3.13401 50 0 46.866 0 43L0 0L50 50Z"
                  fill="#002BCD"
                />
                <circle cx="25" cy="25" r="8" fill="white" />
              </svg>
            ) : status === "Закончен" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  d="M0 0L43 0C46.866 0 50 3.13401 50 7L50 50L0 0Z"
                  fill="#00B334"
                />
                <path
                  d="M50 50L7 50C3.13401 50 0 46.866 0 43L0 0L50 50Z"
                  fill="#00902A"
                />
                <circle cx="25" cy="25" r="8" fill="white" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50"
                height="50"
                viewBox="0 0 50 50"
                fill="none"
              >
                <path
                  d="M0 0L42.0455 0C46.4386 0 50 3.56137 50 7.95455L50 50L0 0Z"
                  fill="#EBEBEB"
                />
                <path
                  d="M50 50L7.95454 50C3.56137 50 4.76837e-07 46.4386 4.76837e-07 42.0455L4.76837e-07 4.76837e-07L50 50Z"
                  fill="#DADADA"
                />
                <circle cx="24.4318" cy="24.4318" r="7.38636" fill="white" />
                <path
                  d="M0 0L43 0C46.866 0 50 3.13401 50 7L50 50L0 0Z"
                  fill="#FF0A00"
                />
                <path
                  d="M50 50L7 50C3.13401 50 0 46.866 0 43L0 0L50 50Z"
                  fill="#CD0A02"
                />
                <circle cx="25" cy="25" r="8" fill="white" />
              </svg>
            )}
          </div>
          <div
            onClick={() => setActiveMenu(!activeMenu)}
            className={styles.card__control}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
            >
              <path
                d="M0 50L0 7C0 3.13401 3.13401 0 7 0L50 0L0 50Z"
                fill="#242424"
              />
              <path
                d="M50 0L50 43C50 46.866 46.866 50 43 50L0 50L50 0Z"
                fill="#242424"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25 17C29.4177 17 33 20.5823 33 25C33 29.4177 29.4177 33 25 33C20.5814 33 17 29.4177 17 25C17 20.5823 20.5814 17 25 17Z"
                stroke="#FAFAFA"
                strokeWidth="1.28"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.1257 26.0349C20.554 26.0349 20.0896 25.5704 20.0896 24.9996C20.0896 24.4288 20.554 23.9635 21.1257 23.9635C21.6974 23.9635 22.1618 24.4288 22.1618 24.9996C22.1618 25.5704 21.6974 26.0349 21.1257 26.0349"
                fill="#FAFAFA"
              />
              <path
                d="M24.9997 26.0349C24.428 26.0349 23.9635 25.5704 23.9635 24.9996C23.9635 24.4288 24.428 23.9635 24.9997 23.9635C25.5713 23.9635 26.0358 24.4288 26.0358 24.9996C26.0358 25.5704 25.5713 26.0349 24.9997 26.0349"
                fill="#FAFAFA"
              />
              <path
                d="M28.8747 26.0349C28.303 26.0349 27.8385 25.5704 27.8385 24.9996C27.8385 24.4288 28.303 23.9635 28.8747 23.9635C29.4463 23.9635 29.9108 24.4288 29.9108 24.9996C29.9108 25.5704 29.4463 26.0349 28.8747 26.0349"
                fill="#FAFAFA"
              />
            </svg>
          </div>
          <div
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
                <span>Подробнее</span>
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
                <span>Отправить предложение</span>
              </Link>
              <Link href="/" className={styles.card__itemMenu}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="12"
                  viewBox="0 0 10 12"
                  fill="none"
                >
                  <circle
                    cx="5.30594"
                    cy="3.34439"
                    r="2.66458"
                    stroke="#FF0A00"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1.08021 9.7143C1.07949 9.52698 1.12139 9.34195 1.20272 9.17321C1.45795 8.66276 2.17769 8.39221 2.77492 8.2697C3.20565 8.17779 3.64232 8.11638 4.08169 8.08594C4.89515 8.01448 5.71331 8.01448 6.52678 8.08594C6.96611 8.11673 7.40276 8.17813 7.83354 8.2697C8.43078 8.39221 9.15052 8.63723 9.40575 9.17321C9.56931 9.51718 9.56931 9.91651 9.40575 10.2605C9.15052 10.7965 8.43078 11.0415 7.83354 11.1589C7.40332 11.2546 6.9665 11.3177 6.52678 11.3478C5.86469 11.4039 5.1995 11.4141 4.536 11.3784C4.38286 11.3784 4.23483 11.3784 4.08169 11.3478C3.64362 11.3181 3.20846 11.255 2.78003 11.1589C2.17769 11.0415 1.46305 10.7965 1.20272 10.2605C1.1218 10.0898 1.07995 9.9032 1.08021 9.7143Z"
                    stroke="#FF0A00"
                    strokeWidth="0.804"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.card__red}>Убрать из выдачи</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistryCard;
