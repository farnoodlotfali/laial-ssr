import {
  Drawer,
  ListItem,
  ListItemText,
  SwipeableDrawer,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  AccountCircleRounded,
  CloseRounded,
  ExitToAppRounded,
  PersonRounded,
} from '@material-ui/icons';
import Link from 'next/link';
import { Fragment, useContext, useState } from 'react';
import appContext from '../contexts/app/appContext';
import styles from '../styles/RightList.module.css';
// const [x, showx] = useState(true);
import CssBaseline from '@material-ui/core/CssBaseline';
import authContext from '../contexts/auth/authContext';
const useStyles = makeStyles({
  paper: {
    backgroundImage:
      'linear-gradient(to bottom right , rgb(18, 18, 18), rgb(72, 76, 87)) ',
    boxShadow: ' 5px 18px 18px 0 rgba(168, 179, 211, 0.38)',
  },
});
const RightList = () => {
  const { user, logout } = useContext(authContext);

  const { showRightList, RightList, menu } = useContext(appContext);
  const classes = useStyles();
  return (
    <div className={`${styles.phoneList} phoneList`}>
      <CssBaseline />
      <Fragment key={'right'}>
        <Drawer
          classes={{ paper: classes.paper }}
          anchor={'right'}
          open={RightList}
          onClose={() => showRightList(false)}
          // onOpen={() => showRightList(true)}
        >
          <h4
            className={`${styles.phoneList__title} p-3 d-flex justify-content-around text-light`}
          >
            <div
              className={` ${styles.phoneList__title__close}   align-self-center`}
              onClick={() => showRightList(false)}
            >
              <CloseRounded />
            </div>
            {user ? (
              <div className='phoneList__user'>
                <span className='ml-2'>{user.first_name}</span>
                <AccountCircleRounded />
              </div>
            ) : (
              <div onClick={() => showRightList(false)}>
                <Link className={styles.phoneList__loginBTn} href='/login'>
                  ورود/ثبت نام
                </Link>
              </div>
            )}
          </h4>

          <div className={styles.phoneList__list}>
            {menu &&
              menu.map((item) =>
                item.absolute === true ? (
                  <div
                    key={item.id}
                    className={styles.phoneList__item}
                    onClick={() =>
                      window.open(`${item.url}`) & showRightList(false)
                    }
                  >
                    <ListItem
                      classes={{
                        body1: classes.body1Text,
                      }}
                      button
                      key={item.name}
                    >
                      <ListItemText
                        className={styles.item}
                        primary={item.name}
                      />
                    </ListItem>
                  </div>
                ) : (
                  <Link
                    key={item.id}
                    href={`${item.url === '/' ? item.url : '/' + item.url}`}
                  >
                    <div
                      onClick={() => showRightList(false)}
                      className={styles.phoneList__item}
                    >
                      <ListItem button key={item.name}>
                        <ListItemText
                          className={styles.item}
                          primary={item.name}
                        />
                      </ListItem>
                    </div>
                  </Link>
                )
              )}
            {user && (
              <div
                className={styles.phoneList__item}
                onClick={() => showRightList(false)}
              >
                <Link href='/myprofile'>
                  <ListItem className={styles.item} button key={'پروفایل'}>
                    <PersonRounded className='' />
                    <ListItemText primary={'پروفایل'} />
                  </ListItem>
                </Link>
              </div>
            )}
            {user && (
              <div
                className={styles.phoneList__item}
                onClick={() => logout() & showRightList(false)}
              >
                <ListItem className={styles.item} button key={'خروج از حساب'}>
                  <ExitToAppRounded className='' />
                  <ListItemText primary={'خروج از حساب'} />
                </ListItem>
              </div>
            )}
          </div>
        </Drawer>
      </Fragment>
    </div>
  );
};

export default RightList;
