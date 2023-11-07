import styles from './LandingCarusel.module.scss'

import { Navigation, Pagination, Scrollbar, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import Img1 from 'public/Landing/card_img_1.png'
import Img2 from 'public/Landing/card_img_2.png'
import Img3 from 'public/Landing/card_img_3.png'

import Image from "next/image"


const LandingCarusel = () => {
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
    },
  ]
  return ( 
   <div className={styles.slider}>
     <Swiper
        modules={[Navigation, Pagination, Scrollbar, Autoplay ]}
        cssMode={true}
        navigation={true}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        mousewheel={true}
        keyboard={true}
        spaceBetween={20}
      
        autoplay={{
          delay: 10000,
        }}
        
        breakpoints={{
          520: {

            slidesPerView: 1,
          },
         
          640: {

            slidesPerView: 2,
          },
          
          768: {

            slidesPerView: 3,
          },
        }}
        className={styles.swiper}
      >
        {cards.map((card, index) => {
          return (
            <SwiperSlide>
              <div key={index} className={styles.card__item}>
                <div className={styles.card__body}>
                  <Image 
                    src={card.img} 
                    alt="Фото изделия"  
                    width={228} 
                    height={228}
                    placeholder='blur'
                  />
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
            </SwiperSlide>
          )})}
            <SwiperSlide>
                <div className={styles.cardRegistru}>
                  <div className={styles.cardRegistru__body}>
                    <h1>Смотри больше</h1>
                  </div>
                </div>
            </SwiperSlide>
      </Swiper>
   </div>
   );
}
 
export default LandingCarusel;