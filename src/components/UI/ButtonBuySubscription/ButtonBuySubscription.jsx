import styles from "./ButtonBuySubscription.module.scss";

const ButtonBuySubscription = ({ price, style, onClick }) => {
  return (
    <button className={styles.btn} style={style} onClick={onClick}>
      Купить подписку
      <span>{price} руб/мес.</span>
    </button>
  );
};

export default ButtonBuySubscription;
