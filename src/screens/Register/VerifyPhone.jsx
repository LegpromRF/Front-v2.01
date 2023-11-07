import RegistrationLayout from './RegistrationLayout'
import styles from './StepsStyles.module.scss';
import Link from 'next/link';
import { useState } from 'react';

const VerifyPhone = () => {
  const [activeInput1, setActiveInput1] = useState(false);

  const handleChange1 = (e) => {
    if (e.target.value.length > 0 ) {
      setActiveInput1(true);
    } else if (e.target.value.length === 0 ) {
      setActiveInput1(false);
    }
  }
  return ( 
    <RegistrationLayout>
      <div className={styles.form__header}>
        <div className={styles.form__title}>Подтвердите номер телефона</div>
        <div className={styles.form__subTitle}>Введите код из смс отправленного на номер <br /> <span>+7967*****53</span></div>
      </div>

      <div className={styles.form__inputs}>
          <input className={ activeInput1 ? styles.form__inputActive : ''} onChange={handleChange1} type="text" placeholder="Код из смс"/>
      </div>

      <div className={styles.form__footer}>
        <div className={styles.form__employer}><Link href="/register/step1">Ввести другой номер</Link></div>
        <Link href={activeInput1 ? '/register/step2' : ''} className={activeInput1  ? [styles.form__buttonActive, styles.form__button].join(' ') : styles.form__button}>
          <button 
            disabled={activeInput1 ? false : true}
            >Далее</button>
        </Link>
       
        </div>
    </RegistrationLayout>
   );
}
export default VerifyPhone;


