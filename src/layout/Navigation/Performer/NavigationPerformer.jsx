import styles from './Performer.module.scss'

import HeaderNavigation from '@/src/UI/HeaderNavigation/HeaderNavigation';
import ButtonNavigation from '@/src/UI/ButtonNavigation/ButtonNavigation';



import ad from 'public/icon/adPro.svg';
import { useState } from 'react';

const NavigationPerformer = ({active, setActive}) => {

  const [activeButton1, setActiveButton1] = useState(false);
  const [activeButton2, setActiveButton2] = useState(false);
  const [activeButton3, setActiveButton3] = useState(false);

  /* ['Pro', 'Base'] */
  const tarif = 'Pro'
  
  return ( 
    <div onClick={() => setActive(false)}  className={active ? [styles.nav__bg, styles.nav__bg_active].join(' ') : styles.nav__bg}>
    <nav onClick={(e) => e.stopPropagation()} className={active ? [styles.nav, styles.nav__active].join(' ') : styles.nav}>
      <div className={styles.nav__content}>
        <div className={styles.nav__head}>
          <div className="nav__profileContainer">
            <h2 className={styles.nav__title}>Гость</h2>
            <HeaderNavigation title="Global IT" mail="ekb-invest103@yandex.ru" tarif={tarif}/>
          </div>
        </div>
        <div className={styles.nav__buttons}>
          <div className="nav__profileContainer">
          <div onClick={() => {
            if (activeButton2 || activeButton3) {
              setActiveButton2(false);
              setActiveButton3(false);
            }
            setActiveButton1(!activeButton1)
          }}  
          className={styles.nav__item}>
          <ButtonNavigation title="Найти" href="/" stopPropagation="true" active={activeButton1}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="8.4819" cy="8.4819" r="7.4819" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M13.6855 14.0742L16.6189 16.9999" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
          </ButtonNavigation> 

          <div onClick={(e) => e.stopPropagation()} className={activeButton1 ? [styles.nav__buttonInfo, styles.nav__buttonActive].join(' ') : styles.nav__buttonInfo}>
            <div onClick={() => setActiveButton1(false)} className={styles.nav__close}>
              <span>Назад</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
                <path d="M4.35355 4.35355C4.54882 4.15829 4.54882 3.84171 4.35355 3.64645L1.17157 0.464466C0.976311 0.269204 0.659728 0.269204 0.464466 0.464466C0.269204 0.659728 0.269204 0.976311 0.464466 1.17157L3.29289 4L0.464466 6.82843C0.269204 7.02369 0.269204 7.34027 0.464466 7.53553C0.659728 7.7308 0.976311 7.7308 1.17157 7.53553L4.35355 4.35355ZM3 4.5H4V3.5H3V4.5Z" fill="black"/>
              </svg>
            </div>
            <ButtonNavigation title="Суб подрядчика" href="/">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="18" viewBox="0 0 15 18" fill="none">
              <circle cx="7.30853" cy="4.97699" r="3.97699" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M1.00001 14.485C0.998945 14.2054 1.06147 13.9292 1.18286 13.6774C1.5638 12.9155 2.63804 12.5117 3.52944 12.3289C4.17231 12.1917 4.82406 12.1 5.47984 12.0546C6.69396 11.9479 7.9151 11.9479 9.12922 12.0546C9.78494 12.1006 10.4367 12.1922 11.0796 12.3289C11.971 12.5117 13.0453 12.8774 13.4262 13.6774C13.6703 14.1908 13.6703 14.7868 13.4262 15.3002C13.0453 16.1002 11.971 16.4659 11.0796 16.6411C10.4375 16.784 9.78551 16.8782 9.12922 16.923C8.14102 17.0068 7.14821 17.022 6.15791 16.9687C5.92934 16.9687 5.7084 16.9687 5.47984 16.923C4.826 16.8787 4.17651 16.7845 3.53706 16.6411C2.63804 16.4659 1.57142 16.1002 1.18286 15.3002C1.06209 15.0454 0.999627 14.7669 1.00001 14.485Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            </ButtonNavigation> 
            <ButtonNavigation title="Текстиль" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="18" viewBox="0 0 22 18" fill="none">
                <path d="M12.8496 1.25V3.67" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.8496 14.7598V16.7838" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12.8496 11.3239V6.50293" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M17.7021 17C19.5242 17 21 15.5426 21 13.7431V11.1506C19.7943 11.1506 18.8233 10.1917 18.8233 9.00103C18.8233 7.81035 19.7943 6.85039 21 6.85039L20.999 4.25686C20.999 2.45745 19.5221 1 17.7011 1H4.29892C2.47789 1 1.00104 2.45745 1.00104 4.25686L1 6.93485C2.20567 6.93485 3.17668 7.81035 3.17668 9.00103C3.17668 10.1917 2.20567 11.1506 1 11.1506V13.7431C1 15.5426 2.4758 17 4.29787 17H17.7021Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ButtonNavigation> 
          </div>
        </div>

        <div onClick={() => {
            if (activeButton1 || activeButton3) {
              setActiveButton1(false);
              setActiveButton3(false);
            }
            setActiveButton2(!activeButton2)
          }}   className={styles.nav__item}>
          <ButtonNavigation title="Управление магазином" href="/" stopPropagation="true" active={activeButton2}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M5.29697 7.56152V13.0496" stroke="#242424" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9.03037 4.93555V13.0497" stroke="#242424" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M12.7032 10.4609V13.0489" stroke="#242424" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12.7486 1H5.25143C2.6381 1 1 2.84967 1 5.46813V12.5319C1 15.1503 2.63048 17 5.25143 17H12.7486C15.3695 17 17 15.1503 17 12.5319V5.46813C17 2.84967 15.3695 1 12.7486 1Z" stroke="#242424" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </ButtonNavigation> 
          <div onClick={(e) => e.stopPropagation()} className={activeButton2 ? [styles.nav__buttonInfo, styles.nav__buttonActive].join(' ') : styles.nav__buttonInfo}>
            <div onClick={() => setActiveButton2(false)} className={styles.nav__close}>
                <span>Назад</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
                  <path d="M4.35355 4.35355C4.54882 4.15829 4.54882 3.84171 4.35355 3.64645L1.17157 0.464466C0.976311 0.269204 0.659728 0.269204 0.464466 0.464466C0.269204 0.659728 0.269204 0.976311 0.464466 1.17157L3.29289 4L0.464466 6.82843C0.269204 7.02369 0.269204 7.34027 0.464466 7.53553C0.659728 7.7308 0.976311 7.7308 1.17157 7.53553L4.35355 4.35355ZM3 4.5H4V3.5H3V4.5Z" fill="black"/>
                </svg>
              </div>
            <ButtonNavigation title="Страница магазина" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M10.1358 1.00977H4.34032C2.54557 1.00977 1 2.46386 1 4.25861V13.7107C1 15.6065 2.44451 16.9996 4.34032 16.9996H11.2998C13.0945 16.9996 14.5495 15.5054 14.5495 13.7107V5.60641L10.1358 1.00977Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.90723 1V3.53443C9.90723 4.77158 10.9083 5.77525 12.1454 5.77786C13.292 5.78048 14.4655 5.78135 14.5448 5.77612" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ButtonNavigation> 
            <ButtonNavigation title="Настройки магазина" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.5901 5.44952L15.072 4.55048C14.6336 3.78975 13.6623 3.52731 12.9005 3.96381V3.96381C12.5379 4.17742 12.1052 4.23803 11.6979 4.13226C11.2905 4.02649 10.942 3.76304 10.7291 3.4C10.5921 3.16925 10.5186 2.90642 10.5158 2.6381V2.6381C10.5281 2.20791 10.3658 1.79103 10.0658 1.48244C9.76586 1.17385 9.35375 0.999823 8.92338 1H7.87957C7.45795 0.999995 7.0537 1.16801 6.75628 1.46686C6.45886 1.76571 6.29279 2.17076 6.29481 2.59238V2.59238C6.28232 3.46289 5.57303 4.16199 4.70243 4.1619C4.43411 4.15912 4.17128 4.08553 3.94053 3.94857V3.94857C3.17876 3.51207 2.20741 3.77451 1.7691 4.53524L1.21291 5.44952C0.775129 6.2093 1.03399 7.18004 1.79196 7.62095V7.62095C2.28465 7.9054 2.58816 8.43109 2.58816 9C2.58816 9.56891 2.28465 10.0946 1.79196 10.379V10.379C1.03495 10.817 0.775809 11.7854 1.21291 12.5429V12.5429L1.73862 13.4495C1.94399 13.8201 2.28856 14.0935 2.69608 14.2094C3.10361 14.3252 3.54049 14.2738 3.91005 14.0667V14.0667C4.27335 13.8547 4.70628 13.7966 5.11261 13.9053C5.51893 14.0141 5.86499 14.2806 6.07386 14.6457C6.21082 14.8765 6.28441 15.1393 6.28719 15.4076V15.4076C6.28719 16.2871 7.00013 17 7.87957 17H8.92338C9.79987 17 10.5116 16.2917 10.5158 15.4152V15.4152C10.5137 14.9923 10.6808 14.5861 10.9799 14.287C11.279 13.9879 11.6852 13.8208 12.1081 13.8229C12.3758 13.83 12.6376 13.9033 12.8701 14.0362V14.0362C13.6298 14.474 14.6006 14.2151 15.0415 13.4571V13.4571L15.5901 12.5429C15.8024 12.1784 15.8607 11.7443 15.752 11.3368C15.6433 10.9292 15.3766 10.5818 15.011 10.3714V10.3714C14.6454 10.1611 14.3787 9.81367 14.27 9.4061C14.1613 8.99854 14.2196 8.56446 14.432 8.2C14.57 7.95892 14.7699 7.75903 15.011 7.62095V7.62095C15.7644 7.18028 16.0227 6.21521 15.5901 5.45714V5.45714V5.44952Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="8.40522" cy="8.99995" r="2.19429" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ButtonNavigation> 
            <ButtonNavigation title="Добавить товар" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9.00333 1V17" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M17.0152 9.00185H1" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ButtonNavigation> 
          </div>
        </div>

        <div className={styles.nav__item}>
            <ButtonNavigation title="Реестр закупок" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.4279 1H15.0412C16.1224 1 16.9995 1.88472 16.9995 2.97615V5.61128C16.9995 6.70188 16.1224 7.58743 15.0412 7.58743H12.4279C11.3459 7.58743 10.4688 6.70188 10.4688 5.61128V2.97615C10.4688 1.88472 11.3459 1 12.4279 1Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.95914 1H5.57159C6.65363 1 7.53073 1.88472 7.53073 2.97615V5.61128C7.53073 6.70188 6.65363 7.58743 5.57159 7.58743H2.95914C1.8771 7.58743 1 6.70188 1 5.61128V2.97615C1 1.88472 1.8771 1 2.95914 1Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M2.95914 10.4121H5.57159C6.65363 10.4121 7.53073 11.2968 7.53073 12.3891V15.0234C7.53073 16.1148 6.65363 16.9995 5.57159 16.9995H2.95914C1.8771 16.9995 1 16.1148 1 15.0234V12.3891C1 11.2968 1.8771 10.4121 2.95914 10.4121Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M12.4279 10.4121H15.0412C16.1224 10.4121 16.9995 11.2968 16.9995 12.3891V15.0234C16.9995 16.1148 16.1224 16.9995 15.0412 16.9995H12.4279C11.3459 16.9995 10.4688 16.1148 10.4688 15.0234V12.3891C10.4688 11.2968 11.3459 10.4121 12.4279 10.4121Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ButtonNavigation> 
        </div>
          
        <div className={styles.nav__item}>
            <ButtonNavigation title="Входящие заявки" href="/">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <mask id="path-1-inside-1_991_10786" fill="white">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.2 11.2C15.6103 11.2 15.9484 11.5088 15.9946 11.9067L16 12V13.6C16 14.8781 15.0009 15.9229 13.741 15.9959L13.6 16H2.4C1.12186 16 0.0770713 15.0009 0.00407415 13.741L0 13.6V12C0 11.5582 0.358172 11.2 0.8 11.2C1.21027 11.2 1.54841 11.5088 1.59462 11.9067L1.6 12V13.6C1.6 14.0103 1.90883 14.3484 2.3067 14.3946L2.4 14.4H13.6C14.0103 14.4 14.3484 14.0912 14.3946 13.6933L14.4 13.6V12C14.4 11.5582 14.7582 11.2 15.2 11.2ZM8.11876 11.1912L8.07201 11.1968L7.99999 11.2L7.9398 11.1978L7.83941 11.1838L7.75027 11.1602L7.66141 11.1251L7.58342 11.0832L7.49963 11.0242L7.4343 10.9657L5.0343 8.56569C4.72188 8.25327 4.72188 7.74673 5.0343 7.43431C5.34672 7.1219 5.85325 7.1219 6.16567 7.43431L7.19999 8.4688V0.8C7.19999 0.358172 7.55816 0 7.99999 0C8.44182 0 8.79999 0.358172 8.79999 0.8V8.4688L9.8343 7.43431C10.1467 7.1219 10.6533 7.1219 10.9657 7.43431C11.2781 7.74673 11.2781 8.25327 10.9657 8.56569L8.56567 10.9657C8.53736 10.994 8.50745 11.0197 8.47623 11.0429L8.38724 11.1003L8.29706 11.143L8.21278 11.1713L8.11876 11.1912Z"/>
                </mask>
                <path fillRule="evenodd" clipRule="evenodd" d="M15.2 11.2C15.6103 11.2 15.9484 11.5088 15.9946 11.9067L16 12V13.6C16 14.8781 15.0009 15.9229 13.741 15.9959L13.6 16H2.4C1.12186 16 0.0770713 15.0009 0.00407415 13.741L0 13.6V12C0 11.5582 0.358172 11.2 0.8 11.2C1.21027 11.2 1.54841 11.5088 1.59462 11.9067L1.6 12V13.6C1.6 14.0103 1.90883 14.3484 2.3067 14.3946L2.4 14.4H13.6C14.0103 14.4 14.3484 14.0912 14.3946 13.6933L14.4 13.6V12C14.4 11.5582 14.7582 11.2 15.2 11.2ZM8.11876 11.1912L8.07201 11.1968L7.99999 11.2L7.9398 11.1978L7.83941 11.1838L7.75027 11.1602L7.66141 11.1251L7.58342 11.0832L7.49963 11.0242L7.4343 10.9657L5.0343 8.56569C4.72188 8.25327 4.72188 7.74673 5.0343 7.43431C5.34672 7.1219 5.85325 7.1219 6.16567 7.43431L7.19999 8.4688V0.8C7.19999 0.358172 7.55816 0 7.99999 0C8.44182 0 8.79999 0.358172 8.79999 0.8V8.4688L9.8343 7.43431C10.1467 7.1219 10.6533 7.1219 10.9657 7.43431C11.2781 7.74673 11.2781 8.25327 10.9657 8.56569L8.56567 10.9657C8.53736 10.994 8.50745 11.0197 8.47623 11.0429L8.38724 11.1003L8.29706 11.143L8.21278 11.1713L8.11876 11.1912Z" fill="#242424"/>
                <path d="M15.9946 11.9067L16.0946 11.9009L16.094 11.8952L15.9946 11.9067ZM16 12H16.1002L16.0998 11.9942L16 12ZM13.741 15.9959L13.7439 16.0959L13.7468 16.0958L13.741 15.9959ZM13.6 16V16.1L13.6029 16.1L13.6 16ZM0.00407415 13.741L-0.0959262 13.7439L-0.0957584 13.7468L0.00407415 13.741ZM0 13.6H-0.100042L-0.0999583 13.6029L0 13.6ZM1.59462 11.9067L1.69462 11.9009L1.69395 11.8952L1.59462 11.9067ZM1.6 12H1.70017L1.69983 11.9942L1.6 12ZM2.3067 14.3946L2.29515 14.4941L2.30094 14.4945L2.3067 14.3946ZM2.4 14.4L2.39423 14.5H2.4V14.4ZM14.3946 13.6933L14.4941 13.7049L14.4945 13.6991L14.3946 13.6933ZM14.4 13.6L14.5 13.6058V13.6H14.4ZM7.99999 11.2L7.99627 11.3003L8.00442 11.2999L7.99999 11.2ZM7.9398 11.1978L7.92595 11.2973L7.93609 11.2977L7.9398 11.1978ZM7.83941 11.1838L7.81363 11.2812L7.82563 11.2829L7.83941 11.1838ZM7.75027 11.1602L7.71324 11.2538L7.72468 11.2569L7.75027 11.1602ZM7.66141 11.1251L7.6138 11.2138L7.62463 11.2181L7.66141 11.1251ZM7.58342 11.0832L7.52546 11.1656L7.53613 11.1713L7.58342 11.0832ZM7.49963 11.0242L7.43241 11.0992L7.44209 11.106L7.49963 11.0242ZM7.4343 10.9657L7.36349 11.0365L7.36755 11.0401L7.4343 10.9657ZM5.0343 8.56569L4.96359 8.6364L5.0343 8.56569ZM6.16567 7.43431L6.23639 7.36361L6.23638 7.3636L6.16567 7.43431ZM7.19999 8.4688L7.12927 8.53951L7.29999 8.71025V8.4688H7.19999ZM8.79999 8.4688H8.69999V8.71025L8.8707 8.53951L8.79999 8.4688ZM9.8343 7.43431L9.76359 7.3636L9.76359 7.36361L9.8343 7.43431ZM10.9657 8.56569L10.895 8.49498L10.9657 8.56569ZM8.56567 10.9657L8.63638 11.0364L8.56567 10.9657ZM8.47623 11.0429L8.53051 11.1272L8.53586 11.1232L8.47623 11.0429ZM15.2 11.3C15.5589 11.3 15.8549 11.5702 15.8953 11.9182L16.094 11.8952C16.042 11.4475 15.6616 11.1 15.2 11.1V11.3ZM15.8948 11.9125L15.9002 12.0058L16.0998 11.9942L16.0945 11.9009L15.8948 11.9125ZM15.9 12V13.6H16.1V12H15.9ZM15.9 13.6C15.9 14.8249 14.9425 15.8261 13.7352 15.8961L13.7468 16.0958C15.0592 16.0197 16.1 14.9314 16.1 13.6H15.9ZM13.7381 15.896L13.5971 15.9L13.6029 16.1L13.7439 16.0959L13.7381 15.896ZM13.6 15.9H2.4V16.1H13.6V15.9ZM2.4 15.9C1.17515 15.9 0.173857 14.9425 0.103907 13.7352L-0.0957584 13.7468C-0.0197145 15.0592 1.06856 16.1 2.4 16.1V15.9ZM0.104032 13.7381L0.0999583 13.5971L-0.0999583 13.6029L-0.0958841 13.7439L0.104032 13.7381ZM0.1 13.6V12H-0.1V13.6H0.1ZM0.1 12C0.1 11.6134 0.413401 11.3 0.8 11.3V11.1C0.302944 11.1 -0.1 11.5029 -0.1 12H0.1ZM0.8 11.3C1.15891 11.3 1.45486 11.5702 1.49529 11.9182L1.69395 11.8952C1.64195 11.4475 1.26162 11.1 0.8 11.1V11.3ZM1.49478 11.9125L1.50017 12.0058L1.69983 11.9942L1.69445 11.9009L1.49478 11.9125ZM1.5 12V13.6H1.7V12H1.5ZM1.5 13.6C1.5 14.0616 1.84746 14.4419 2.29517 14.4939L2.31824 14.2953C1.97021 14.2549 1.7 13.9589 1.7 13.6H1.5ZM2.30094 14.4945L2.39424 14.4998L2.40576 14.3002L2.31246 14.2948L2.30094 14.4945ZM2.4 14.5H13.6V14.3H2.4V14.5ZM13.6 14.5C14.0616 14.5 14.4419 14.1525 14.494 13.7048L14.2953 13.6818C14.2549 14.0298 13.9589 14.3 13.6 14.3V14.5ZM14.4945 13.6991L14.4998 13.6058L14.3002 13.5942L14.2948 13.6875L14.4945 13.6991ZM14.5 13.6V12H14.3V13.6H14.5ZM14.5 12C14.5 11.6134 14.8134 11.3 15.2 11.3V11.1C14.7029 11.1 14.3 11.5029 14.3 12H14.5ZM8.10683 11.0919L8.06009 11.0975L8.08394 11.2961L8.13069 11.2905L8.10683 11.0919ZM8.06758 11.0969L7.99555 11.1001L8.00442 11.2999L8.07645 11.2967L8.06758 11.0969ZM8.00369 11.1001L7.9435 11.0978L7.93609 11.2977L7.99628 11.2999L8.00369 11.1001ZM7.95357 11.0987L7.85318 11.0848L7.82563 11.2829L7.92602 11.2968L7.95357 11.0987ZM7.865 11.0871L7.77587 11.0635L7.72468 11.2569L7.81381 11.2805L7.865 11.0871ZM7.78705 11.0672L7.69819 11.0321L7.62463 11.2181L7.71349 11.2532L7.78705 11.0672ZM7.7087 11.037L7.63071 10.9951L7.53613 11.1713L7.61412 11.2132L7.7087 11.037ZM7.64096 11.0014L7.55717 10.9425L7.44209 11.106L7.52588 11.165L7.64096 11.0014ZM7.56638 10.9498L7.50105 10.8912L7.36755 11.0401L7.43288 11.0987L7.56638 10.9498ZM7.50501 10.895L5.10501 8.49498L4.96359 8.6364L7.36359 11.0364L7.50501 10.895ZM5.10501 8.49498C4.83165 8.22161 4.83165 7.77839 5.10501 7.50503L4.96359 7.3636C4.61212 7.71508 4.61212 8.28492 4.96359 8.6364L5.10501 8.49498ZM5.10501 7.50503C5.37838 7.23166 5.82159 7.23166 6.09496 7.50503L6.23638 7.3636C5.88491 7.01213 5.31506 7.01213 4.96359 7.3636L5.10501 7.50503ZM6.09496 7.50502L7.12927 8.53951L7.2707 8.3981L6.23639 7.36361L6.09496 7.50502ZM7.29999 8.4688V0.8H7.09999V8.4688H7.29999ZM7.29999 0.8C7.29999 0.413401 7.61339 0.1 7.99999 0.1V-0.1C7.50293 -0.1 7.09999 0.302944 7.09999 0.8H7.29999ZM7.99999 0.1C8.38659 0.1 8.69999 0.413401 8.69999 0.8H8.89999C8.89999 0.302944 8.49704 -0.1 7.99999 -0.1V0.1ZM8.69999 0.8V8.4688H8.89999V0.8H8.69999ZM8.8707 8.53951L9.90502 7.50502L9.76359 7.36361L8.72927 8.3981L8.8707 8.53951ZM9.90501 7.50503C10.1784 7.23166 10.6216 7.23166 10.895 7.50503L11.0364 7.3636C10.6849 7.01213 10.1151 7.01213 9.76359 7.3636L9.90501 7.50503ZM10.895 7.50503C11.1683 7.77839 11.1683 8.22161 10.895 8.49498L11.0364 8.6364C11.3879 8.28492 11.3879 7.71508 11.0364 7.3636L10.895 7.50503ZM10.895 8.49498L8.49496 10.895L8.63638 11.0364L11.0364 8.6364L10.895 8.49498ZM8.49496 10.895C8.47011 10.9198 8.44391 10.9424 8.41661 10.9627L8.53586 11.1232C8.57098 11.0971 8.6046 11.0682 8.63638 11.0364L8.49496 10.895ZM8.42208 10.9589L8.33308 11.0162L8.44139 11.1843L8.53039 11.127L8.42208 10.9589ZM8.3444 11.0099L8.25422 11.0527L8.3399 11.2334L8.43008 11.1906L8.3444 11.0099ZM8.26522 11.0482L8.18094 11.0765L8.24462 11.2661L8.32889 11.2378L8.26522 11.0482ZM8.19211 11.0735L8.09809 11.0933L8.13943 11.289L8.23345 11.2692L8.19211 11.0735Z" fill="#F5F5F5" mask="url(#path-1-inside-1_991_10786)"/>
              </svg>
            </ButtonNavigation> 
        </div>
         
        <div onClick={() => {
            if (activeButton1 || activeButton2) {
              setActiveButton1(false);
              setActiveButton2(false);
            }
            setActiveButton3(!activeButton3)
          }}    className={styles.nav__item}>
            <ButtonNavigation title="Новости" href="/" stopPropagation="true" active={activeButton3}>
              <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                <path d="M11.3989 12.7099H5.12402" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.3989 9.07127H5.12402" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.51837 5.44138H5.12402" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M11.5664 1C11.5664 1 4.89441 1.00348 4.88398 1.00348C2.48528 1.01825 1 2.59652 1 5.00391V12.9961C1 15.4156 2.49658 17 4.91613 17C4.91613 17 11.5873 16.9974 11.5986 16.9974C13.9973 16.9826 15.4834 15.4035 15.4834 12.9961V5.00391C15.4834 2.58436 13.986 1 11.5664 1Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </ButtonNavigation> 

            <div  onClick={(e) => e.stopPropagation()} className={activeButton3 ? [styles.nav__buttonInfo, styles.nav__buttonActive].join(' ') : styles.nav__buttonInfo}>
              <div onClick={() => setActiveButton3(false)} className={styles.nav__close}>
                <span>Назад</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="5" height="8" viewBox="0 0 5 8" fill="none">
                  <path d="M4.35355 4.35355C4.54882 4.15829 4.54882 3.84171 4.35355 3.64645L1.17157 0.464466C0.976311 0.269204 0.659728 0.269204 0.464466 0.464466C0.269204 0.659728 0.269204 0.976311 0.464466 1.17157L3.29289 4L0.464466 6.82843C0.269204 7.02369 0.269204 7.34027 0.464466 7.53553C0.659728 7.7308 0.976311 7.7308 1.17157 7.53553L4.35355 4.35355ZM3 4.5H4V3.5H3V4.5Z" fill="black"/>
                </svg>
              </div>
              <ButtonNavigation title="Страница блога" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="18" viewBox="0 0 16 18" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M10.1358 1.00977H4.34032C2.54557 1.00977 1 2.46386 1 4.25861V13.7107C1 15.6065 2.44451 16.9996 4.34032 16.9996H11.2998C13.0945 16.9996 14.5495 15.5054 14.5495 13.7107V5.60641L10.1358 1.00977Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.90723 1V3.53443C9.90723 4.77158 10.9083 5.77525 12.1454 5.77786C13.292 5.78048 14.4655 5.78135 14.5448 5.77612" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ButtonNavigation> 

              <ButtonNavigation title="Настройки блога" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="18" viewBox="0 0 17 18" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M15.5901 5.44952L15.072 4.55048C14.6336 3.78975 13.6623 3.52731 12.9005 3.96381V3.96381C12.5379 4.17742 12.1052 4.23803 11.6979 4.13226C11.2905 4.02649 10.942 3.76304 10.7291 3.4C10.5921 3.16925 10.5186 2.90642 10.5158 2.6381V2.6381C10.5281 2.20791 10.3658 1.79103 10.0658 1.48244C9.76586 1.17385 9.35375 0.999823 8.92338 1H7.87957C7.45795 0.999995 7.0537 1.16801 6.75628 1.46686C6.45886 1.76571 6.29279 2.17076 6.29481 2.59238V2.59238C6.28232 3.46289 5.57303 4.16199 4.70243 4.1619C4.43411 4.15912 4.17128 4.08553 3.94053 3.94857V3.94857C3.17876 3.51207 2.20741 3.77451 1.7691 4.53524L1.21291 5.44952C0.775129 6.2093 1.03399 7.18004 1.79196 7.62095V7.62095C2.28465 7.9054 2.58816 8.43109 2.58816 9C2.58816 9.56891 2.28465 10.0946 1.79196 10.379V10.379C1.03495 10.817 0.775809 11.7854 1.21291 12.5429V12.5429L1.73862 13.4495C1.94399 13.8201 2.28856 14.0935 2.69608 14.2094C3.10361 14.3252 3.54049 14.2738 3.91005 14.0667V14.0667C4.27335 13.8547 4.70628 13.7966 5.11261 13.9053C5.51893 14.0141 5.86499 14.2806 6.07386 14.6457C6.21082 14.8765 6.28441 15.1393 6.28719 15.4076V15.4076C6.28719 16.2871 7.00013 17 7.87957 17H8.92338C9.79987 17 10.5116 16.2917 10.5158 15.4152V15.4152C10.5137 14.9923 10.6808 14.5861 10.9799 14.287C11.279 13.9879 11.6852 13.8208 12.1081 13.8229C12.3758 13.83 12.6376 13.9033 12.8701 14.0362V14.0362C13.6298 14.474 14.6006 14.2151 15.0415 13.4571V13.4571L15.5901 12.5429C15.8024 12.1784 15.8607 11.7443 15.752 11.3368C15.6433 10.9292 15.3766 10.5818 15.011 10.3714V10.3714C14.6454 10.1611 14.3787 9.81367 14.27 9.4061C14.1613 8.99854 14.2196 8.56446 14.432 8.2C14.57 7.95892 14.7699 7.75903 15.011 7.62095V7.62095C15.7644 7.18028 16.0227 6.21521 15.5901 5.45714V5.45714V5.44952Z" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="8.40522" cy="8.99995" r="2.19429" stroke="#242424" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ButtonNavigation> 

              <ButtonNavigation title="Создать публикацию" href="/">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9.00333 1V17" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.0152 9.00185H1" stroke="#242424" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </ButtonNavigation> 
          </div>
        </div>
            
          </div>
        </div>
        <div className={styles.nav__footer}>

              <div className={styles.nav__referal}>
                  <div className="nav__profileContainer">
                    <Link href="/nolayout">Реферальная программа</Link>
                  </div>
              </div>

              <div className={styles.nav__ad}>
                {
                  tarif !== 'Pro' 
                  ? 
                    <Link href="/">
                      <Image 
                          src={ad} 
                          alt="LegpromRF"  
                          width={257} 
                          height={212}
                        />
                    </Link>
                  :
                    null
                }
              </div>

              <div className={styles.nav__wrapper}>
                <div className={styles.nav__balance}>
                  <div className={styles.nav__money}>
                    <div className={styles.nav__money_number}>0 ₽</div>
                    <div className={styles.nav__money_text}>остаток счета</div>
                  </div>
                  <div className={styles.nav__buttonsFooter}>
                    <div className={styles.nav__button}>+</div>
                    <div className={styles.nav__button}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="10" viewBox="0 0 12 10" fill="none">
                        <path d="M1 5.08335H11M11 5.08335L7.25 1M11 5.08335L7.25 9" stroke="#FAFAFA" strokeWidth="1.06364" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
        </div>
      </div>
    </nav>
</div>
   );
}
 
export default NavigationPerformer;