// import { Swiper, SwiperSlide } from "swiper/react";
import styles from "../styles/TileBanner.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Flickity from "react-flickity-component";

const TileBanner = ({ imgs }) => {
  const [images, setimages] = useState(false);
  const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  const myloader = ({ src }) => {
    return src;
  };
  useEffect(() => {
    imgs && setimages(true);
  }, []);
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  return (
    <div className={styles.tileBanner}>
      <Flickity className={styles.carousel} options={flickityOptions}>
        {imgs.map((img, i) => (
          <div key={i} className={styles.carouselCell}>
            <Image
              className={styles.itemImg}
              src={img?.full_image_url}
              unoptimized
              // alt="logo"
              loading="lazy"
              loader={myloader}
              placeholder="blur"
              blurDataURL={`data:image/svg+xml;base64,${toBase64(
                shimmer(700, 475)
              )}`}
              layout="fill"
            />
            {images && img.url && (
              <div className={styles.tileBanner__show}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                {img.absolute ? (
                  <a dideo-checked="true" href={`${img.url}`}>
                    نمایش
                  </a>
                ) : (
                  <Link href={`${img?.url}`}>نمایش</Link>
                )}
              </div>
            )}
          </div>
        ))}
      </Flickity>
    </div>

    // <Swiper
    //   className={styles.tileBannerSlider}
    //   dir="rtl"
    //   freeMode={true}
    //   // slidesPerView={3}
    //   slidesPerView={3}
    //   breakpoints={{
    //     270: {
    //       height: 125,
    //       slidesPerView: 2.2,
    //     },
    //     768: {
    //       slidesPerView: 3,
    //       height: 170,
    //     },

    //     1024: {
    //       slidesPerView: 4.5,
    //       // spaceBetween: 50,
    //     },
    //   }}
    //   spaceBetween={10}
    // >
    //   {imgs.map((img, i) => (
    //     <SwiperSlide key={i} className={styles.tileBannerPart}>
    //       {/* <img
    //         className={styles.itemImg}
    //         src={img?.full_image_url}
    //         alt="logo"
    //       /> */}
    //       <Image
    //         className={styles.itemImg}
    //         src={img?.full_image_url}
    //         unoptimized
    //         // alt="logo"
    //         loading="lazy"
    //         loader={myloader}
    //         placeholder="blur"
    //         blurDataURL={`data:image/svg+xml;base64,${toBase64(
    //           shimmer(700, 475)
    //         )}`}
    //         layout="fill"
    //       />

    //       {images && img.url && (
    //         <div className={styles.tileBanner__show}>
    //           <span></span>
    //           <span></span>
    //           <span></span>
    //           <span></span>
    //           {img.absolute ? (
    //             <a dideo-checked="true" href={`${img.url}`}>
    //               نمایش
    //             </a>
    //           ) : (
    //             <Link href={`${img?.url}`}>نمایش</Link>
    //           )}
    //         </div>
    //       )}
    //     </SwiperSlide>
    //   ))}
    // </Swiper>
  );
};

export default TileBanner;
