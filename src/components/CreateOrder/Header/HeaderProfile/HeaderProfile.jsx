import { useDispatch, useSelector } from "react-redux";
import { setCurrentStage } from "../../../../store/orderForm/form.slice";
import styles from "./HeaderProfile.module.scss";
import { useCallback } from "react";

const HeaderProfile = ({ title, stage, done, active }) => {
  const dispatch = useDispatch();
  const availableStages = useSelector((store) => store.form.availableStages);
  const isStageAvailable = +stage <= availableStages;
  const handleClick = useCallback(() => {
    if (isStageAvailable) dispatch(setCurrentStage(stage));
  }, [isStageAvailable, stage]);

  // const blockClassName = done ? [styles.header__itemNumber, styles.header__itemNumber_done].join(' ') : active ?

  const headerItemClassName =
    done || active
      ? [
          styles.header__item,
          isStageAvailable ? styles["header__item_available"] : "",
          styles.header__item_done,
        ].join(" ")
      : [
          styles.header__item,
          isStageAvailable ? styles["header__item_available"] : "",
        ].join(" ");
        
  return (
    <div className={styles.header}>
      <div className={headerItemClassName}>
        <button onClick={handleClick}>
          <span>{title}</span>
          <div
            className={
              done || active
                ? [
                    styles.header__itemNumber,
                    styles.header__itemNumber_done,
                  ].join(" ")
                : styles.header__itemNumber
            }
          >
            {done ? (
              <svg
                className={styles.header__check}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 32 32"
                xmlSpace="preserve"
              >
                <path
                  clipRule="evenodd"
                  d="M27.704 8.397a1.016 1.016 0 0 0-1.428 0L11.988
                                22.59l-6.282-6.193a1.016 1.016 0 0 0-1.428 0 .994.994 0 0 0 0 1.414l6.999 6.899c.39.386
                                1.039.386 1.429 0L27.704 9.811a.992.992 0 0 0 0-1.414c-.394-.391.395.39 0 0z"
                  fill="#ffffff"
                  fillRule="evenodd"
                  className="fill-121313"
                />
              </svg>
            ) : (
              stage
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default HeaderProfile;
