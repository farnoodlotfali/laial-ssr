import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Register.module.css";
import authContext from "../contexts/auth/authContext";
import playerContext from "../contexts/player/playerContext";
import Head from "next/head";
import { useRouter } from "next/router";
const Register = () => {
  const { register, user, loadUser, error } = useContext(authContext);
  const { playing } = useContext(playerContext);
  const [errorMsg, setErrorMsg] = useState("");

  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
  });

  const router = useRouter();
  useEffect(() => {
    // console.log(user);
    if (user) {
      // props.history.back();
      router.push("/user-interests");
    }
    // loadUser();

    // eslint-disable-next-line
  }, [user, router]);
  const { username, email, password, password2, first_name, last_name } =
    userInfo;
  const onchange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  const passNotSame = () => {
    setErrorMsg("رمز اول با رمز دوم تطابق ندارد");
    setTimeout(() => {
      setErrorMsg("");
    }, 5000);
  };
  return (
    <div className={styles.register}>
      <Head>{!playing && <title> ثبت نام</title>}</Head>

      {/* <div className={styles.color}></div>
      <div className={styles.color}></div>
      <div className={styles.color}></div> */}
      <div className={styles.box}>
        {/* <div className={styles.square} style={{ i: "0" }}></div>
        <div className={styles.square} style={{ i: "1" }}></div>
        <div className={styles.square} style={{ i: "2" }}></div>
        <div className={styles.square} style={{ i: "3" }}></div>
        <div className={styles.square} style={{ i: "4" }}></div> */}
        <div className={styles.register__container}>
          <div className={styles.form}>
            <h2 className="text-center">ثبت نام</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (password !== password2) {
                  passNotSame();
                } else {
                  register({
                    username,
                    email,
                    password,
                    first_name,
                    last_name,
                  });
                }
              }}
            >
              <div className={styles.inputBox}>
                <input
                  autoFocus
                  onChange={onchange}
                  name="username"
                  value={username}
                  type="text"
                  placeholder="نام کاربری"
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <input
                  onChange={onchange}
                  name="first_name"
                  value={first_name}
                  type="text"
                  placeholder="نام "
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <input
                  onChange={onchange}
                  name="last_name"
                  value={last_name}
                  type="text"
                  placeholder="نام خانوادگی"
                  required
                />
              </div>
              <div className={styles.inputBox}>
                <input
                  onChange={onchange}
                  name="email"
                  type="email"
                  value={email}
                  placeholder="ایمیل"
                  required
                />
              </div>
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
              <div className={styles.inputBox}>
                <input
                  onChange={onchange}
                  name="password2"
                  value={password2}
                  type="password"
                  placeholder="تکرار رمز ورود"
                  minLength="8"
                  required
                />
              </div>
              <div className={`${styles.formMsg} pt-2`}>{errorMsg}</div>
              <div className={styles.error__msg__register}>
                {error && "  نام کاربری ویا ایمیل در سیستم موجود است"}
              </div>
              <div className={`${styles.inputBox} text-center`}>
                <input type="submit" value="ثبت نام" />
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

export default Register;
