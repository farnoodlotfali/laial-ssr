import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../styles/TileBanner.module.css";

const TileBanner = ({ imgs }) => {
  return (
    <Swiper
      className={styles.tileBannerSlider}
      dir="rtl"
      freeMode={true}
      // slidesPerView={3}
      slidesPerView={3}
      breakpoints={{
        270: {
          height: 125,
          slidesPerView: 2.2,
        },
        768: {
          slidesPerView: 3,
          height: 170,
        },

        1024: {
          slidesPerView: 4.5,
          // spaceBetween: 50,
        },
      }}
      spaceBetween={10}
    >
      {imgs.map((img, i) => (
        <SwiperSlide key={i} className={styles.tileBannerPart}>
          <img
            className={styles.itemImg}
            src={img?.full_image_url}
            alt="logo"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TileBanner;
