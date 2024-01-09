import { useSelector } from "react-redux";
import ButtonBuySubscription from "../../components/UI/ButtonBuySubscription/ButtonBuySubscription";
import styles from "./HeaderApplication.module.scss";
import PurchaseModal from "@/components/PurchaseModal/PurchaseModal";
import { useState } from "react";
import ButtonAction from "../../components/UI/ButtonAction/ButtonAction";
import { useNavigate } from "react-router-dom";

const HeaderApplication = () => {
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const { item } = useSelector((state) => state.viewTz);

  const openPurchaseModal = () => setPurchaseModalOpen(true);
  const closePurchaseModal = () => setPurchaseModalOpen(false);
  const { isAdmin } = useSelector((state) => state.admindata);
  const navigate = useNavigate();

  return (
    <div className={styles.header}>
      <p className={styles.title}>
        Заявка № {item.order_number} {item.order_name || "-"}
      </p>

      <div className={styles.headerContent}>
        {isAdmin && (
          <ButtonAction
            title="Редактировать"
            icon={
              <img
                src="/icon/edit-icon.svg"
                alt="edit"
                width={11}
                height={10}
              />
            }
            onClick={() => {
              navigate(`/profile/order/edit/${item.order_number}`);
            }}
          />
        )}
        <ButtonAction
          title="Распечатать"
          icon={
            <img src="/icon/edit-icon.svg" alt="edit" width={11} height={10} />
          }
        />
        <ButtonAction
          title="Поделиться"
          icon={
            <img
              src="/icon/import-icon.svg"
              alt="edit"
              width={10}
              height={12}
            />
          }
        />
      </div>

      <div className={styles.btnBuyWrapper}>
        <ButtonBuySubscription price={2900} onClick={openPurchaseModal} />
      </div>

      <PurchaseModal isOpen={isPurchaseModalOpen} close={closePurchaseModal} />
    </div>
  );
};

export default HeaderApplication;

