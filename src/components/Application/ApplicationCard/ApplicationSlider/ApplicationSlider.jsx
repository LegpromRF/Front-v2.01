import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import styles from "./ApplicationSlider.module.scss";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { createImagesSlider } from "../../../../utils/helpers/procurementRegister";

const ApplicationSlider = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const item = useSelector((state) => state.viewTz.item);
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (item.photo_urls) {
      setImages(createImagesSlider(item.photo_urls));
    }
  }, [item]);

  return (
    <div className={styles.wrapper}>
      <div>
        <Swiper
          style={{
            "--swiper-navigation-color": "#fff",
            "--swiper-pagination-color": "#fff",
          }}
          spaceBetween={10}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="application-swiper"
        >
          {images.map((el) => {
            return (
              <SwiperSlide key={el.id}>
                <img src={el.src} alt={el.alt} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      <div className={styles.thumbsWrapper}>
        <div className="thumbs-prev">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8"
            height="29"
            viewBox="0 0 8 29"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.19984 0C6.99505 0 6.79026 0.157887 6.63427 0.472048L0.234588 13.3608C-0.0781961 13.9907 -0.0781961 15.0089 0.234588 15.6388L6.63427 28.5275C6.94705 29.1575 7.45263 29.1575 7.76541 28.5275C8.0782 27.8976 8.0782 26.8794 7.76541 26.2495L1.9313 14.4998L7.76541 2.75013C8.0782 2.12019 8.0782 1.10198 7.76541 0.472048C7.60942 0.157887 7.40463 0 7.19984 0Z"
              fill="#242424"
            />
          </svg>
        </div>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={0}
          slidesPerView={"auto"}
          watchSlidesProgress={true}
          navigation={{
            prevEl: ".thumbs-prev",
            nextEl: ".thumbs-next",
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="swiper-thumbs"
          freeMode={true}
        >
          {images.map((el) => {
            return (
              <SwiperSlide key={el.id}>
                <img src={el.src} alt={el.alt} />
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="thumbs-next">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="7"
            height="29"
            viewBox="0 0 7 29"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M0.70014 0C0.879331 0 1.05852 0.157887 1.19501 0.472048L6.79474 13.3608C7.06842 13.9907 7.06842 15.0089 6.79474 15.6388L1.19501 28.5275C0.921329 29.1575 0.478951 29.1575 0.205265 28.5275C-0.0684218 27.8976 -0.0684218 26.8794 0.205265 26.2495L5.31011 14.4998L0.205265 2.75013C-0.0684218 2.12019 -0.0684218 1.10198 0.205265 0.472048C0.341758 0.157887 0.520949 0 0.70014 0Z"
              fill="#242424"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ApplicationSlider;
