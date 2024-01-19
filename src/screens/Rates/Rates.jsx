import PurchaseModal from "@/components/PurchaseModal/PurchaseModal";
import { Link } from "react-router-dom";
import styles from "./Rates.module.css";
import { useState } from "react";

const Rates = () => {
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);

  const openPurchaseModal = () => setPurchaseModalOpen(true);
  const closePurchaseModal = () => setPurchaseModalOpen(false);

  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Тарифы</h1>
        <div className={styles.infoBlock}>
          <p className={styles.subtitle}>
            <span className={styles.subtitle__main}>Подписка для фабрик</span>
            Стоимость 4800 руб/мес
          </p>
          <button className={styles.buyBtn} onClick={openPurchaseModal}>Купить</button>
        </div>
        <p className={styles.comment}>
          По любым вопросам пишите Админу{" "}
          <Link to="https://t.me/LegpromRF_bot" target="_blank">
            https://t.me/LegpromRF_bot
          </Link>
        </p>
      </div>
      <PurchaseModal isOpen={isPurchaseModalOpen} close={closePurchaseModal} />
    </>
  );
};
export default Rates;
