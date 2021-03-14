import { Swiper, SwiperSlide } from 'swiper/react';
import styles from '../../styles/Rowlist.module.css';
import Link from 'next/link';
import Flickity from 'react-flickity-component';
import RowItem from './RowItem';
import { ChevronLeftRounded } from '@material-ui/icons';
const Rowlist = ({ slug, id, title, data }) => {
  // console.log(data);
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  const { context, pageinate } = data;
  return (
    <div
      className={`${styles.rowlist} ${
        id === 1 ? ` ${styles.top__radius}` : ''
      }`}
    >
      <div className={`${styles.rowList__title} d-flex `}>
        <Link href={`/moresong/${slug}`}>
          <div className={` ${styles.rowList__title__title} mx-3`}>{title}</div>
        </Link>
        {pageinate === true ? (
          <Link href={`/moresong/${slug}`}>
            <div className={`align-self-center ${styles.moreSong} mr-3`}>
              نمایش همه
              <ChevronLeftRounded className='align-self-center' />
            </div>
          </Link>
        ) : (
          ''
        )}
      </div>

      <Flickity className={`carousel col px-2 py-0`} options={flickityOptions}>
        {context.map((item, i) => {
          // console.log(item);
          return (
            <RowItem
              key={item.id}
              logo={item.image}
              media={item.media[0]}
              person={item.person}
              slug={item.slug}
              context={context}
            />
          );
        })}
      </Flickity>
    </div>
  );
};

export default Rowlist;
