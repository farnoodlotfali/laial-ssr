import {
  AccountCircleRounded,
  ExitToAppRounded,
  PersonRounded,
} from "@material-ui/icons";
import Link from "next/link";
import { useContext, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import Headroom from "react-headroom";
import appContext from "../contexts/app/appContext";
import authContext from "../contexts/auth/authContext";
import styles from "../styles/Header.module.css";
const Header = () => {
  const { showRightList, RightList, showCenterList, centerList } = useContext(
    appContext
  );
  const { isAuth, user, logout } = useContext(authContext);
  return (
    // <Headroom className={styles.headeroom}>
    <div className={styles.header}>
      <div className={styles.headerItems}>
        <div className={styles.headerItemsRight}>
          <ul>
            <li
              onClick={() => showRightList(RightList ? false : true)}
              className="   mx-3"
            >
              منو اصلی
            </li>
            <Link href="/search">جستجو</Link>
            {user && (
              <li
                onClick={() => showCenterList(centerList ? false : true)}
                className=" mx-3 "
              >
                لیست من
              </li>
            )}
          </ul>
        </div>
        {/* {user !== null ? ( */}
        <div className={styles.headerItemsLeft}>
          <Dropdown>
            <Dropdown.Toggle className={styles.dropdownBtn} id="dropdown-basic">
              {/* <span className='ml-2'>{user.first_name}</span> */}
              <AccountCircleRounded />
            </Dropdown.Toggle>

            <Dropdown.Menu className={styles.dropdownMenu}>
              <Dropdown.Item className={styles.dropdownItem}>
                <span>پروفایل</span>
                <PersonRounded className="" />
              </Dropdown.Item>
              <Dropdown.Item
                className={styles.dropdownItem}
                onClick={() => logout()}
              >
                <span> خروج از حساب</span>
                <ExitToAppRounded className="" />
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {/* ) : ( */}
        {/* <Link href='/login'>
            <span
              className={`${styles.registerBtn} d-flex  justify-content-center align-self-center `}
            >
              ورود/ثبت نام
              <AccountCircleRounded />
            </span>
          </Link> */}
        {/* )} */}
      </div>
    </div>
    // </Headroom>
  );
};

export default Header;
