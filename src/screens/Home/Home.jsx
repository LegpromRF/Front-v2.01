import styles from "./Home.module.scss";
import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCards, getTotalCardsInfo } from "@store/procurementRegister/procRegister.slice";
// import HeaderLanding from '@/layout/HeaderLanding/HeaderLanding';
import HeaderLanding from "@/layout/HeaderLanding/HeaderLanding.jsx";
import Img1 from "@public/Landing/card_img_1.png";
import Img2 from "@public/Landing/card_img_2.png";
import Img3 from "@public/Landing/card_img_3.png";

import PurchaseModal from "@/components/PurchaseModal/PurchaseModal";
// import LandingCarusel from '@/src/components/LandingCarusel/LandingCarusel';
// import ModalAuth from "@/src/layout/Modal/ModalAuth/ModalAuth";
import { Link, useParams, useSearchParams } from "react-router-dom";
import CardItem from "../../components/CardItem/CardItem";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isPurchase = searchParams.get("purchase") === "true";
  const [isPurchaseModalOpen, setPurchaseModalOpen] = useState(isPurchase);
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.procRegister.cards) || [];
  useEffect(() => {
    const query = "";
    dispatch(getAllCards(query));
    dispatch(getTotalCardsInfo());
  }, []);

  const openPurchaseModal = () => setPurchaseModalOpen(true);
  const closePurchaseModal = () => {
    searchParams.delete("purchase");
    setSearchParams(searchParams);
    setPurchaseModalOpen(false);
  };
  console.log(cards);
  const cardsToPreview = useMemo(() => {
    const sortedCards = [...cards];
    sortedCards.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    let currentCards = [];

    for (const card of sortedCards) {
      if (card.photo_urls) currentCards.push(card);
      if (currentCards.length == 3) break;
    }

    currentCards = currentCards.map((card) => ({
      img: card.photo_urls?.split(",")[0],
      title: card.clothes_name,
      number: "№" + card.order_number,
      circulation: card.count,
      datePublished: card.created_at?.split("T")[0],
      budget: card.price_for_all?.toLocaleString(),
      dateChange: card.deadline?.split("T")[0],
    }));

    return currentCards;
  }, [cards.length]);

  const countOpenedCards = useSelector(store => store.procRegister.totalCards) || 0
  const sumOpenedCards = useSelector(store => store.procRegister.totalSumCards) || 0

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
                <h4 className={styles.landing__subTitle1}>
                  Получите доступ к единому реестру заказов на пошив
                </h4>
                <h1 className={styles.landing__title}>
                  Сервис заявок на пошив для швейных производств № 1 в РФ
                </h1>
                <h3 className={styles.landing__subTitle2}>
                  Выбирайте максимально целевые заказы в любой момент времени,
                  сократите простои и увеличьте прибыльность вашего швейного
                  производства на текущих ресурсах
                </h3>
                <div className={styles.landing__advantages1}>
                  <div className={styles.landing__advantages1__block}>
                    <span>
                      Заявки от <b>крупных фабрик</b> для распределения объемов
                      на субподряд
                    </span>
                  </div>
                  <div className={styles.landing__advantages1__block}>
                    <span>
                      Заявки <b>от брендов</b> на пошив коллекций одежды для
                      продажи
                    </span>
                  </div>
                  <div className={styles.landing__advantages1__block}>
                    <span>
                      Заявки <b>от B2B-компаний</b> на пошив униформы и мерча
                      для собственного использования
                    </span>
                  </div>
                  <div className={styles.landing__advantages1__block}>
                    <span>
                      Заявки <b>от розничных магазинов</b> для пополнения
                      ассортимента на полках
                    </span>
                  </div>
                  <div className={styles.landing__advantages1__block}>
                    <span>
                      Тендерные закупки по ФЗ-44, 223{" "}
                      <b>от гос.компаний и корпораций</b>, планы гос. закупок
                    </span>
                  </div>
                </div>
                <div className={styles.landing__auth}>
                  <button
                    onClick={openPurchaseModal}
                    aria-label="Модальное окно оплаты"
                    aria-expanded={isPurchaseModalOpen}
                  >
                    Купить подписку
                    <span>2 900 ₽/мес</span>
                  </button>
                </div>
                <div className={styles.landing__text}>
                  <span>
                    &bull; прямые контакты заказчиков доступны сразу после
                    оплаты подписки
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.landing__right}>
              <div className={styles.landing__advantages2}>
                <div className={styles.landing__advantages2__block}>
                  <span>
                    Более <b>3 000 000 000 ₽</b> объём заказов, размещённых за
                    2023 год
                  </span>
                </div>
                <div className={styles.landing__advantages2__block}>
                  <span>
                    Более <b>100</b> новых оптовых заявок на пошив ежедневно
                  </span>
                </div>
                <div className={styles.landing__advantages2__block}>
                  <span>
                    Суммарная потребность более <b>200</b> млн руб./мес
                  </span>
                </div>
                <div className={styles.landing__advantages2__block}>
                  <span>
                    Средняя сумма заказа <b>350 тыс. ₽ — 2,5 млн ₽</b>
                  </span>
                </div>
              </div>
              <div className={styles.landing__textAll}>
                <span>
                  Сейчас открыто: <b>{countOpenedCards}</b>
                  {[11, 12, 13, 14].includes(countOpenedCards % 100) ||
                  [0, 5, 6, 7, 8, 9].includes(countOpenedCards % 10)
                    ? " заявок "
                    : countOpenedCards % 10 == 1
                    ? " заявка "
                    : " заявки "}
                  на сумму{" "}
                  <b>
                    {sumOpenedCards}{" "}
                    {sumOpenedCards || sumOpenedCards === 0 ? "₽" : ""}
                  </b>
                </span>
              </div>
              <div className={styles.card}>
                {cardsToPreview.map((card, index) => {
                  return <CardItem card={card} key={index} />;
                })}
              </div>
              <div className={styles.landing__fullOrders}>
                <Link to="/profile/registry">Показать еще</Link>
              </div>
            </div>
          </div>
          <div className={styles.landing__advantages3}>
            <div className={styles.landing__advantages3__block}>
              <span>
                Все заказы, опубликованные на 20+ интернет-ресурсах доступны
                моментально в одном окне
              </span>
            </div>
            <div className={styles.landing__advantages3__block}>
              <span>
                Выгода более 5 000 ₽, если купить подписки ко всем другим
                площадкам
              </span>
            </div>
            <div className={styles.landing__advantages3__block}>
              <span>
                Менеджеры связываются с заказчиками по всем заявкам и
                актуализируют их вручную
              </span>
            </div>
            <div className={styles.landing__advantages3__block}>
              <span>
                Фильтры для отбора заказов регионам и условиям закупки
              </span>
            </div>
            <div className={styles.landing__advantages3__block}>
              <span>
                Структура заявки позволяет быстро понять, интересен заказ или
                нет и экономить время на выяснении деталей у заказчиков
              </span>
            </div>
            <div className={styles.landing__advantages3__block}>
              <span>
                Моментальное уведомление о новых опубликованных заказах через
                Телеграм-канал
              </span>
            </div>
          </div>
        </div>
        <PurchaseModal
          isOpen={isPurchaseModalOpen}
          close={closePurchaseModal}
        />
      </main>
    </>
  );
};

export default Home;
