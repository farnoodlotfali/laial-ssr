import Link from 'next/link';
import { useContext, useEffect } from 'react';
import authContext from '../contexts/auth/authContext';
import styles from '../styles/Page404.module.css';

const Page404 = () => {
  const { user, loadUser } = useContext(authContext);

  useEffect(() => {
    loadUser();
  }, [user]);
  return (
    <div className={`${styles.notFound} d-flex`}>
      <div className={` ${styles.notFound__content}  justify-content-center`}>
        <h1 className={`${styles.notfound__title} my-3`}>404</h1>
        <h2 className={`${styles.notfound__desc}`}>صفحه مورد نظر یافت نشد</h2>
        <Link
          href='/'
          //  dideo-checked='true'
        >
          صفحه اصلی
        </Link>
      </div>
    </div>
  );
};

export default Page404;
