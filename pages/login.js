import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import authContext from "../contexts/auth/authContext";
import { useRouter } from "next/router";
import Head from "next/head";
import playerContext from "../contexts/player/playerContext";
import appContext from "../contexts/app/appContext";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { CloseRounded } from "@material-ui/icons";

const Login = () => {
  const { login, user, error } = useContext(authContext);
  const { playing } = useContext(playerContext);
  const { forgetPassword } = useContext(appContext);
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    // console.log(user);
    if (user) {
      // props.history.back();
      router.back();
    }
    // eslint-disable-next-line
  }, [user]);

  const { email, password } = userInfo;
  const onchange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const [emailForRest, setEmailForRest] = useState("");
  const [forgetPasswordMsg, setForgetPasswordMsg] = useState("");
  const [open, setOpen] = useState(false);
  const [showMsg, setShowMsg] = useState({
    showMsg: false,
    msg: " ",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div
      className={styles.login}
      style={{
        backgroundPosition: " center",
        backgroundSize: "cover",
        objectFit: "contain",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
      }}
    >
      <Head>{!playing && <title> ورود</title>}</Head>
      {/* <div className={styles.color}></div>
      <div className={styles.color}></div>
      <div className={styles.color}></div> */}
      <div className={styles.box}>
        {/* <div className={styles.square} style={{ i: "0" }}></div>
        <div className={styles.square} style={{ i: "1" }}></div>
        <div className={styles.square} style={{ i: "2" }}></div>
        <div className={styles.square} style={{ i: "3" }}></div>
        <div className={styles.square} style={{ i: "4" }}></div> */}
        <div className={styles.login__container}>
          <div className={styles.form}>
            <h2 className="text-center">ورود</h2>
            <form
              onSubmit={async (e) => {
                e.preventDefault();

                await login({
                  email,
                  password,
                });
              }}
            >
              <div className={styles.inputBox}>
                <input
                  onChange={onchange}
                  name="email"
                  type="email"
                  value={email}
                  placeholder="ایمیل"
                  required
                />
              </div>{" "}
              <div className={styles.inputBox}>
                <input
                  required
                  onChange={onchange}
                  name="password"
                  value={password}
                  type="password"
                  placeholder="رمز ورود"
                  minLength="8"
                />
              </div>
              <div className={`${styles.error__msg__login} pt-2 `}>
                {error && "! کاربری با این مشخصات یافت نشد"}
              </div>
              <div className={`${styles.notRegister} pt-2`}>
                <span>ثبت نام نکرده اید؟</span>

                <Link href="/register">
                  <span className={styles.register}> ثبت نام</span>
                </Link>
              </div>
              <div className={`${styles.forgetPass} text-center pt-2`}>
                <span className={`${styles.register}  `} onClick={handleOpen}>
                  فراموشی رمز عبور؟
                </span>
                <Modal
                  className={styles.forgetPassModal}
                  // className={classes.modal}
                  open={open}
                  onClose={handleClose}
                  closeAfterTransition
                  BackdropComponent={Backdrop}
                  BackdropProps={{
                    timeout: 500,
                  }}
                >
                  <Fade in={open}>
                    <div className={styles.forgetPass__content}>
                      <div
                        className={styles.forgetPass__content__close}
                        onClick={handleClose}
                      >
                        <CloseRounded />
                      </div>
                      <h2>فراموشی رمز</h2>
                      <p>ایمیل خود را جهت بازیابی رمز وارد کنید</p>
                      <div className={styles.forgetPass__form}>
                        <input
                          onChange={(e) => setEmailForRest(e.target.value)}
                          name="emailForRest"
                          value={emailForRest}
                          type="email"
                        />

                        <button
                          onClick={async () => {
                            const status = await forgetPassword(emailForRest);
                            if (status === 200) {
                              setForgetPasswordMsg(
                                "درخواست شما ثبت شد،لطفا صندوق ایمیل خود را چک کنید"
                              );
                            } else {
                              setForgetPasswordMsg("!خطا");
                            }
                            setTimeout(() => {
                              setOpen(false);
                            }, 6000);
                          }}
                        >
                          بازیابی
                        </button>
                        <div className={styles.forgetPasswordMsg}>
                          {forgetPasswordMsg}
                        </div>
                      </div>
                    </div>
                  </Fade>
                </Modal>
              </div>
              {/* <div className={`${styles.formMsg }pt-2`}>{errorMsg}</div> */}
              <div className={`${styles.inputBox} text-center`}>
                <input type="submit" value="ورود" />
              </div>
            </form>
            <div className="policy_page_login text-primary w-100 text-left">
              <Link href="/privacy-policy">سیاست حفظ حریم خصوصی </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
