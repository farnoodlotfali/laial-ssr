import {
  AccountCircleRounded,
  ExitToAppRounded,
  PersonRounded,
} from '@material-ui/icons';
import Link from 'next/link';
import { Dropdown } from 'react-bootstrap';
import Headroom from 'react-headroom';
import styles from '../styles/Header.module.css';
const Header = () => {
  return (
    <Headroom>
      <div className={styles.header}>
        <div className={styles.headerItems}>
          <div className={styles.headerItemsRight}>
            <ul>
              <li className='   mx-3'> منو اصلی</li>
              <Link href='/search'>جستجو</Link>
              <li className=' mx-3 '>لیست من</li>
            </ul>
          </div>
          <div className={styles.headerItemsLeft}>
            <Dropdown>
              <Dropdown.Toggle
                className={styles.dropdownBtn}
                id='dropdown-basic'
              >
                {/* <span className='ml-2'>{user.first_name}</span> */}
                <span>farnood</span>
                <AccountCircleRounded />
              </Dropdown.Toggle>

              <Dropdown.Menu className={styles.dropdownMenu}>
                <Dropdown.Item
                  className={styles.dropdownItem}
                  href='#/action-1'
                >
                  <span>پروفایل</span>
                  <PersonRounded className='' />
                </Dropdown.Item>
                <Dropdown.Item
                  className={styles.dropdownItem}
                  href='#/action-2'
                >
                  <span> خروج از حساب</span>
                  <ExitToAppRounded className='' />
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </Headroom>
  );
};

export default Header;
