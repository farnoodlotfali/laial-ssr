import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Login.module.css";
import authContext from "../contexts/auth/authContext";
import loginBackGround from "../public/login.jpg";
import { useRouter } from "next/router";
const Login = () => {
  const { login, user, error } = useContext(authContext);
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
              <div className={`${styles.notRegister} pt-2`}>
                <Link href="/forgetpass">
                  <span className={styles.register}> فراموشی رمز عبور؟</span>
                </Link>
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
