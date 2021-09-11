import Link from "next/link";
import { useContext } from "react";
import { Modal } from "react-bootstrap";
import authContext from "../contexts/auth/authContext";
import styles from "../styles/ForceLogin.module.css";

const ForceLogin = () => {
  const { showLoginModal, changeShowLoginModal } = useContext(authContext);

  return (
    <Modal
      // backdropClassName={styles.forceLogin}
      contentClassName={styles.forceLogin}
      show={showLoginModal}
      onHide={() => changeShowLoginModal(false)}
      className={"p-0"}
    >
      <Modal.Header
        closeButton
        closeLabel=""
        className={styles.forceLoginHeader}
      >
        <Modal.Title className={` w-100 text-center`}>
          {/* لطفا ورود یا ثبت نام کنید */}
          <span className={styles.forceLogin__title}>
            برای شنیدن نوحه لطفاً وارد سایت شوید
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex ">
          <Link href="/register">
            <span
              className={`${styles.forceLogin__btn} `}
              onClick={() => changeShowLoginModal(false)}
            >
              ثبت نام
            </span>
          </Link>
          <Link href="/login">
            <span
              className={styles.forceLogin__btn}
              onClick={() => changeShowLoginModal(false)}
            >
              ورود
            </span>
          </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ForceLogin;
