import zIndex from "@material-ui/core/styles/zIndex";
import {
  AccountCircleRounded,
  ExitToAppRounded,
  HomeRounded,
  MenuRounded,
  PersonRounded,
  QueueMusicRounded,
  SearchRounded,
} from "@material-ui/icons";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import Headroom from "react-headroom";
import appContext from "../contexts/app/appContext";
import authContext from "../contexts/auth/authContext";
import styles from "../styles/Header.module.css";

const Header = () => {
  const { showRightList, RightList, showCenterList, centerList } =
    useContext(appContext);
  const { isAuth, user, logout } = useContext(authContext);
  const [hasUser, setHasUser] = useState(false);

  useEffect(() => {
    if (!user) {
      setHasUser(false);
    } else {
      setHasUser(true);
    }
  }, [user]);
  return (
    <Headroom style={{ zIndex: 2 }}>
      <div className={styles.header}>
        <div className={styles.headerItems}>
          <div className={styles.headerItemsRight}>
            <ul>
              <li
                onClick={() => showRightList(RightList ? false : true)}
                className="   mx-3"
              >
                <MenuRounded fontSize={"small"} />
                منو اصلی
              </li>
              <Link href="/" checked>
                <span>
                  <HomeRounded fontSize={"small"} />
                  خانه
                </span>
              </Link>
              <Link href="/search" checked>
                <span>
                  <SearchRounded fontSize={"small"} />
                  جستجو
                </span>
              </Link>

              {hasUser && (
                <li
                  onClick={() => showCenterList(centerList ? false : true)}
                  className=" mx-3 "
                >
                  <QueueMusicRounded fontSize={"small"} />
                  لیست من
                </li>
              )}
            </ul>
          </div>
          {hasUser ? (
            <div className={styles.headerItemsLeft}>
              <Dropdown>
                <Dropdown.Toggle
                  className={styles.dropdownBtn}
                  id="dropdown-basic"
                >
                  {hasUser && (
                    <span className={styles.dropdownUserName}>
                      {user?.first_name}
                    </span>
                  )}
                  <AccountCircleRounded />
                </Dropdown.Toggle>

                <Dropdown.Menu className={styles.dropdownMenu}>
                  <Dropdown.Item className={styles.dropdownItem}>
                    <Link href="/myprofile">
                      <span>پروفایل</span>
                    </Link>
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
          ) : (
            <Link href="/login">
              <span
                className={`${styles.registerBtn} d-flex  justify-content-center align-self-center `}
              >
                ورود/ثبت نام
              </span>
            </Link>
          )}
        </div>
      </div>
    </Headroom>
  );
};

export default Header;
