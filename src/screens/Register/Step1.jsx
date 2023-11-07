import styles from './StepsStyles.module.scss';

import RegistrationLayout from './RegistrationLayout'

import { useState } from 'react';
import Link from 'next/link';

const Step1 = () => {

  const [activeInput1, setActiveInput1] = useState(false);
  const [activeInput2, setActiveInput2] = useState(false);
  const [activeInput3, setActiveInput3] = useState(false);
  const [disabled, setDisabled] = useState(true)

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

  const handleChange3 = (e) => {
    if (e.target.value.length > 0 ) {
      setActiveInput3(true);
    } else if (e.target.value.length === 0 ) {
      setActiveInput3(false);
    }
  }

  return ( 
    <RegistrationLayout>
      <div className={styles.form__inputs}>
        <input className={ activeInput1 ? styles.form__inputActive : ''} onChange={handleChange1} type="text" placeholder="Ваше имя"/>
        <input className={ activeInput2 ? styles.form__inputActive : ''} onChange={handleChange2} type="text" placeholder="Ваш номер"/>
        <input className={ activeInput3 ? styles.form__inputActive : ''} onChange={handleChange3} type="text" placeholder="Ваша почта"/>
      </div>

      <div className={styles.form__footer}>
        <div className={styles.form__employer}><Link href="/nolayout">Вы производитель?</Link></div>
        <Link href={activeInput1 && activeInput2 && activeInput3 ? '/register/verifyPhone' : ''} className={activeInput1 && activeInput2 && activeInput3 ? [styles.form__buttonActive, styles.form__button].join(' ') : styles.form__button}>
        <button 
          disabled={activeInput1 && activeInput2 && activeInput3 ? false : true}
        >Далее</button>
        </Link>
      </div>
      </RegistrationLayout>
   );
}
export default Step1;


