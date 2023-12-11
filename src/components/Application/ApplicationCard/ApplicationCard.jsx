import styles from "./ApplicationCard.module.scss";
import ApplicationMainContent from "./ApplicationMainContent/ApplicationMainContent";
import ApplicationSlider from "./ApplicationSlider/ApplicationSlider";

const ApplicationCard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.mainContentWrapper}>
        <div className={styles.slider}>
          <ApplicationSlider />
        </div>

        <div className={styles.mainContent}>
          <ApplicationMainContent />
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;
