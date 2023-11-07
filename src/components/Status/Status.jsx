import styles from './Status.module.scss'

const Status = () => {
  return ( 
    <div className={styles.status}>
      <div className={styles.status__descriptions}>Памятка статусов:</div>
      <div className={styles.status__statusItem}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M0 0H16.3091C18.3475 0 20 1.65248 20 3.69091V20L0 0Z" fill="#0036FF"/>
          <path d="M20 20H3.69091C1.65248 20 0 18.3475 0 16.3091V0L20 20Z" fill="#002BCD"/>
          <circle cx="9.99993" cy="9.99993" r="3.18182" fill="white"/>
        </svg>
        <span>В работе</span>
      </div>
      <div className={styles.status__statusItem}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M0 0H16.3091C18.3475 0 20 1.65248 20 3.69091V20L0 0Z" fill="#00B334"/>
          <path d="M20 20H3.69091C1.65248 20 0 18.3475 0 16.3091V0L20 20Z" fill="#00902A"/>
          <circle cx="9.99993" cy="9.99993" r="3.18182" fill="white"/>
        </svg>
        <span>Закончен</span>
      </div>
      <div className={styles.status__statusItem}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M0 0H16.3091C18.3475 0 20 1.65248 20 3.69091V20L0 0Z" fill="#FF0A00"/>
          <path d="M20 20H3.69091C1.65248 20 0 18.3475 0 16.3091V0L20 20Z" fill="#CD0A02"/>
          <circle cx="9.99993" cy="9.99993" r="3.18182" fill="white"/>
        </svg>
        <span>Отменен</span>
      </div>
    </div>
   );
}
 
export default Status;