import styles from "./AdminSearchArea.module.scss";

const SearchResults = ({ user, orders }) => {
  if (user && orders)
    return (
      <div className={styles.search__info}>
        <span className={styles["search__info-message"]}>
          Пользователь найден!
        </span>
        <p className={styles["search__info-data"]}>
          
          <span>
            <b>ИНН</b>: {user.inn},
          </span>
          <span>
            <b>Телефон</b>: {user.phone ?? "-"},
          </span>
          <span>
            <b>Почта</b>: {user.email ?? "-"}
          </span>
          
        </p>
      </div>
    );
  if (!user && orders)
    return (
      <p className={styles.search__info}>
        <span className={styles["search__info-message"]}>
          Найдены данные <b>всех</b> пользователей
        </span>
      </p>
    );

  return (
    <div className={styles.search__info}>
      <p className={styles["search__info-message"]}>
        Пользователь не найден!
      </p>
    </div>
  );
};
export default SearchResults;
