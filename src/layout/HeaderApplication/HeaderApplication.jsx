import { useSelector } from "react-redux";
import ButtonBuySubscription from "../../components/UI/ButtonBuySubscription/ButtonBuySubscription";
import styles from "./HeaderApplication.module.scss";
import PurchaseModal from "@/components/PurchaseModal/PurchaseModal";
import { useEffect, useState } from "react";
import ButtonAction from "../../components/UI/ButtonAction/ButtonAction";
import { useNavigate } from "react-router-dom";
import {
  TelegramIcon,
  TelegramShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const HeaderApplication = ({ printContentRef }) => {
  const navigate = useNavigate();
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(false);
  const [isShareButtonsOpen, setShareButtonsOpen] = useState(false);
  const { item } = useSelector((state) => state.viewTz);
  const { isAdmin } = useSelector((state) => state.admindata);

  const openPurchaseModal = () => setPurchaseModalOpen(true);
  const closePurchaseModal = () => setPurchaseModalOpen(false);

  const handlePrint = () => {
    if (!printContentRef.current) return

    const printContents = printContentRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  useEffect(() => {
    const clickHandler = (event) => {
      const isButtonsAreaClick = Boolean(event.target?.closest('#viewtz-share-area'))
      if (!isButtonsAreaClick) setShareButtonsOpen(false)
    }
      
    document.addEventListener('click', clickHandler)
      return () => {
        document.removeEventListener('click', clickHandler)
      }
  }, [])

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
          onClick={handlePrint}
        />
        <div className={styles.shareContainer} id="viewtz-share-area">
          <div className={`${styles.shareButtonsWrapper} ${isShareButtonsOpen ? styles.shareButtonsWrapper_active : ''}`}>
            <div className={styles.shareButtons}>
              <VKShareButton url={window.location.href}>
                <VKIcon size={28} round />
              </VKShareButton>
              <TelegramShareButton url={window.location.href}>
                <TelegramIcon size={28} round />
              </TelegramShareButton>
              <WhatsappShareButton url={window.location.href}>
                <WhatsappIcon size={28} round />
              </WhatsappShareButton>
            </div>
          </div>
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
            onClick={() => setShareButtonsOpen(prev => !prev)}
          />
        </div>
      </div>

      <div className={styles.btnBuyWrapper}>
        <ButtonBuySubscription price={4800} onClick={openPurchaseModal} />
      </div>

      <PurchaseModal isOpen={isPurchaseModalOpen} close={closePurchaseModal} />
    </div>
  );
};

export default HeaderApplication;
