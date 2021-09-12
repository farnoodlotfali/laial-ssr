import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import authContext from "../contexts/auth/authContext";
import appContext from "../contexts/app/appContext";
import { Button, Modal } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import styles from "../styles/MyProfile.module.css";
import defualtPhoto from "../public/defualtPhoto.jpeg";
import Image from "next/image";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  AccessTime,
  AddRounded,
  ExpandMoreRounded,
  ExposurePlus1Outlined,
  Favorite,
  PlayArrow,
} from "@material-ui/icons";
import SpinnerOnUserPlaylist from "../components/spinner/SpinnerOnUserPlaylist";
import { CircularProgress, Tooltip } from "@material-ui/core";
import MyProfilemySonglist from "../components/MyProfilemySonglist";
import MyProfileSong from "../components/MyProfileSong";
import LoadingIcon from "../components/spinner/LoadingIcon";
import playerContext from "../contexts/player/playerContext";
import MyProfileSongOnMobile from "../components/MyProfileSongOnMobile";
import axios from "../axios/axios";
import Head from "next/head";

const myprofile = () => {
  const { user } = useContext(authContext);
  const {
    userPlaylists,
    getLikedSongsPlaylist,
    mainPlaylistId,
    getOnePlayList,
    changeCurrentPassword,
    loadingOnUserPlaylist,
    getRecentlyViewedSongsPlaylist,
    changeMyProfilemySonglistId,
    myProfilemySonglistId,
    showLeftList,
    ChangeShowCreateList,
    showMusic,
  } = useContext(appContext);
  const { playThisListFromMyProflie, showMusicBarOnMoblieRatio, playing } =
    useContext(playerContext);

  const router = useRouter();
  const [isUserExist, setIsUserExist] = useState(false);
  const [listShow, setListShow] = useState(null);
  const [deleteBtn, setDeleteBtn] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [listname, setListName] = useState("");
  const [passwordMsg, setPasswordMsg] = useState("");
  const [changePassword, setchangePassword] = useState({
    currentPassword: "",
    changePassword1: "",
    changePassword2: "",
  });
  const [next, setNext] = useState({
    next: "",
    list: [],
    hasMore: false,
    page: 2,
    loading: false,
  });
  const { currentPassword, changePassword1, changePassword2 } = changePassword;

  useEffect(() => {
    if (user === null) {
      router.push("/");
    } else {
      setIsUserExist(true);
    }
  }, [user]);
  useEffect(() => {
    changeMyProfilemySonglistId(null);
    // eslint-disable-next-line
  }, []);
  const zeroPad = (num, places) => String(num).padStart(places, "0");

  const truncate = (str, no_words) => {
    return str?.split(" ").splice(0, no_words).join(" ");
  };
  const changePasswordMsg = (msg) => {
    setPasswordMsg(msg);
    setTimeout(() => {
      setPasswordMsg("");
      setPasswordModal(false);
      setchangePassword({
        currentPassword: "",
        changePassword1: "",
        changePassword2: "",
      });
    }, 3000);
  };
  const onchange = (e) => {
    setchangePassword({
      ...changePassword,
      [e.target.name]: e.target.value,
    });
  };
  const recentlyViewedc = async () => {
    const newList = await getRecentlyViewedSongsPlaylist();
    // console.log(newList);
    setNext({
      ...next,
      list: newList.results,
      next: newList.next,
      hasMore: newList.next ? true : false,
    });
    setListShow(newList.results);
    setDeleteBtn(false);
  };

  const likedSongsHandle = async () => {
    const newList = await getLikedSongsPlaylist();
    // console.log(2121, newList);
    setNext({
      ...next,
      list: newList.results,
      next: newList.next,
      hasMore: newList.next ? true : false,
    });
    setListShow(newList.results);
    setDeleteBtn(false);
  };
  const infiniteList = async () => {
    setTimeout(async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("tokenAccess"),
        },
      };
      try {
        const res = await axios.simpleApi.get(
          `/account/recently-view/?page=${next.page}`,
          config
        );
        // console.log(res.data);
        setNext({
          next: res.data.next,
          hasMore: res.data.next ? true : false,
          list: next.list.concat(res.data.results),
          loading: false,
          page: ++next.page,
        });
        setListShow(listShow.concat(res.data.results));
        //  next.list.concat(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }, 1200);
  };
  return (
    isUserExist && (
      <div
        className={`${
          showMusic
            ? showMusicBarOnMoblieRatio
              ? styles.myprofileShowMusicBarOnMoblieRatio
              : styles.myprofileShowMusic
            : ""
        } ${styles.myprofile}`}
      >
        <Head>{!playing && <title> پروفایل من</title>}</Head>

        <div className={styles.myprofile__top}>
          {/* mobile ratio */}
          <div className={styles.myprofile__mobile__show}>
            <div className={styles.myprofile__mobile__show__right}>
              <div className={styles.myprofile__mobile__show__userImg}>
                <Image src={defualtPhoto} alt="userImg" />
              </div>
              <div
                className={styles.myprofile__mobile__show__changeCurrentPass}
              >
                <Button
                  variant="primary"
                  onClick={() => setPasswordModal(true)}
                >
                  تغییر رمز
                </Button>
              </div>
            </div>
            <div className={styles.myprofile__mobile__show__left}>
              <div className={styles.myprofile__mobile__show__userinfo}>
                <div
                  className={styles.myprofile__mobile__show__userinfo__inputbox}
                >
                  <label> نام : </label>
                  <span> {user.first_name} </span>
                </div>
                <div
                  className={styles.myprofile__mobile__show__userinfo__inputbox}
                >
                  <label> نام خانوادگی :</label>
                  <span>{user.last_name}</span>
                </div>
                <div
                  className={styles.myprofile__mobile__show__userinfo__inputbox}
                >
                  <label> ایمیل :</label>
                  <span>{user.email} </span>
                </div>
                <div
                  className={styles.myprofile__mobile__show__userinfo__inputbox}
                >
                  <label> نام کاربری :</label>
                  <span>{user.username} </span>
                </div>
              </div>
            </div>
          </div>

          {/* web ratio */}
          <div className={styles.userImg}>
            <Image src={defualtPhoto} alt="userImg" />
          </div>
          <div className={`${styles.userinfo}  d-flex`}>
            <div className={styles.userinfo__inputbox}>
              <label> نام </label>
              <span>{user.first_name} </span>
            </div>
            <div className={styles.userinfo__inputbox}>
              <label> نام خانوادگی</label>
              <span>{user.last_name}</span>
            </div>
            <div className={styles.userinfo__inputbox}>
              <label> ایمیل</label>
              <span>{user.email} </span>
            </div>
            <div className={styles.userinfo__inputbox}>
              <label> نام کاربری</label>
              <span>{user.username} </span>
            </div>
          </div>
          <div className={styles.changeCurrentPass}>
            <div className="changeCurrentPassBtn">
              <Button variant="primary" onClick={() => setPasswordModal(true)}>
                تغییر رمز
              </Button>
            </div>

            <Modal
              contentClassName={styles.myprofileModal}
              show={passwordModal}
              onHide={() =>
                setPasswordModal(false) &
                setchangePassword({
                  currentPassword: "",
                  changePassword1: "",
                  changePassword2: "",
                })
              }
              className="passModal"
            >
              <Modal.Header className={styles.modalHeaderPass}>
                <Modal.Title className="modalTitlePass">
                  تغییر رمز عبور
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className={styles.modalBodyPass}>
                <input
                  onChange={onchange}
                  name="currentPassword"
                  type="password"
                  value={currentPassword}
                  placeholder="رمز فعلی"
                />
                <input
                  name="changePassword1"
                  onChange={onchange}
                  value={changePassword1}
                  type="text"
                  minLength="8"
                  placeholder="رمز جدید"
                />
                <input
                  name="changePassword2"
                  onChange={onchange}
                  value={changePassword2}
                  type="text"
                  minLength="8"
                  placeholder="تکرار رمز جدید "
                />
                {/* </form> */}
                <div className={styles.changePass_error}>{passwordMsg}</div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  className={styles.modalCloseBtn}
                  onClick={() => setPasswordModal(false)}
                >
                  بستن
                </Button>
                <Button
                  className={styles.modalSaveBtn}
                  type="submit"
                  onClick={async () => {
                    if (changePassword1 !== changePassword2) {
                      changePasswordMsg("رمز اول با رمز دوم تطابق ندارد");
                    } else {
                      const status = await changeCurrentPassword(
                        currentPassword,
                        changePassword1
                      );
                      if (status === 200) {
                        changePasswordMsg("!با موفقیت رمز تغییر یافت");
                      } else {
                        changePasswordMsg("!خطا");
                      }
                    }
                  }}
                >
                  ذخیره رمز
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <div className={styles.myprofile__bottom}>
          {/* mobile ratio */}
          <div className={styles.myprofile__mobile__songs}>
            {userPlaylists && (
              <div className="myprofile__mobile__songs__options">
                <div className="d-flex justify-content-center">
                  <div
                    className={`${styles.myprofile__mobile__songs__myListsOption} ml-2 p-1`}
                    onClick={() => likedSongsHandle()}
                  >
                    <Favorite />
                    <span className='className="d-flex justify-content-center w-100 align-items-center text-center'>
                      لایک
                    </span>
                  </div>
                  <div
                    className={`${styles.myprofile__mobile__songs__myListsOption} ml-2 p-1`}
                    onClick={() => recentlyViewedc()}
                  >
                    <AccessTime />
                    <span className='className="d-flex justify-content-center w-100 align-items-center text-center'>
                      اخیرا
                    </span>
                  </div>
                  <div
                    className={`${styles.myprofile__mobile__songs__myListsOption} ml-2 p-1`}
                    onClick={async () =>
                      setListShow(await getOnePlayList(mainPlaylistId)) &
                      setDeleteBtn(false)
                    }
                  >
                    <ExposurePlus1Outlined />

                    <span className='className="d-flex justify-content-center w-100 align-items-center text-center'>
                      منتخب
                    </span>
                  </div>
                </div>
                <div
                  className={`${styles.myprofile__mobile__songs__myListsOption} ml-2 p-1`}
                >
                  <Dropdown className="w-100">
                    <Dropdown.Toggle
                      className={
                        styles.myprofile__mobile__songs__myListsOptionBtn
                      }
                    >
                      <div className={styles.myMadeListShow__title__span}>
                        نام لیست : {listname}
                      </div>
                      <ExpandMoreRounded />
                    </Dropdown.Toggle>
                    <Dropdown.Menu
                      className={styles.myprofile__mobile__songs__mySongs}
                    >
                      {userPlaylists?.map(
                        (item, i) =>
                          mainPlaylistId !== item.id && (
                            <Dropdown.Item
                              key={i}
                              className={`${
                                myProfilemySonglistId === item.id &&
                                styles.list__name_HasBeenChosen__mobile
                              }`}
                              onClick={async () =>
                                setListShow(await getOnePlayList(item.id)) &
                                setListName(item.name) &
                                setDeleteBtn(true) &
                                changeMyProfilemySonglistId(item.id)
                              }
                            >
                              {item.name}
                            </Dropdown.Item>
                          )
                      )}
                    </Dropdown.Menu>
                  </Dropdown>
                  <div
                    className={
                      styles.myprofile__mobile__songs__myListsOption__addNewList
                    }
                    onClick={() => ChangeShowCreateList(true)}
                  >
                    <AddRounded />
                  </div>
                </div>
              </div>
            )}
            <div
              className={` ${styles.listItemsShow}  ${
                loadingOnUserPlaylist ? styles.listItemsShow : ""
              }`}
            >
              {loadingOnUserPlaylist ? (
                <div className="h-100 d-flex justify-content-center align-items-center">
                  <SpinnerOnUserPlaylist />
                </div>
              ) : listShow === null || listShow.length === 0 ? (
                <div className="none  text-light text-center">
                  لیست خالی است
                </div>
              ) : (
                <InfiniteScroll
                  dataLength={listShow.length}
                  next={() => infiniteList()}
                  hasMore={next.hasMore}
                  loader={
                    <div
                      style={{
                        display: "flex",
                        height: "55px",
                        opacity: 0.7,
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <LoadingIcon color={"white"} />
                    </div>
                  }
                  height={445}
                  className={styles.myProfileSongInfiniteScroll}
                >
                  {listShow.map((item, i) => (
                    <MyProfileSongOnMobile
                      deleteBtn={deleteBtn}
                      item={item}
                      key={i}
                      playlist={listShow}
                    />
                  ))}
                </InfiniteScroll>
              )}
            </div>
          </div>

          {/* web ratio */}
          {userPlaylists && (
            <div className={styles.myListsBtn}>
              <div
                className={styles.myListsOption}
                onClick={() => likedSongsHandle()}
              >
                <Favorite />
                <span className="mr-3">لایک</span>
              </div>
              <div
                className={styles.myListsOption}
                onClick={() => recentlyViewedc()}
              >
                <AccessTime />
                <span className="mr-3"> اخیرا</span>
              </div>
              <div
                className={styles.myListsOption}
                onClick={async () =>
                  setListShow(await getOnePlayList(mainPlaylistId)) &
                  setDeleteBtn(false)
                }
              >
                <ExposurePlus1Outlined />
                <span> منتخب </span>
              </div>
            </div>
          )}
          <div className={`${styles.listShow} d-flex`}>
            <div
              className={`${styles.listItemsShow} ${
                loadingOnUserPlaylist ? styles.listItemsShow__loading : ""
              }`}
            >
              {loadingOnUserPlaylist ? (
                <SpinnerOnUserPlaylist />
              ) : listShow === null || listShow.length === 0 ? (
                <div className="none  text-light text-center">
                  لیست خالی است
                </div>
              ) : (
                <InfiniteScroll
                  dataLength={listShow.length}
                  next={() => infiniteList()}
                  hasMore={next.hasMore}
                  loader={
                    <div
                      style={{
                        display: "flex",
                        height: "55px",
                        opacity: 0.7,
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <LoadingIcon color={"white"} />
                    </div>
                  }
                  height={435}
                  className={styles.myProfileSongInfiniteScroll}
                >
                  {listShow.map((item, i) => (
                    <MyProfileSong
                      item={item}
                      key={i}
                      zeroPad={zeroPad}
                      truncate={truncate}
                      deleteBtn={deleteBtn}
                      playlist={listShow}
                    />
                  ))}
                </InfiniteScroll>
              )}
            </div>

            <div className={styles.myMadeListsShow}>
              <div className={styles.myMadeListShow__title}>
                <span
                  className={`align-self-center ${styles.myMadeListShow__title__span}`}
                >
                  نام لیست : {listname}
                </span>
                <div className="d-flex">
                  <span
                    className={styles.playListBtn}
                    onClick={() => {
                      if (listShow) {
                        showLeftList(true);
                        playThisListFromMyProflie(listShow);
                      }
                    }}
                  >
                    <Tooltip placement="top" title="پخش">
                      <PlayArrow />
                    </Tooltip>
                  </span>
                  <span
                    className={`${styles.playListBtn} mr-1`}
                    onClick={() => ChangeShowCreateList(true)}
                  >
                    <Tooltip placement="top" title="لیست جدید">
                      <AddRounded />
                    </Tooltip>
                  </span>
                </div>
              </div>
              <div className={`${styles.myMadeListsShow__lists} py-3`}>
                {userPlaylists ? (
                  userPlaylists?.map(
                    (item, i) =>
                      mainPlaylistId !== item.id && (
                        <MyProfilemySonglist
                          key={i}
                          id={item.id}
                          name={item.name}
                          setListName={setListName}
                          setDeleteBtn={setDeleteBtn}
                          setListShow={setListShow}
                        />
                      )
                  )
                ) : (
                  <div className="h-100 d-flex align-items-center justify-content-center">
                    <CircularProgress color="inherit" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default myprofile;
