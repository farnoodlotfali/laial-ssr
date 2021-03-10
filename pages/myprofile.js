import { useState } from 'react';
import { DeleteRounded } from '@material-ui/icons';
import styles from '../styles/MyProfile.module.css';
const MyProfile = () => {
  const [listShow, setlistShow] = useState(null);
  const [changePassword, setchangePassword] = useState({
    currentPassword: '',
    changePassword1: '',
    changePassword2: '',
  });
  const onchange = (e) => {
    setchangePassword({
      ...changePassword,
      [e.target.name]: e.target.value,
    });
  };
  const changeListShow = (newlist) => {
    setlistShow(newlist);
  };
  return (
    <div className={`${styles.myProfile}  text-light`}>
      <div className={styles.myProfile__content}>
        <div className={styles.photo__onMobile}>
          <div className={styles.photo__lines}>
            <img src={'/defualtPhoto.jpeg'} alt='' className='rounded-circle' />
          </div>
        </div>
        <div className={styles.myProfile__content__left}>
          <div className={styles.myProfile__content__left__title}>
            <h3>لیست های من</h3>
          </div>
          <div className={styles.myProfile__allAndShow}>
            <div className={styles.myProfile__list__all}>
              <div className='dropdown'></div>
              <div className={styles.myProfile__list}>
                <span>اخیرا شنیده شده</span>
              </div>
              <div className={styles.myProfile__list}>
                <span>آهنگ های لایک شده</span>
              </div>
              <div className={styles.myProfile__list}>
                <span>آهنگ های انتخاب شده سایت</span>
              </div>
            </div>
            <div className={styles.myProfile__list__show}>
              {listShow && listShow.length === 0 ? (
                <div className='none text-light'>لیست خالی است</div>
              ) : (
                listShow?.map((item, i) => {
                  return (
                    <div
                      key={item.id}
                      className={`${styles.myProfile__song__info} justify-content-between`}
                    >
                      <div className='d-flex'>
                        <div
                          className={`${styles.number}     align-self-center`}
                        >
                          {i + 1}
                        </div>
                        <div className={styles.song__img}>
                          <img src={logo} alt='' />
                        </div>
                        <span
                          className={`${styles.myProfile__song__info__singer} align-self-center`}
                        >
                          mammd
                        </span>
                      </div>
                      <div className={styles.myProfile__song__info__names}>
                        <span
                          className={`${styles.myProfile__song__info__name} align-self-end`}
                        >
                          {item.fileItem?.name}
                        </span>
                      </div>
                      <div className='d-flex align-self-center'>
                        <div className={styles.myProfile__song__info__time}>
                          3:26
                        </div>
                        <div className=''>
                          <DeleteRounded />
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
        <div className={styles.myProfile__imgAndPass}>
          <div className={styles.myProfile__img}>
            <img src={'/defualtPhoto.jpeg'} alt='' className='rounded-circle' />
          </div>

          <div className={styles.choose__photo}>
            <label htmlFor='myfile'>انتخاب عکس</label>
            <input type='file' id='myfile' name='myfile' />
          </div>
        </div>
        <div className={styles.myProfile__content__right}>
          <div className={styles.myProfile__content__left__title}>
            <h3> اطلاعات من</h3>
          </div>
          <form>
            <div className={`d-flex ${styles.form__names}`}>
              <div className={styles.inputBox}>
                <label>نام</label>
                <input
                  name='firstname'
                  //   value={user.first_name}
                  type='text'
                  disabled
                />
              </div>
              <div className={styles.inputBox}>
                <label> نام خانوادگی</label>

                <input
                  name='username'
                  type='text'
                  //   value={user.last_name}
                  disabled
                />
              </div>
            </div>
            <div className={`d-flex ${styles.form__names}`}>
              <div className={styles.inputBox}>
                <label>ایمیل</label>

                <input
                  name='username'
                  type='email'
                  //   value={user.email}
                  disabled
                />
              </div>
              <div className={styles.inputBox}>
                <label>نام کاربری</label>

                <input
                  name='username'
                  //   value={user.username}
                  type='text'
                  disabled
                />
              </div>
            </div>
          </form>
          <div className={styles.myProfile__reset__password}>
            <div className={styles.myProfile__reset__password__title}>
              <h4>تغییر رمز عبور</h4>
            </div>

            <form>
              <div className={styles.inputBoxPass}>
                <input
                  onChange={onchange}
                  name='currentPassword'
                  type='password'
                  placeholder='رمز فعلی'
                />
              </div>
              <div className={styles.inputBoxPass}>
                <input
                  name='changePassword1'
                  onChange={onchange}
                  type='text'
                  minLength='8'
                  required
                  placeholder='رمز جدید'
                />
              </div>{' '}
              <div className={styles.inputBoxPass}>
                <input
                  onChange={onchange}
                  name='changePassword2'
                  type='text'
                  minLength='8'
                  required
                  placeholder='تکرار رمز جدید '
                />
              </div>
              <div className={styles.inputBoxPass}>
                <input type='submit' value='تغییر رمز ' />
              </div>
            </form>
          </div>
        </div>
      </div>
      Nobis fugiat eos quod qui consequatur impedit maiores, obcaecati,
      voluptatem quasi aliquid cupiditate iste in itaque necessitatibus sapiente
      possimus ipsum enim. Amet porro quos quis qui neque eius exercitationem
      aut quam. Odit natus iusto veritatis minus, perspiciatis unde laborum modi
      quae quo ab, officia blanditiis necessitatibus libero atque. Facere, odit
      officiis?
    </div>
  );
};

export default MyProfile;
