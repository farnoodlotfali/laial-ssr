import styles from '../../styles/songPage.module.css';
import { Modal } from 'react-bootstrap';

import { Swiper, SwiperSlide } from 'swiper/react';
import { IconButton, Tooltip } from '@material-ui/core';
import {
  CloseRounded,
  Favorite,
  GetAppRounded,
  PlayArrowRounded,
  PlaylistAdd,
  Visibility,
} from '@material-ui/icons';
import RowItem from '../../components/relatedToRowItem/RowItem';
import Flickity from 'react-flickity-component';
import { useContext, useEffect, useState } from 'react';
import authContext from '../../contexts/auth/authContext';
import Link from 'next/link';
import { useRouter } from 'next/router';

const songPage = ({ data, recommender, view, songUrlData }) => {
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(data.likes);
  const [songUrl, setSongUrl] = useState(data.likes);
  const router = useRouter();
  const id = router.query.id;
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  const [userInfo, setUserInfo] = useState({
    username: '',
    email: '',
    password: '',
  });
  const likeSong = async () => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append(
      'Authorization',
      'Bearer ' + localStorage.getItem('tokenAccess')
    );
    let raw = '';

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch(`http://laial.7negare.ir/api/post/${id}/`, requestOptions)
      .then((response) => response.json())
      .then((result) => setLike(result.data.likes))

      .catch((error) => console.log(error));

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + localStorage.getItem('tokenAccess'),
    //   },
    // };
    // try {
    //   // eslint-disable-next-line
    //   const like = await axios.instanceApi.post(`/post/${slug}/`, null, config);
    //   // console.log(like.data);
    //   dispatch({
    //     type: LIKE_SONG,
    //     payload: like.data.data.likes,
    //   });
    // } catch (error) {
    //   console.log(error);
    //   dispatch({
    //     type: ERROR,
    //     payload: error,
    //   });
    // }
  };
  const { email, password } = userInfo;
  const { error, login, loadUser, user, isAuth } = useContext(authContext);

  const onchange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    loadUser();
    setsongurl();
  }, [user, like, isAuth, songUrl]);
  const setsongurl = () => {
    fetch(`http://downloader.7negare.ir/download/${data.media[0].telegram_id}`)
      .then((resp) => resp.json())
      .then((res) => setSongUrl(res.download_link));
    // const songUrlData = await songUrl.json();
  };
  return (
    <div className={`${styles.songPage} py-4  `}>
      <div className={`${styles.musicInfo}  d-flex justify-content-around`}>
        <div className={`${styles.musicInfo__right}`}>
          <img
            className={styles.musicInfo__image}
            src={
              data?.media?.[0]?.image !== null
                ? data?.media?.[0]?.image
                : data?.person?.[0]?.image.full_image_url !== null
                ? data?.person?.[0]?.image.full_image_url
                : '/defualtPhoto'
            }
            alt='logo'
          />
        </div>
        <div
          className={`${styles.musicInfo__left} text-light   justify-content-start align-items-center`}
        >
          <div className={`${styles.musicInfo__name} mt-5 mb-3 d-flex`}>
            نام آهنگ : {data?.media?.[0]?.name}
          </div>
          <div className={`${styles.musicInfo__singer} mb-3 d-flex`}>
            خواننده : {data?.person?.[0]?.name}
          </div>
          <div className='musicInfo__mode mb-3 d-flex'>سبک : شور</div>
          <hr />
          <div className={`${styles.actions} d-flex justify-content-around`}>
            <div
            //   onClick={playMusicAndShowMusicBar}
            >
              <Tooltip placement='bottom' title='پخش آهنگ'>
                <IconButton aria-label='play'>
                  <PlayArrowRounded
                    style={{ fontSize: '40px' }}
                    className={`${styles.icon} `}
                  />
                </IconButton>
              </Tooltip>
            </div>

            <div className={`${styles.favoritePart} text-center`}>
              <IconButton
                aria-label='Favorite'
                onClick={() => (isAuth ? likeSong() : setShow(true))}
              >
                <Favorite className={`${styles.favorite}`} fontSize='large' />
              </IconButton>
              {like}

              <Modal
                show={!isAuth && show}
                onHide={() => setShow(false)}
                className={styles.favoritePopUp__login}
              >
                <Modal.Header className={styles.modalHeader}>
                  <Modal.Title className={styles.modalTitle}>
                    <span>برای لایک کردن، باید وارد حساب کاربری شوید</span>
                    <div
                      onClick={() => setShow(false)}
                      className={styles.modalTitleClose}
                    >
                      <CloseRounded className={styles.modalTitleBtn} />
                    </div>
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className={styles.modalBody}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      login({
                        email,
                        password,
                      });
                    }}
                  >
                    <div
                      className={`${styles.formGp} d-flex justify-content-around`}
                    >
                      <div className={styles.inputBox}>
                        <input
                          required
                          onChange={onchange}
                          name='password'
                          value={password}
                          type='password'
                          placeholder='رمز ورود'
                          minLength='8'
                        />
                      </div>
                      <div className={styles.inputBox}>
                        <input
                          onChange={onchange}
                          name='email'
                          type='email'
                          value={email}
                          placeholder='ایمیل'
                          required
                        />
                      </div>{' '}
                    </div>
                    <div className={`error__msg__login pt-2 `}>
                      {error?.error} *
                    </div>
                    <div className={`${styles.notRegister} pt-2`}>
                      {' '}
                      <span> ثبت نام نکرده اید؟ </span>{' '}
                      <Link href='/register'>
                        <span className={styles.notRegisterLink}>
                          {' '}
                          ثبت نام{' '}
                        </span>
                      </Link>
                    </div>
                    {/* <div className='formMsg pt-2'>{errorMsg}</div> */}
                    <div
                      className={`${styles.formGp__btn} d-flex justify-content-around  `}
                    >
                      <div className={styles.inputBox__login}>
                        <input type='submit' value='ورود' />
                      </div>
                      <div className={styles.inputBox__close}>
                        <button onClick={() => setShow(false)}>بستن</button>
                      </div>
                    </div>
                  </form>
                </Modal.Body>
                {/* <Modal.Footer>
                  <div className='inputBox'>
                    <input type='submit' value='ورود' />
                  </div>

                  <Button variant='secondary' onClick={() => setShow(false)}>
                    بستن
                  </Button>
                </Modal.Footer> */}
              </Modal>
            </div>

            <div>
              <a href={songUrl}>
                <Tooltip placement='bottom' title='دانلود'>
                  <IconButton aria-label='download'>
                    <GetAppRounded
                      className={`${styles.download}`}
                      fontSize='large'
                    />
                  </IconButton>
                </Tooltip>
              </a>
            </div>

            <div
            //   onClick={() =>
            //     setWhichSongToSaveInPlaylist(dataSongPage?.media?.[0]?.id)
            //   }
            >
              <Tooltip placement='bottom' title='اضافه به لیست'>
                <IconButton aria-label='Add'>
                  <PlaylistAdd className={`${styles.add}`} fontSize='large' />
                </IconButton>
              </Tooltip>
            </div>
            <div className={`${styles.viewPart} text-center`}>
              <IconButton aria-label='View'>
                <Visibility className={`${styles.view}`} fontSize='large' />
              </IconButton>
              {view}
            </div>
          </div>
        </div>
      </div>

      <div className={`${styles.rowList}  mt-5  pt-5 `}>
        <h3 className={`${styles.listTitle} text-light  pb-3 mr-4`}>
          <span>پیشنهاداتی برای شما</span>
        </h3>
        <Flickity className={`carousel  px-2 py-0`} options={flickityOptions}>
          {recommender &&
            recommender.map((item, i) => {
              return (
                <RowItem
                  key={item.id}
                  logo={item.image}
                  media={item.media[0]}
                  person={item.person}
                  slug={item.slug}
                />
              );
            })}
        </Flickity>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  // const req = await axios.instanceApi.get(`/post/${params.id}s/`);

  const res = await fetch(`http://laial.7negare.ir/api/post/${params.id}/`);
  const resData = await res.json();
  const view = await fetch(
    `http://laial.7negare.ir/api/post/${params.id}/?state=views`
  );
  const viewData = await view.json();
  const recommender = await fetch(`http://laial.7negare.ir/api/recommender/`);
  const recommenderData = await recommender.json();

  if (!resData.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: resData.data,
      recommender: recommenderData.data,
      view: viewData.data.views,
    },
  };
};
export default songPage;
