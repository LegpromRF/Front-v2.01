import styles from './Home.module.scss'
// import HeaderLanding from '@/layout/HeaderLanding/HeaderLanding';
import HeaderLanding from '@/layout/HeaderLanding/HeaderLanding.jsx'
import Img1 from '@public/Landing/card_img_1.png'
import Img2 from '@public/Landing/card_img_2.png'
import Img3 from '@public/Landing/card_img_3.png'

// import LandingCarusel from '@/src/components/LandingCarusel/LandingCarusel';
// import {useState} from "react";
// import ModalAuth from "@/src/layout/Modal/ModalAuth/ModalAuth";
import {toggleModal} from "@store/auth/authModal.slice.js";
import {useDispatch} from "react-redux";
import {Link} from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch()
  const cards = [

    {
      img: Img1,
      title: 'Пошив платья для официантов',
      number: '№24500968',
      circulation: '450',
      datePublished: '21.03.2023',
      budget: '700 000',
      dateChange: '27.06.2023',
      responses: '23',
      views: '259',
    },
    {
      img: Img2,
      title: 'Пошив платья для официантов',
      number: '№24500968',
      circulation: '350',
      datePublished: '25.03.2023',
      budget: '600 000',
      dateChange: '26.06.2023',
      responses: '54',
      views: '336',
    },
    {
      img: Img3,
      title: 'Пошив платья для официантов',
      number: '№24500968',
      circulation: '150',
      datePublished: '30.03.2023',
      budget: '200 000',
      dateChange: '25.06.2023',
      responses: '63',
      views: '129',
    }
  ]

  return ( 
    <>
    {/*<Head>*/}
    {/*  <title>LegpromRF – Платформа легкой промышленности – Все предприятия легпрома на одной площадке. Новый способ находить клиентов и поставщиков.</title>*/}
    {/*</Head>*/}
    
      <HeaderLanding />
      <main className="page landing">
        <div className="landing__container">
          <div className={styles.landing__wrapper}>
            <div className={styles.landing__left}>
              <div className={styles.landing__content}>
                <h1 className={styles.landing__title}>Пройдите регистрацию <br /> <span className={styles.landing__three}>в три</span> простых шага</h1>
                <h4 className={styles.landing__subTitle}>и получите список <br /> подходящих вам фабрик <span className={styles.landing__star}>*</span></h4>
                <div className={styles.landing__auth}><button onClick={() => dispatch(toggleModal())}>Зарегистрироваться бесплатно</button></div>
                <div className={styles.landing__text}>
                  <span>*</span>
                  <p>
                    В нашей базе более 15 000 швейных фабрик в России и СНГ.Алгоритмы выберут и сразу покажут вам исполнителей под
                    ваше техническое задание.
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.landing__right}>
              <h4 className={styles.landing__orders}>Выполнено за 2023 г. <br /> 260 заказов</h4>
              <div className={styles.card}>
                {cards.map((card, index) => {
                  return (
                    <div key={index} className={styles.card__item}>
                      <div className={styles.card__body}>
                        <img src={card.img} alt="Фото изделия" width={228} height={228}/>
                        <h4 className={styles.card__title}>{card.title}</h4>
                        <p className={styles.card__number}>{card.number}</p>
                        <div className={styles.card__info}>
                          <div className={styles.card__infoItem}>
                            <div className={styles.card__label}>Тираж</div>
                            <div className={styles.card__description}>{card.circulation}</div>
                          </div>
                          <div className={styles.card__infoItem}>
                            <div className={styles.card__label}>Опубликовано</div>
                            <div className={styles.card__description}>{card.datePublished}</div>
                          </div>
                          <div className={styles.card__infoItem}>
                            <div className={styles.card__label}>Бюджет</div>
                            <div className={styles.card__description}>{card.budget} ₽</div>
                          </div>
                          <div className={styles.card__infoItem}>
                            <div className={styles.card__label}>Сдача</div>
                            <div className={styles.card__description}>{card.dateChange}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )})}
              </div>
              <div className={styles.landing__fullOrders}>
                <Link to='/profile/registry'>Показать еще</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
 );
}
 
export default Home;
