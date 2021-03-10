import { PlayArrowRounded } from '@material-ui/icons';
import Link from 'next/link';
import styles from '../../styles/RowItem.module.css';

const RowItem = ({ media, person, slug, context }) => {
  const truncate = (str, no_words) => {
    return str?.split(' ').splice(0, no_words).join(' ');
  };
  return (
    <div className={styles.rowItem}>
      {/* <span></span>
      <span></span>
      <span></span>
      <span></span> */}

      <div className={`${styles.rowItem__image}`}>
        <img
          className={`${styles.rowItem__image__img}`}
          src={person?.[0]?.image.full_image_url}
          alt='logo'
        />

        <div className={styles.play__music}>
          <PlayArrowRounded />
        </div>
      </div>
      <div className='rowItem__info '>
        <Link href={`/song/${slug}`}>
          <h4 className={`${styles.rowItem__title} text-center`}>
            {truncate(media?.name, 4)}
            {/* {media?.name} */}
          </h4>
        </Link>
        <Link href={`/person/${person?.[0]?.slug}`}>
          <h4 className={`${styles.rowItem__person} text-center`}>
            {/* حاج محمد شریفی */}
            {person?.[0]?.name}
          </h4>
        </Link>{' '}
      </div>
    </div>
  );
};

export default RowItem;
