import styles from './Home.module.scss'
// import HeaderLanding from '@/layout/HeaderLanding/HeaderLanding';
import HeaderLanding from '@/layout/HeaderLanding/HeaderLanding.jsx'
import Img1 from '@public/Landing/card_img_1.png'
import Img2 from '@public/Landing/card_img_2.png'
import Img3 from '@public/Landing/card_img_3.png'

// import LandingCarusel from '@/src/components/LandingCarusel/LandingCarusel';
// import {useState} from "react";
// import ModalAuth from "@/src/layout/Modal/ModalAuth/ModalAuth";
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

            <HeaderLanding/>
            <main className="page landing">
                <div className="landing__container">
                    <div className={styles.landing__wrapper}>
                        <div className={styles.landing__left}>
                            <div className={styles.landing__content}>
                                <h4 className={styles.landing__subTitle1}>
                                    Получите доступ к единому реестру заказов на пошив
                                </h4>
                                <h1 className={styles.landing__title}>
                                    Сервис заявок на пошив для
                                    швейных производств № 1 в РФ
                                </h1>
                                <h3 className={styles.landing__subTitle2}>
                                    Выбирайте максимально целевые заказы в любой момент времени, сократите простои и
                                    увеличьте прибыльность вашего швейного производства на текущих ресурсах
                                </h3>
                                <div className={styles.landing__advantages1}>
                                    <div className={styles.landing__advantages1__block}>
                                        <span >
                                            Заявки от <b>крупных фабрик</b> для распределения объемов на субподряд
                                        </span>
                                    </div>
                                    <div className={styles.landing__advantages1__block}>
                                        <span >
                                            Заявки <b>от брендов</b> на пошив коллекций одежды для продажи
                                        </span>
                                    </div>
                                    <div className={styles.landing__advantages1__block}>
                                        <span >
                                            Заявки <b>от B2B-компаний</b> на пошив униформы и мерча для собственного использования
                                        </span>
                                    </div>
                                    <div className={styles.landing__advantages1__block}>
                                        <span >
                                            Заявки <b>от розничных магазинов</b> для пополнения ассортимента на полках
                                        </span>
                                    </div>
                                    <div className={styles.landing__advantages1__block}>
                                        <span >
                                            Тендерные закупки по ФЗ-44, 223 <b>от гос.компаний и корпораций</b>,  планы гос. закупок
                                        </span>
                                    </div>


                                </div>
                                <div className={styles.landing__auth}>
                                    <button>
                                        Купить подписку
                                        <span>
                                            4 800 ₽/мес
                                        </span>
                                    </button>
                                </div>
                                <div className={styles.landing__text}>
                                    <span>
                                        &bull; прямые контакты заказчиков доступны сразу после оплаты подписки
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.landing__right}>
                            <div className={styles.landing__advantages2}>
                                <div className={styles.landing__advantages2__block}>
                                    <span>
                                        Более 3000 000 000 ₽ объём заказов, размещённых за 2023 год
                                    </span>
                                </div>
                                <div className={styles.landing__advantages2__block}>
                                    <span>
                                        Более 100 новых оптовых заявок на пошив ежедневно
                                    </span>
                                </div>
                                <div className={styles.landing__advantages2__block}>
                                    <span>
                                        Суммарная потребность более 200 млн руб./мес
                                    </span>
                                </div>
                                <div className={styles.landing__advantages2__block}>
                                    <span>
                                        Средняя сумма заказа 350 тыс. ₽ — 2,5 млн ₽
                                    </span>
                                </div>

                            </div>
                            <div className={styles.landing__textAll}>
                                <span >
                                    Сейчас открыто <b>X XXX</b> заявок на сумму <b>XXX XXX XXX ₽</b>
                                </span>
                            </div>
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
                                                        <div
                                                            className={styles.card__description}>{card.circulation}</div>
                                                    </div>
                                                    <div className={styles.card__infoItem}>
                                                        <div className={styles.card__label}>Опубликовано</div>
                                                        <div
                                                            className={styles.card__description}>{card.datePublished}</div>
                                                    </div>
                                                    <div className={styles.card__infoItem}>
                                                        <div className={styles.card__label}>Бюджет</div>
                                                        <div className={styles.card__description}>{card.budget} ₽</div>
                                                    </div>
                                                    <div className={styles.card__infoItem}>
                                                        <div className={styles.card__label}>Сдача</div>
                                                        <div
                                                            className={styles.card__description}>{card.dateChange}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className={styles.landing__fullOrders}>
                                <Link to='/profile/registry'>Показать еще</Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.landing__advantages3}>
                        <div className={styles.landing__advantages3__block}>
                            <span>
                                Все заказы, опубликованные на 20+ интернет-ресурсах доступны моментально в одном окне
                            </span>
                        </div>
                        <div className={styles.landing__advantages3__block}>
                            <span>
                                Выгода более 5 000 ₽, если купить подписки ко всем другим площадкам
                            </span>
                        </div>
                        <div className={styles.landing__advantages3__block}>
                            <span>
                                Менеджеры связываются с заказчиками по всем заявкам и актуализируют их вручную
                            </span>
                        </div>
                        <div className={styles.landing__advantages3__block}>
                            <span>
                                Фильтры для отбора заказов регионам и условиям закупки
                            </span>
                        </div>
                        <div className={styles.landing__advantages3__block}>
                            <span>
                                Структура заявки позволяет быстро понять, интересен заказ или нет и экономить время на выяснении деталей у заказчиков
                            </span>
                        </div>
                        <div className={styles.landing__advantages3__block}>
                            <span>
                                Моментальное уведомление о новых опубликованных заказах через Телеграм-канал

                            </span>
                        </div>
                    </div>


                </div>
            </main>
        </>
    );
}

export default Home;
