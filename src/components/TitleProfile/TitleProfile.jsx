import styles from './TitleProfile.module.scss'

const TitleProfile = ({children}) => {
  return ( 
    <h1 className={styles.title}>
      {children}
    </h1>
   );
}
 
export default TitleProfile;