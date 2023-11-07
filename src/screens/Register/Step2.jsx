import RegistrationLayout from './RegistrationLayout'
import styles from './StepsStyles.module.scss';
import Link from 'next/link';
import { useState } from 'react';

const Step2 = () => {

  const [activeInput1, setActiveInput1] = useState(false);
  const [activeInput2, setActiveInput2] = useState(false);

  const handleChange1 = (e) => {
    if (e.target.value.length > 0 ) {
      setActiveInput1(true);
    } else if (e.target.value.length === 0 ) {
      setActiveInput1(false);
    }
  }

  const handleChange2 = (e) => {
    if (e.target.value.length > 0 ) {
      setActiveInput2(true);
    } else if (e.target.value.length === 0 ) {
      setActiveInput2(false);
    }
  }
  
  return ( 
    <RegistrationLayout>
      <div className={styles.form__inputs}>
        <input className={ activeInput1 ? styles.form__inputActive : ''} onChange={handleChange1} type="password" placeholder="Придумайте пароль"/>
        <input className={ activeInput2 ? styles.form__inputActive : ''} onChange={handleChange2} type="password" placeholder="Повторите пароль"/>
      </div>
      <div className={styles.form__footer}>
        <Link href={activeInput1 && activeInput2 ? '/register/step3' : ''} className={activeInput1 && activeInput2 ?  [styles.form__buttonActive, styles.form__button].join(' ') : styles.form__button}>
          <button 
            disabled={activeInput1 && activeInput2 ? false : true}
          >Далее</button>
        </Link>
      </div>
    </RegistrationLayout>
   );
}
export default Step2;


