import { useSelector } from "react-redux";
import ButtonOutline from "../../UI/ButtonOutline/ButtonOutline";
import styles from "./ApplicationItemHeader.module.scss";
import formatDate from "../../../utils/helpers/formatDate";
import { useEffect } from "react";

const ApplicationItemHeader = () => {
  const { item, other, source, sourceError } = useSelector(
    (state) => state.viewTz
  );
  const { isAdmin } = useSelector((state) => state.admindata);

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        Опубликовано: {item.created_at ? formatDate(new Date(item.created_at)) : "- "}
        {item.updated_at && (
          <span>(изменено {formatDate(new Date(item.updated_at))}.)</span>
        )}
      </p>

      {item.status === "Завершен" ? (
        <p className={styles.status}>
          Статус:{" "}
          <span className={styles.statusFinish}>{item.status || "-"}</span>
        </p>
      ) : (
        <p className={styles.status}>
          Статус: <span className={item.status === "Черновик" ? styles.statusDraft : ''}>{item.status || "-"}</span>
        </p>
      )}

      {(isAdmin && source.source_url) && (
        <ButtonOutline
          title="Донор"
          onClick={() => {
            if (!sourceError) {
              document.location.href = source.source_url;
            }
          }}
        />
      )}
    </div>
  );
};

export default ApplicationItemHeader;
