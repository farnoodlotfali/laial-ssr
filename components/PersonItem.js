import styles from '../styles/PersonItem.module.css';
import Link from 'next/link';
const PersonItem = ({ id, image, name, slug }) => {
  return (
    <div className={`${styles.personItem} ml-3`}>
      <img
        className='rounded-circle'
        src={image !== null ? image.full_image_url : '/defualtPhoto.jpeg'}
        alt='logo'
      />
      <Link href={`/person/${slug}`} className='personItem__visit '>
        <h4 className={`${styles.personItem__person} text-center my-3`}>
          {/* حاج محمد شریفی */}
          {name}
        </h4>
      </Link>
    </div>
  );
};

export default PersonItem;
