import { useContext } from 'react';
import styles from '../styles/phoneMenu.module.css';
import appContext from '../contexts/app/appContext';
import {
  Headset,
  Home,
  MenuRounded,
  MusicNote,
  Search,
} from '@material-ui/icons';
import Link from 'next/link';
const PhoneMenu = () => {
  const {
    showRightList,
    RightList,
    showCenterList,
    centerList,
    ChangeShowMusic,
    showMusic,
  } = useContext(appContext);
  return (
    <div className={styles.phoneMenu}>
      <div className='phoneMenu__items d-flex justify-content-around py-2 '>
        <div
          className={styles.phoneMenu__item}
          onClick={() => showRightList(RightList ? false : true)}
        >
          <MenuRounded fontSize='large' />
        </div>
        <div className={styles.phoneMenu__item}>
          <Link href='/'>
            <Home fontSize='large' />
          </Link>
        </div>
        <div className={styles.phoneMenu__item}>
          <Link href='/search'>
            <Search fontSize='large' />
          </Link>
        </div>
        <div
          className={styles.phoneMenu__item}
          onClick={() => showCenterList(centerList ? false : true)}
        >
          <Headset fontSize='large' />
        </div>
        <div
          className={styles.phoneMenu__item}
          onClick={() => ChangeShowMusic(showMusic ? false : true)}
        >
          <MusicNote fontSize='large' />
        </div>
      </div>
    </div>
  );
};

export default PhoneMenu;
