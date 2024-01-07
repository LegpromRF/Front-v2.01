import { useEffect, useState } from "react";
import DownArrowIcon from "@public/icon/down-arrow.png";
import Select from "react-select";

import styles from "./Tables.module.scss";
import axios from "axios";
import getUserSubscriptions from "../../../utils/services/profileData/getUserSubscriptions";

const ContentTable = ({ title, subtitle, children }) => {
  const [isOpen, setOpen] = useState(true);

  
  
  const toggleOpen = () => setOpen((open) => !open);

  return (
    <div className={styles.table + " " + (isOpen ? "" : styles.close)}>
      <div className={styles.table__header}>
        <h2 className={styles["table__header-title"]}>{title}</h2>
        <button
          className={styles["table__header-btn"]}
          onClick={toggleOpen}
          tabIndex={0}
          aria-label={title}
          aria-expanded={isOpen}
        >
          <img src={DownArrowIcon} alt="" />
        </button>
      </div>
      {children}
    </div>
  );
};

export default ContentTable;
