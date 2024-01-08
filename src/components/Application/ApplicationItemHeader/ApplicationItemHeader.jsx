import { useSelector } from "react-redux";
import ButtonOutline from "../../UI/ButtonOutline/ButtonOutline";
import styles from "./ApplicationItemHeader.module.scss";
import formatDate from "../../../utils/helpers/formatDate";

const ApplicationItemHeader = () => {
  const { item, other, source, sourceError } = useSelector(
    (state) => state.viewTz
  );
  const { isAdmin } = useSelector((state) => state.admindata);

  return (
    <div className={styles.wrapper}>
      <p className={styles.text}>
        Опубликовано: {formatDate(new Date(other.start_date)) || "-"}{" "}
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
          Статус: <span>{item.status || "-"}</span>
        </p>
      )}

      {isAdmin && (
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
