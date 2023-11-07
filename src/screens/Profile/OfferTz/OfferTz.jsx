import Layout from "@/src/layout/Layout";
import Head from "next/head";

import styles from './OfferTz.module.scss'
import TitleProfile from "@/src/components/TitleProfile/TitleProfile";

import icon from 'public/icon/iconTz.png'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const Offer = () => {

  const [activeInput1, setActiveInput1] = useState(false);
  const [activeInput2, setActiveInput2] = useState(false);
  const [activeInput3, setActiveInput3] = useState(false);

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
    <>
      <Head>
        <title>Ваше предложени - LegpromRF</title>
      </Head>
      <Layout>
        <div className={styles.offer}>
          <TitleProfile>Просмотр технического задания</TitleProfile>
          <div className={styles.offer__head}>
            <div className={styles.offer__ico}>
              <Image 
                src={icon}
                alt="Иконка"  
                width={100} height={100}
              />
            </div>
            <div className={styles.offer__content}>
              <div className={styles.offer__info}>
                <div className={styles.offer__name}>Пошив платья для официантов</div>
                <div className={styles.offer__number}>№24500968</div>
              </div>
              <div className={styles.offer__control}>
                <div className={styles.offer__items}>
                  <div className={styles.offer__controlItem}>
                    <Link href="/profile/checkTz/">
                      <div className={styles.offer__controlTitle}>Посмотреть ТЗ</div>
                      <div className={styles.offer__controlIcon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14" viewBox="0 0 12 14" fill="none">
                          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.74318 1.00781H3.46528C2.14133 1.00781 1 2.09835 1 3.44438V10.4444C1 11.8662 2.06674 12.9999 3.46528 12.9999H8.60224C9.92683 12.9999 11 11.791 11 10.4444V4.4552L7.74318 1.00781Z" stroke="#242424" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M7.5752 1V2.90077C7.5752 3.82861 8.31401 4.58134 9.22643 4.5833C10.0733 4.58526 10.9394 4.58591 10.9979 4.58199" stroke="#242424" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M7.45174 9.3687H3.98145" stroke="#242424" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                          <path d="M6.13839 6.13335H3.98047" stroke="#242424" stroke-width="1.1" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.offer__right}>
              <h3 className={styles.offer__headText}>Сопроводительное письмо добавляет шанс найма</h3>
              <div className={styles.offer__respond}><Link href="/profile/offer">Отправить</Link></div>
            </div>
          </div>
          <div className={styles.offer__inputs}>
            <div className={styles.offer__inputsTitle}>Ваше предложение</div>
            <div className={styles.offer__items}>
              <div className={styles.offer__item}>
                <input className={activeInput1 ? styles.offer__activeInput : ''} type="text" placeholder="Вид работы" onChange={handleChange1}/>
              </div>
              <div className={styles.offer__item}>
                <input className={activeInput2 ? styles.offer__activeInput : ''} type="text" placeholder="Бюджет на работу" onChange={handleChange2}/>
              </div>
              <div className={styles.offer__item}>
                <input className={activeInput3 ? styles.offer__activeInput : ''} type="text" placeholder="Срок работы" onChange={handleChange3}/>
              </div>
            </div>
          </div>

          <div className={styles.offer__mail}>
            <div className={styles.offer__mailTitle}>Сопроводительное письмо</div>
            <textarea className={styles.offer__mailTextarea} cols="30" rows="10" placeholder="Ваш текст...."></textarea>
          </div>
        </div>
      </Layout>
    </>
   );
}
 
export default Offer;