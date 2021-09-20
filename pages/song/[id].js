import styles from "../../styles/songPage.module.css";
import { Modal } from "react-bootstrap";
import { IconButton, Tooltip } from "@material-ui/core";
import {
  CloseRounded,
  Favorite,
  GetAppRounded,
  Pause,
  PlaylistAdd,
  Visibility,
} from "@material-ui/icons";
import RowItem from "../../components/relatedToRowItem/RowItem";
import Flickity from "react-flickity-component";
import { useContext, useEffect, useState } from "react";
import authContext from "../../contexts/auth/authContext";
import Link from "next/link";
import { useRouter } from "next/router";
import appContext from "../../contexts/app/appContext";
import axios from "../../axios/axios";
import playerContext from "../../contexts/player/playerContext";
import SpinnerLoadingOnRowItem from "../../components/spinner/SpinnerLoadingOnRowItem";
import PlaySvg from "../../components/svgs/PlaySvg";
import Head from "next/head";

export default function songPage({ data, recommender, view, songUrlData }) {
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
    username: "",
    email: "",
    password: "",
  });
  const likeSong = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
      },
    };
    // console.log(config);
    try {
      // eslint-disable-next-line
      const like = await axios.instanceApi.post(`/post/${id}/`, null, config);
      // console.log(like.data.data.likes);
      setLike(like.data.data.likes);
    } catch (error) {
      console.log(error);
    }
  };
  const { email, password } = userInfo;
  const { error, login, loadUser, user, isAuth } = useContext(authContext);
  const {
    setUrl,
    playMusic,
    setIds,
    playing,
    loading,
    songId,
    playAndPauseMusic,
    showMusicBarOnMoblieRatio,
  } = useContext(playerContext);
  const {
    setWhichSongToSaveInPlaylist,
    addToLikedSongPlaylist,
    showMusic,
    ChangeShowMusic,
    addMusicToRecentlyViewed,
  } = useContext(appContext);
  const onchange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value,
    });
  };

  const playMusicAndShowMusicBar = async () => {
    if (data?.media?.[0]?.id === songId) {
      playAndPauseMusic();
    } else {
      setIds(
        data?.media?.[0]?.telegram_id,
        data?.media?.[0]?.id,
        data?.media?.[0]?.duration,
        data?.title ? data?.title : data?.media?.[0]?.name,
        data?.person?.[0]?.name,
        data?.image?.full_image_url
          ? data?.image?.full_image_url
          : data?.media?.[0]?.image !== null
          ? data?.media?.[0]?.image
          : data?.person?.[0]?.image.full_image_url,
        data?.id,
        data?.slug,
        data?.meta_title ? data?.meta_title : data?.title,
        data?.meta_description ? data?.meta_description : data?.description
      );
      if (data?.media?.[0]?.path) {
        setUrl(data?.media?.[0]?.path, recommender);
        if (!showMusic) {
          ChangeShowMusic(true);
        }
        playMusic();
      } else {
        try {
          const res = await axios.downloader.get(
            `/${data?.media?.[0]?.telegram_id}`
          );
          // console.log(res.data.download_link);recommender
          setUrl(res.data.download_link, recommender);
          if (!showMusic) {
            ChangeShowMusic(true);
          }
          playMusic();
        } catch (error) {
          console.log(error);
        }
      }
      // user !== null && addMusicToRecentlyViewed(1, data?.id);
    }
  };
  return (
    <div
      className={`${
        showMusic
          ? showMusicBarOnMoblieRatio
            ? styles.songPageShowMusicBarOnMoblieRatio
            : styles.songPageShowMusic
          : ""
      } ${styles.songPage} `}
    >
      <Head>
        {!playing && (
          <title>{data?.title ? data?.title : data?.media?.[0]?.name}</title>
        )}
      </Head>
      <div className={`${styles.musicInfo}  d-flex justify-content-around`}>
        <div className={`${styles.musicInfo__right}`}>
          <div className="d-flex justify-content-center">
            <img
              className={styles.musicInfo__image}
              src={
                data?.image?.full_image_url
                  ? data?.image?.full_image_url
                  : data?.media?.[0]?.image !== null
                  ? data?.media?.[0]?.image
                  : data?.person?.[0]?.image.full_image_url
                  ? data?.person?.[0]?.image.full_image_url
                  : "/defualtPhoto"
              }
              alt="logo"
            />

            {loading && songId === data?.media?.[0]?.id ? (
              <div className={styles.rowItemSpinnerLoading}>
                <SpinnerLoadingOnRowItem />
                <div className="text-light text-center">در حال آماده سازی</div>
              </div>
            ) : playing && songId === data?.media?.[0]?.id ? (
              <div
                className={styles.rowItemPage_play__music}
                onClick={() => playAndPauseMusic()}
              >
                <Pause />
              </div>
            ) : (
              <div className={styles.rowItemPage_play__music}>
                <PlaySvg playMusicAndShowMusicBar={playMusicAndShowMusicBar} />
              </div>
            )}
          </div>
          <div
            className={`${styles.actions} d-flex justify-content-around mt-2`}
          >
            <div className={`${styles.favoritePart} text-center`}>
              <IconButton
                aria-label="Favorite"
                onClick={() =>
                  isAuth
                    ? likeSong() & addToLikedSongPlaylist(data?.id)
                    : setShow(true)
                }
              >
                <Favorite
                  className={`${styles.favorite}`}
                  style={{ fontSize: "30px" }}
                />
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
                          name="email"
                          type="email"
                          value={email}
                          placeholder="ایمیل"
                          required
                        />
                      </div>
                    </div>
                    <div className={`error__msg__login pt-2 `}>
                      {error?.error} *
                    </div>
                    <div className={`${styles.notRegister} pt-2`}>
                      <span> ثبت نام نکرده اید؟ </span>
                      <Link href="/register">
                        <span className={styles.notRegisterLink}>ثبت نام</span>
                      </Link>
                    </div>
                    {/* <div className='formMsg pt-2'>{errorMsg}</div> */}
                    <div
                      className={`${styles.formGp__btn} d-flex justify-content-around  `}
                    >
                      <div className={styles.inputBox__login}>
                        <input type="submit" value="ورود" />
                      </div>
                      <div className={styles.inputBox__close}>
                        <button onClick={() => setShow(false)}>بستن</button>
                      </div>
                    </div>
                  </form>
                </Modal.Body>
              </Modal>
            </div>

            <div>
              <a href={songUrl} dideo-checked="true">
                <Tooltip placement="bottom" title="دانلود">
                  <IconButton aria-label="download">
                    <GetAppRounded
                      className={`${styles.download}`}
                      style={{ fontSize: "30px" }}
                    />
                  </IconButton>
                </Tooltip>
              </a>
            </div>

            <div onClick={() => setWhichSongToSaveInPlaylist(data?.id)}>
              <Tooltip placement="bottom" title="اضافه به لیست">
                <IconButton aria-label="Add">
                  <PlaylistAdd
                    className={`${styles.add}`}
                    style={{ fontSize: "30px" }}
                  />
                </IconButton>
              </Tooltip>
            </div>
            <div className={`${styles.viewPart} text-center`}>
              <IconButton aria-label="View">
                <Visibility
                  className={`${styles.view}`}
                  style={{ fontSize: "30px" }}
                />
              </IconButton>
              {view}
            </div>
          </div>
        </div>

        <div
          className={`${styles.musicInfo__left} text-light   justify-content-start align-items-center`}
        >
          <div className={`${styles.musicInfo__name} mt-5 mb-3 d-flex`}>
            نام اثر : {data?.title ? data?.title : data?.media?.[0]?.name}
          </div>
          <div className="d-flex">
            <div className={`${styles.musicInfo__singer} mb-3 d-flex`}>
              خواننده : {data?.person?.[0]?.name}
            </div>
            <div className={styles.musicInfo__mode}>سبک : شور</div>
          </div>
          <div className="">
            توضیحات :
            {data?.description ? data.description : data.meta_description}
          </div>
        </div>
      </div>
      <hr />
      <div className={`${styles.rowList} mt-3 `}>
        <h3 className={`${styles.listTitle} text-light  pb-3 mr-4`}>
          <span>پیشنهاداتی برای شما</span>
        </h3>
        <Flickity className={`carousel  px-2 py-0`} options={flickityOptions}>
          {recommender &&
            recommender.map((item, i) => {
              return (
                <RowItem
                  key={item.id}
                  postId={item.id}
                  isRow={true}
                  logo={item.image}
                  media={item.media[0]}
                  person={item.person}
                  slug={item.slug}
                  meta_description={item.meta_description}
                  meta_title={item.meta_title}
                  description={item.description}
                  title={item.title}
                />
              );
            })}
        </Flickity>
      </div>
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  // const req = await axios.instanceApi.get(`/post/${params.id}s/`);

  // const res = await fetch(`https://nejat.safine.co/api/post/${params.id}/`);
  // const resData = await res.json();
  // const view = await fetch(
  //   `https://nejat.safine.co/api/post/${params.id}/?state=views`
  // );
  // const viewData = await view.json();
  // const recommender = await fetch(`https://nejat.safine.co/api/recommender/`);
  // const recommenderData = await recommender.json();
  let resData;
  let viewData;
  let recommenderData;
  try {
    resData = await axios.instanceApi.get(`/post/${params.id}/`);
    viewData = await axios.instanceApi.get(`/post/${params.id}/?state=views`);
    recommenderData = await axios.instanceApi.get(`/recommender/`);
  } catch (error) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: resData.data.data,
      recommender: recommenderData.data.data,
      view: viewData.data.data.views,
    },
  };
};
