import styles from "./ButtonBuySubscription.module.scss";

const ButtonBuySubscription = ({ price, style }) => {
  return (
    <button className={styles.btn} style={style}>
      Купить подписку
      <span>{price} руб/мес.</span>
    </button>
  );
};

export default ButtonBuySubscription;
