import styles from './RegistrationLayout.module.scss'

import HeaderLanding from '@/src/layout/HeaderLanding/HeaderLanding'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import Firework from 'public/Pattern/Firework.svg'
import BlueFigure from 'public/Pattern/BlueFigure.svg'
import PaleFigure from 'public/Pattern/PaleFigure.svg'

import vk from 'public/icon/SocialMedia/Vk.svg'
import yandex from 'public/icon/SocialMedia/Yandex.svg'
import gosuslugi from 'public/icon/SocialMedia/Gosuslugi.svg'

import { isMobile } from 'react-device-detect';

const RegistrationLayout = ({children, width}) => {

 useEffect(() => {
  if(!isMobile) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "visible";
  }
 }, {})

  const router = useRouter()
  const pathname = router.pathname.split('/')

  return ( 
   <>
      <Head>
        <title>Вход/Регистрация – LegpromRF – Платформа легкой промышленности</title>
      </Head>
      <div className="wrapper">
        <HeaderLanding />
        <main className='page registratio'>
          <div className="registratio__container">
            <section className={styles.registratio__screen}>
              
            <div className={[styles.registratio__pattern, styles.registratio__pattern_1].join(' ')}>
              <Image src={Firework}/>
            </div>
    
            <div className={[styles.registratio__pattern, styles.registratio__pattern_2].join(' ')}>
              <Image src={Firework}/>
            </div>
    
            <div className={[styles.registratio__pattern, styles.registratio__pattern_3].join(' ')}>
              <Image src={BlueFigure}/>
            </div>
    
            <div className={[styles.registratio__pattern, styles.registratio__pattern_4].join(' ')}>
              <Image src={PaleFigure}/>
            </div>
    
            <div className={[styles.registratio__pattern, styles.registratio__pattern_5].join(' ')}>
              <Image src={BlueFigure}/>
            </div>
    
            <div className={[styles.registratio__pattern, styles.registratio__pattern_6].join(' ')}>
              <Image src={PaleFigure}/>
            </div>
    
            <div className={styles.registratio__header}>
              <div className={styles.registratio__title}>Регистрация на платформе</div>
              <div className={styles.registratio__steps}>
                <div className={pathname[2] == 'step1' || pathname[2] == 'verifyPhone' ? styles.registratio__stepActive : styles.registratio__step}>
                  <p className={styles.registratio__stepTitle}>Представьтесь</p>
                  <p className={styles.registratio__stepNumber}>1</p>
                </div>
                <div className={pathname[2] == 'step2' ? styles.registratio__stepActive : styles.registratio__step}>
                  <p className={styles.registratio__stepTitle}>Ваш пароль</p>
                  <p className={styles.registratio__stepNumber}>2</p>
                </div>
                <div className={pathname[2] == 'step3' ? styles.registratio__stepActive : styles.registratio__step}>
                  <p className={styles.registratio__stepTitle}>Ваш план</p>
                  <p className={styles.registratio__stepNumber}>3</p>
                </div>
              </div>
            </div>
    
            <div className={styles.form} style={{maxWidth: width}}>
              <form action="">
                <div className={styles.form__body}>
                  {children}
                </div>
              </form>
            </div>
            
            <div className={pathname[2] == 'step1' || pathname[2] == 'verifyPhone' ? styles.registratio__social : styles.registratio__none}>
              <div className={styles.registratio__item}>
                <div className={styles.registratio__itemBody}>
                  <Image src={vk}/>
                  <div className={styles.registratio__itemTitle}>Вход через VK ID</div>
                </div>
              </div>
                <div className={styles.registratio__item}>
                  <div className={styles.registratio__itemBody}>
                    <Image src={yandex}/>
                    <div className={styles.registratio__itemTitle}>Вход через Яндекс ID</div>
                  </div>
                </div>
                <div className={styles.registratio__item}>
                  <div className={styles.registratio__itemBody}>
                    <Image src={gosuslugi}/>
                    <div className={styles.registratio__itemTitle}>Вход через Госуслуги</div>
                  </div>
                </div>
            </div>
            </section>
          </div>
        </main>
      </div>
   </>
   
   );
}
 
export default RegistrationLayout;