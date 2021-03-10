import styles from '../styles/x.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, EffectFade } from 'swiper';

const Banner = ({ imgs }) => {
  SwiperCore.use([Autoplay, EffectFade]);
  // console.log(imgs);
  return (
    <Swiper
      className={styles.xslider}
      fadeEffect={{ crossFade: true }}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      effect='fade'
      //   onSlideChange={() => console.log('slide change')}
      //   onSwiper={(swiper) => console.log(swiper)}
    >
      {imgs.map((img, i) => (
        <SwiperSlide key={i}>
          <img
            style={{ width: '100%', height: '100%' }}
            src={img.src}
            alt='bannerImage'
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
