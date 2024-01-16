import { Link } from "react-router-dom";
import styles from "./OrdersCard.module.scss";
import { useState } from "react";

const id = 544;

const OrdersCard = ({
  id,
  name,
  imagePreviewSrc,
  status,
  createDate,
  clothesType,
  budget,
  count,
  isVerified,
}) => {
  return (
    <div className={styles.card}>
      <div className={styles.card__options}>
        <span className={styles["card__options-edit"]}>
          <Link to={`/profile/order/edit/${id}`}>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              width={20}
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M9.65661 17L6.99975 17L6.99975 14M6.10235 14.8974L17.4107 3.58902C18.1918 2.80797 19.4581 2.80797 20.2392 3.58902C21.0202 4.37007 21.0202 5.6364 20.2392 6.41745L8.764 17.8926C8.22794 18.4287 7.95992 18.6967 7.6632 18.9271C7.39965 19.1318 7.11947 19.3142 6.8256 19.4723C6.49475 19.6503 6.14115 19.7868 5.43395 20.0599L3 20.9998L3.78312 18.6501C4.05039 17.8483 4.18403 17.4473 4.3699 17.0729C4.53497 16.7404 4.73054 16.424 4.95409 16.1276C5.20582 15.7939 5.50466 15.4951 6.10235 14.8974Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>
          </Link>
          <div className={styles["card__info-bubble"]}>Редактировать</div>
        </span>
        {isVerified && (
          <span>
            <svg
              fill="#0036FF"
              viewBox="0 0 512 512"
              id="_x30_1"
              version="1.1"
              width={18}
              xmlSpace="preserve"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M434.068,46.758L314.607,9.034C295.648,3.047,275.883,0,256,0s-39.648,3.047-58.607,9.034L77.932,46.758 C52.97,54.641,36,77.796,36,103.973v207.39c0,38.129,18.12,73.989,48.816,96.607l117.032,86.234 C217.537,505.764,236.513,512,256,512s38.463-6.236,54.152-17.796l117.032-86.234C457.88,385.352,476,349.492,476,311.363v-207.39 C476,77.796,459.03,54.641,434.068,46.758z M347.924,227.716l-98.995,98.995c-11.716,11.716-30.711,11.716-42.426,0l-42.427-42.426 c-11.716-11.716-11.716-30.711,0-42.426l0,0c11.716-11.716,30.711-11.716,42.426,0l21.213,21.213l77.782-77.782 c11.716-11.716,30.711-11.716,42.426,0h0C359.64,197.005,359.64,216,347.924,227.716z"></path>
              </g>
            </svg>
            <div className={styles["card__info-bubble"]}>
              Проверено администартором
            </div>
          </span>
        )}
      </div>
      <div className={styles.card__body}>
        <h2 className={`${styles.card__title} ${styles["card__title_body"]}`}>
          <Link to={`/profile/order/view_tz/${id}`}>{name}</Link>
        </h2>
        <div className={styles.card__content}>
          <div className={styles.card__image}>
            <img src={imagePreviewSrc} alt="" />
          </div>
          <div>
            <div className={styles.card__head}>
              <div className={styles["card__title-area"]}>
                <h2
                  className={`${styles.card__title} ${styles["card__title_content"]}`}
                >
                  <Link to={`/profile/order/view_tz/${id}`}>{name}</Link>
                </h2>
                <span className={styles.card__date}>{status}</span>
                <div className={styles['card__content-icons']}>
                  <Link to={`/profile/order/edit/${id}`} state={{ prevPath: location.pathname }}>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      width={20}
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></g>
                      <g id="SVGRepo_iconCarrier">
                        <path
                          d="M9.65661 17L6.99975 17L6.99975 14M6.10235 14.8974L17.4107 3.58902C18.1918 2.80797 19.4581 2.80797 20.2392 3.58902C21.0202 4.37007 21.0202 5.6364 20.2392 6.41745L8.764 17.8926C8.22794 18.4287 7.95992 18.6967 7.6632 18.9271C7.39965 19.1318 7.11947 19.3142 6.8256 19.4723C6.49475 19.6503 6.14115 19.7868 5.43395 20.0599L3 20.9998L3.78312 18.6501C4.05039 17.8483 4.18403 17.4473 4.3699 17.0729C4.53497 16.7404 4.73054 16.424 4.95409 16.1276C5.20582 15.7939 5.50466 15.4951 6.10235 14.8974Z"
                          stroke="#000000"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </g>
                    </svg>
                  </Link>
                  {isVerified && <svg
                    fill="#0036FF"
                    viewBox="0 0 512 512"
                    id="_x30_1"
                    version="1.1"
                    width={18}
                    xmlSpace="preserve"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <path d="M434.068,46.758L314.607,9.034C295.648,3.047,275.883,0,256,0s-39.648,3.047-58.607,9.034L77.932,46.758 C52.97,54.641,36,77.796,36,103.973v207.39c0,38.129,18.12,73.989,48.816,96.607l117.032,86.234 C217.537,505.764,236.513,512,256,512s38.463-6.236,54.152-17.796l117.032-86.234C457.88,385.352,476,349.492,476,311.363v-207.39 C476,77.796,459.03,54.641,434.068,46.758z M347.924,227.716l-98.995,98.995c-11.716,11.716-30.711,11.716-42.426,0l-42.427-42.426 c-11.716-11.716-11.716-30.711,0-42.426l0,0c11.716-11.716,30.711-11.716,42.426,0l21.213,21.213l77.782-77.782 c11.716-11.716,30.711-11.716,42.426,0h0C359.64,197.005,359.64,216,347.924,227.716z"></path>
                    </g>
                  </svg>}
                </div>
              </div>
              <span className={styles.card__number}>№ {id}</span>
            </div>
            <div className={styles["card__info-area"]}>
              <div
                className={`${styles.card__info} ${styles["card__info_clothes-type"]}`}
              >
                <div className={styles["card__info-name"]}>Тип одежды</div>
                <div
                  className={`${styles["card__info-value"]} ${
                    clothesType ? "" : styles["card__info-value_empty"]
                  }`}
                >
                  {clothesType || ""}
                </div>
              </div>
              <div className={styles.card__info}>
                <div className={styles["card__info-name"]}>Создана</div>
                <div
                  className={`${styles["card__info-value"]} ${
                    createDate ? "" : styles["card__info-value_empty"]
                  }`}
                >
                  {createDate || ""}
                </div>
              </div>
              <div className={styles.card__info}>
                <div className={styles["card__info-name"]}>Бюджет</div>
                <div className={`${styles["card__info-value"]}`}>
                  {Number(budget || 0).toLocaleString()} ₽
                </div>
              </div>
              <div className={styles.card__info}>
                <div className={styles["card__info-name"]}>Количество</div>
                <div
                  className={`${styles["card__info-value"]} ${
                    !isNaN(count) ? "" : styles["card__info-value_empty"]
                  }`}
                >
                  {count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersCard;
