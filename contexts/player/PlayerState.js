import {
  Fragment,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import PlayerContext from "./playerContext";
import {
  ClickAwayListener,
  Drawer,
  ListItem,
  ListItemText,
  Slide,
  Slider,
  SwipeableDrawer,
} from "@material-ui/core";
import appContext from "../app/appContext";
import authContext from "../auth/authContext";
import styles from "../../styles/Player.module.css";
import phonestyles from "../../styles/PlayerPhone.module.css";
import playerReducer from "./playerReducer";
import { detect } from "detect-browser";
import SpinnerLoading from "../../components/spinner/SpinnerLoading";
import {
  ExpandLessRounded,
  ExpandMoreRounded,
  Pause,
  PlayArrowRounded,
  PlayCircleFilledRounded,
  PlaylistAddRounded,
  QueueMusic,
  RepeatOneRounded,
  RepeatRounded,
  ShuffleRounded,
  SkipNextRounded,
  SkipPreviousRounded,
  VolumeOff,
  VolumeUp,
} from "@material-ui/icons";
import {
  MUTE_MUSIC,
  PLAY_MUSIC,
  PAUSE_MUSIC,
  UNMUTE_MUSIC,
  CHANGE_VOLUME,
  CHANGE_DURATION,
  SET_PALYLIST,
  NEXT_MUSIC,
  PREVIOUS_MUSIC,
  SET_CURRENT_URL,
  SET_IDS,
  SET_LOADING,
  SET_PROGRESS,
  CHANGE_SHOW_MUSICBAR_ON_MOBILE_RATIO,
  CHANGE_SHUFFLE,
  CHANGE_LOOP_STATE,
} from "./types";
import { makeStyles } from "@material-ui/core/styles";
import axios from "../../axios/axios";
import Bar from "./Bar";
import Time from "./Time";
import Head from "next/head";
const useStyles = makeStyles({
  rail: {
    height: "4px",
    color: "white",
  },
  thumb: {
    color: "white",
  },
  paper: {
    backgroundColor: "rgb(78, 83, 88)",
    bottom: "109px",
    /* max-width: 360px, */
    overflow: "hidden",
    /* top: 10%, */
    /* position: relative, */
    zIndex: "999",
  },
});

const detectMob = () => {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];
  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
};

const getTimeToday = () => {
  var today = new Date();
  let date =
    today.getFullYear() +
    "-" +
    (today.getMonth() + 1) +
    "-" +
    today.getDate() +
    "/" +
    today.getHours() +
    "-" +
    today.getMinutes() +
    "-" +
    today.getSeconds();
  return date;
};
const browser = () => {
  const browser = detect();
  // if (browser) {
  //   console.log(browser.name);
  //   console.log(browser.version);
  //   console.log(browser.os);
  // }

  return browser.name;
};

const PlayerState = (props) => {
  const {
    showRightList,
    showMusic,
    RightList,
    leftList,
    showLeftList,
    setWhichSongToSaveInPlaylist,
    LimitListPlayNonLogin,
    addMusicToMAINPlaylist,
    addMusicToRecentlyViewed,
  } = useContext(appContext);
  const classes = useStyles();
  const { isAuth, forceLogin, checkIfForce, user } = useContext(authContext);

  const initialState = {
    playList: [],
    playing: false,
    loading: false,
    mute: false,
    forceStop: false,
    seek: false,
    shuffle: false,
    loop: "off",
    repeatOne: false,
    noneOrLoopOrRepeat: 0,
    duration: 0,
    totalDuration: 10,
    currentUrl: null,
    audioElement: null,
    volume: 1,
    telegramId: null,
    postId: 1221,
    songId: null,
    songSlug: null,
    songPhoto: null,
    songName: "",
    songSinger: "",
    currentProgress: 0,
    progressToZero: false,
    showMusicBarOnMoblieRatio: false,
    canDeleteSong: false,
    isThisSongAddedToRecentlyViewdPlaylist: false,
    song_meta_description: null,
    song_meta_title: null,
  };
  const [state, dispatch] = useReducer(playerReducer, initialState);

  const [musicChangeList, setMusicChangeList] = useState([]);
  const { playList } = state;
  const audioRef = useRef();
  // useEffect(() => {
  //   //   حرکت خواهد کردprogress اگر در حال پخش بود

  //   if (state.playing && !state.loading) {
  //     //progress سرعت جلو رفتن
  //     const timer = setInterval(() => {
  //       if (audioRef?.current && audioRef?.current?.ended && !state.seek) {
  //         nextMusic();
  //       } else if (
  //         audioRef?.current?.paused &&
  //         state.currentUrl !== null &&
  //         !state.loading
  //       ) {
  //         audioRef?.current?.play();
  //       }

  //       let progress = parseFloat(
  //         (audioRef?.current?.currentTime * 100) / audioRef?.current?.duration
  //       ).toFixed(2);
  //       setNewProgress(progress);
  //       dispatch({
  //         type: CHANGE_DURATION,
  //         payload: {
  //           currentTime: audioRef.current.currentTime,
  //         },
  //       });
  //     }, 1000);
  //     return () => {
  //       clearInterval(timer);
  //     };
  //   }
  // }, [state.playing, state.loading, state.seek]);

  const playMusic = (audioElement = audioRef.current) => {
    if (audioElement) {
      audioElement.load();
      // await audioElement.play();
    }
  };

  const playAndPauseMusic = (audioElement = audioRef.current) => {
    // پلی و استپ کردن آهنگ
    if (audioElement !== undefined) {
      if (state.playing) {
        audioElement.pause();
        dispatch({
          type: PAUSE_MUSIC,
        });
      } else {
        dispatch({
          type: PLAY_MUSIC,
        });

        audioElement.play();
      }
    }
  };
  const nextMusic = async (audioElement = audioRef.current) => {
    audioElement.pause();
    putToMusicChangeList(audioElement.currentTime, "next");
    setNewProgress(0);

    if (playList !== undefined) {
      for (let i = 0; i < playList.length; i++) {
        if (
          playList[i]?.post
            ? state.songId === playList[i].post.media[0].id
            : state.songId === playList[i].media[0].id
        ) {
          let which;
          if (state.shuffle) {
            which = Math.floor(Math.random() * Math.floor(playList?.length));
          } else {
            which = i + 1;
          }
          let chosen = playList[which]?.post
            ? playList[which] !== undefined
              ? playList[which].post
              : state.loop === "loop"
              ? playList[0].post
              : -1
            : playList[which] !== undefined
            ? playList[which]
            : state.loop === "loop"
            ? playList[0]
            : -1;
          if (chosen !== -1) {
            if (checkIfForce()) {
              changeShowLoginModal(true);
            } else {
              const sendTitle = chosen?.meta_title
                ? chosen?.meta_title
                : chosen?.title && chosen?.title !== ""
                ? chosen?.title
                : chosen?.media?.name;
              const sendDescription = chosen?.meta_description
                ? chosen?.meta_description
                : chosen?.description && chosen?.description !== ""
                ? chosen?.description
                : chosen?.media?.name;

              setIds(
                chosen.media[0]?.telegram_id,
                chosen.media[0]?.id,
                chosen.media[0]?.duration,
                chosen?.title ? chosen?.title : chosen.media[0]?.name,
                chosen.person?.[0]?.name,
                chosen?.image?.full_image_url
                  ? chosen?.image?.full_image_url
                  : chosen?.media?.[0]?.image !== null
                  ? chosen?.media?.[0]?.image
                  : chosen?.person?.[0]?.image.full_image_url,
                chosen.id,
                chosen.slug,
                chosen?.meta_title
                  ? chosen?.meta_title
                  : chosen?.title && chosen?.title !== ""
                  ? chosen?.title
                  : chosen?.media?.name,
                chosen?.meta_description
                  ? chosen?.meta_description
                  : chosen?.description && chosen?.description !== ""
                  ? chosen?.description
                  : chosen?.media?.name
              );

              if (chosen.media[0]?.path) {
                setUrl(chosen.media[0]?.path, playList);
                playMusic();
              } else {
                try {
                  const res = await axios.downloader.get(
                    `/${chosen.media[0]?.telegram_id}`
                  );
                  setUrl(res.data.download_link, playList);

                  playMusic();
                } catch (error) {
                  console.log(error);
                }
              }
              // changeHomeMeta(sendTitle, sendDescription);
            }
          } else {
            dispatch({
              type: PAUSE_MUSIC,
            });
          }
        }
      }
    }

    setNewProgress(0);
  };

  const previousMusic = async (audioElement = audioRef.current) => {
    audioElement.pause();

    putToMusicChangeList(audioElement.currentTime, "previous");
    setNewProgress(0);

    if (playList !== undefined) {
      for (let i = 0; i < playList.length; i++) {
        if (
          playList[i]?.post
            ? state.songId === playList[i].post.media[0].id
            : state.songId === playList[i].media[0].id
        ) {
          let which;
          if (state.shuffle) {
            which = Math.floor(Math.random() * Math.floor(playList?.length));
          } else {
            which = i - 1;
          }
          let chosen = playList[which]?.post
            ? playList[which] !== undefined
              ? playList[which].post
              : playList[playList.length - 1].post
            : playList[which] !== undefined
            ? playList[which]
            : playList[playList.length - 1];

          if (checkIfForce()) {
            changeShowLoginModal(true);
          } else {
            const sendTitle = chosen?.meta_title
              ? chosen?.meta_title
              : chosen?.title && chosen?.title !== ""
              ? chosen?.title
              : chosen?.media?.name;
            const sendDescription = chosen?.meta_description
              ? chosen?.meta_description
              : chosen?.description && chosen?.description !== ""
              ? chosen?.description
              : chosen?.media?.name;

            setIds(
              chosen.media[0]?.telegram_id,
              chosen.media[0]?.id,
              chosen.media[0]?.duration,
              chosen?.title ? chosen?.title : chosen.media[0]?.name,
              chosen.person?.[0]?.name,
              chosen?.image?.full_image_url
                ? chosen?.image?.full_image_url
                : chosen?.media?.[0]?.image !== null
                ? chosen?.media?.[0]?.image
                : chosen?.person?.[0]?.image.full_image_url,
              chosen.id,
              chosen.slug,
              chosen?.meta_title
                ? chosen?.meta_title
                : chosen?.title && chosen?.title !== ""
                ? chosen?.title
                : chosen?.media?.name,
              chosen?.meta_description
                ? chosen?.meta_description
                : chosen?.description && chosen?.description !== ""
                ? chosen?.description
                : chosen?.media?.name
            );

            if (chosen.media[0]?.path) {
              setUrl(chosen.media[0]?.path, playList);
              playMusic();
            } else {
              try {
                const res = await axios.downloader.get(
                  `/${chosen.media[0]?.telegram_id}`
                );
                setUrl(res.data.download_link, playList);

                playMusic();
              } catch (error) {
                console.log(error);
              }
            }
            // changeHomeMeta(sendTitle, sendDescription);
          }
        }
      }
    }
    setNewProgress(0);
  };

  const handleNext = () => {
    //  موزیک بعدی
    nextMusic(audioRef.current);
    // setProgress(0);
    setNewProgress(0);
  };
  const handlePrevious = () => {
    // موزیک قبلی
    previousMusic(audioRef.current);
    // setProgress(0);
    setNewProgress(0);
  };

  const setIds = (
    tId,
    id,
    duration,
    name,
    singer,
    photo,
    postId,
    songSlug,
    newTitle,
    newDesc
  ) => {
    user !== null && addMusicToRecentlyViewed(1, postId);
    dispatch({
      type: SET_IDS,
      payload: {
        telegramId: tId,
        songId: id,
        totalDuration: duration,
        songName: name,
        songSinger: singer,
        songPhoto: photo,
        postId: postId,
        songSlug: songSlug,
        newTitle: newTitle,
        newDesc: newDesc,
      },
    });

    if (isAuth) {
      if (JSON.parse(localStorage.getItem("mainPlaylist")) === null) {
        let mainPlaylist = [];
        const item = { postId: postId, count: 1 };
        mainPlaylist.push(item);

        localStorage.setItem("mainPlaylist", JSON.stringify(mainPlaylist));
      } else {
        let mainPlaylist = JSON.parse(localStorage.getItem("mainPlaylist"));
        let item = mainPlaylist.find((x) => x.postId === postId);

        if (item === undefined) {
          const newItem = { postId: postId, count: 1 };
          mainPlaylist.push(newItem);
          localStorage.setItem("mainPlaylist", JSON.stringify(mainPlaylist));
        } else {
          let newMainPlaylist = mainPlaylist.filter((file) => {
            return file.postId !== postId;
          });
          let newItem = { postId: postId, count: item.count + 1 };
          newMainPlaylist.push(newItem);

          localStorage.setItem("mainPlaylist", JSON.stringify(newMainPlaylist));
          addMusicToMAINPlaylist(postId);
        }
      }
    } else {
      if (JSON.parse(localStorage.getItem("limitListTo10")) === null) {
        const limitListTo10 = [];
        const item = { postId: postId };
        limitListTo10.push(item);
        localStorage.setItem("limitListTo10", JSON.stringify(limitListTo10));
      } else {
        // if there is no user in the site, and if he had listen 10 music, force him to login or sign up

        let limitListTo10 = JSON.parse(localStorage.getItem("limitListTo10"));

        if (limitListTo10.length >= LimitListPlayNonLogin) {
          forceLogin();
        } else {
          let hasThisItem = limitListTo10.some((x) => x.postId === postId);
          if (!hasThisItem) {
            const item = { postId: postId };
            limitListTo10.push(item);
            localStorage.setItem(
              "limitListTo10",
              JSON.stringify(limitListTo10)
            );
          }
        }
      }
    }
  };
  const setUrl = (url, playlist = []) => {
    if (playlist !== state.playList) {
      setPlayList(playlist);
    }
    // console.log(url);
    dispatch({
      type: SET_CURRENT_URL,
      payload: url,
    });
    setNewProgress(0);
  };

  const setPlayList = (playlist, canDeleteSong = false) => {
    if (playlist !== state.playList) {
      dispatch({
        type: SET_PALYLIST,
        payload: {
          playList: playlist,
          canDeleteSong: canDeleteSong,
        },
      });
    }
  };
  const setNewProgress = (progress) => {
    progress = parseFloat(progress);
    dispatch({
      type: SET_PROGRESS,
      payload: progress === NaN ? 0 : progress,
    });
  };
  const handleChange = (newDuration) => {
    // تنظیم مدت زمان هنگام کلیک
    // state.seek = true;
    // state.seek = true;
    changeDuration(audioRef.current, newDuration);
    setNewProgress(newDuration);
  };
  const muteAndUnmuteMusic = (audioElement) => {
    // میوت و آن-میوت کردن آهنگ
    if (audioElement !== undefined) {
      if (state.mute) {
        audioElement.muted = false;
        dispatch({
          type: UNMUTE_MUSIC,
        });
      } else {
        audioElement.muted = true;
        dispatch({
          type: MUTE_MUSIC,
        });
      }
    }
  };

  const changeDuration = (audioElement, newDuration) => {
    if (audioElement !== undefined) {
      audioElement.currentTime =
        (audioRef.current.duration * newDuration) / 100;
    }
  };
  const changeVolume = (audioElement = audioRef.current, newVolume) => {
    // تغییر صدای آهنگ
    if (audioElement !== undefined) {
      audioElement.volume = newVolume / 100;
      dispatch({
        type: CHANGE_VOLUME,
        payload: newVolume / 100,
      });
    }
  };
  const setShowMusicBarOnMoblieRatio = () => {
    dispatch({ type: CHANGE_SHOW_MUSICBAR_ON_MOBILE_RATIO });
  };
  const putToMusicChangeList = (Songtime, action) => {
    const schema = {
      listen_duration: Songtime,
      isMobile: detectMob(),
      browserName: browser(),
      userId: null,
      action: action,
      date: getTimeToday(),
      favorite: false,
      download: false,
      // songId: ids.songId,
      // telegramId: ids.telegramId,
      // destination_url: null,
      CurrentUrl: location.pathname,
    };

    musicChangeList.push(schema);
    // console.log(musicChangeList);
    setMusicChangeList(musicChangeList);
  };

  const zeroPad = (num, places) => String(num).padStart(places, "0");

  const playThisListFromMyProflie = async (listShow) => {
    setIds(
      listShow?.[0]?.post.media[0]?.telegram_id,
      listShow?.[0]?.post.media[0]?.id,
      listShow?.[0]?.post.media[0]?.duration,
      listShow?.[0]?.post?.title
        ? listShow?.[0]?.post?.title
        : listShow?.[0]?.post.media[0]?.name,
      listShow?.[0]?.post.person?.[0]?.name,
      listShow?.[0]?.post?.media?.[0]?.image !== null
        ? listShow?.[0]?.post?.media?.[0]?.image
        : listShow?.[0]?.post?.person?.[0]?.image.full_image_url,
      listShow?.[0]?.post.id,
      listShow?.[0]?.post?.slug,
      listShow?.[0]?.post?.meta_title
        ? listShow?.[0]?.post?.meta_title
        : listShow?.[0]?.post?.title,
      listShow?.[0]?.post?.meta_description
        ? listShow?.[0]?.post?.meta_description
        : listShow?.[0]?.post?.description
    );
    if (listShow?.[0]?.post.media[0]?.path) {
      setUrl(listShow?.[0]?.post.media[0]?.path, listShow);
      playMusic();
    } else {
      try {
        const res = await axios.downloader.get(
          `${item?.post?.media[0]?.telegram_id}`
        );
        setUrl(res.data.download_link, playList);
        playMusic();
        ChangeShowMusic(true);
      } catch (error) {
        console.log(error);
      }
      // fetch(`https://downloader.safine.co/${item?.post?.media[0]?.telegram_id}`)
      //   .then((respone) => respone.json())
      //   .then((res) => setUrl(res.download_link, playList))
      //   .then(() => playMusic())
      //   .then(() => ChangeShowMusic(true))
      //   .catch((err) => console.log(err));
    }
  };
  const PauseMusicKey = () => {
    if (audioRef.current.paused) {
      if (!audioRef.current.ended) {
        dispatch({
          type: PAUSE_MUSIC,
        });
      }
    }
  };
  const playMusicKey = (audioElement = audioRef.current) => {
    if (audioElement !== undefined) {
      if (!state.playing) {
        dispatch({
          type: PLAY_MUSIC,
        });
      }
    }
  };

  const changeLoop = () => {
    let whichSituation = "off";
    switch (state.loop) {
      case "off":
        whichSituation = "loop";
        break;
      case "loop":
        whichSituation = "once";
        break;
      case "once":
        whichSituation = "off";
        break;
    }

    dispatch({
      type: CHANGE_LOOP_STATE,
      payload: whichSituation,
    });
  };
  const changeShuffle = () => {
    dispatch({
      type: CHANGE_SHUFFLE,
    });
  };
  const repeatSongAgain = (audioElement = audioRef.current) => {
    audioElement.pause();
    audioElement.load();
    setNewProgress(0);
    audioElement.play();
  };
  return (
    <PlayerContext.Provider
      value={{
        setShowMusicBarOnMoblieRatio,
        changeVolume,
        changeDuration,
        nextMusic,
        previousMusic,
        setUrl,
        playMusic,
        handleChange,
        changeShuffle,
        changeLoop,
        setIds,
        playAndPauseMusic,
        muteAndUnmuteMusic,
        setPlayList,
        playThisListFromMyProflie,
        mute: state.mute,
        playing: state.playing,
        volume: state.volume,
        duration: state.duration,
        currentUrl: state.currentUrl,
        playList: state.playList,
        // playList: playList,
        // progress: state.progress,
        currentProgress: state.currentProgress,
        songSinger: state.songSinger,
        songName: state.songName,
        shuffle: state.shuffle,
        loop: state.loop,
        totalDuration: state.totalDuration,
        songId: state.songId,
        songPhoto: state.songPhoto,
        loading: state.loading,
        showMusicBarOnMoblieRatio: state.showMusicBarOnMoblieRatio,
      }}
    >
      <Head>
        <title>{state.songName}</title>

        <link
          rel="apple-touch-icon"
          id="musicPhoto"
          type="image/jpg"
          sizes="16x16"
          href={state.songPhoto}
        />
        {/* <link rel="icon" href="/favicon_safine.png" /> */}
      </Head>

      {props.children}

      <Fragment>
        <div id="audio">
          <audio
            ref={audioRef}
            id="audio2"
            className="player"
            // autoPlay={state.playing}
            src={state.currentUrl}
            // src={
            //   "https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3"
            // }
            onLoadedMetadata={async () => {
              if (checkIfForce()) {
                changeShowLoginModal(true);
                dispatch({
                  type: FORCE_STOP,
                });
              } else {
                await audioRef.current.play();
                dispatch({
                  type: PLAY_MUSIC,
                });
              }
            }}
            onEnded={() => {
              if (audioRef?.current && audioRef?.current?.ended) {
                if (state.loop === "once") {
                  repeatSongAgain();
                } else nextMusic();
              } else if (audioRef?.current?.ended) {
                dispatch({ type: PAUSE_MUSIC });
              }
            }}
            onPause={PauseMusicKey}
            onPlay={playMusicKey}
            type="audio/mpeg"
            preload="metadata"
          ></audio>
        </div>

        {/* for mobile ratio */}
        <Fragment
        // for mobile ratio
        >
          <div className={phonestyles.phoneMusicBar__slide}>
            <SwipeableDrawer
              classes={{
                paper: classes.paper,
              }}
              variant="persistent"
              className={phonestyles.phoneMusicBar__slide}
              anchor={"bottom"}
              open={state.showMusicBarOnMoblieRatio}
              onClose={() => setShowMusicBarOnMoblieRatio()}
              onOpen={() => setShowMusicBarOnMoblieRatio()}
            >
              <div className={phonestyles.player__zone}>
                <div
                  className={`${phonestyles.current_time} align-self-center `}
                >
                  <Time />
                </div>

                <div className={phonestyles.player}>
                  <Bar handleChange={handleChange} loading={state.loading} />
                </div>

                <div className={`${phonestyles.last_time} align-self-center`}>
                  {Math.floor(state.totalDuration / 60) +
                    ":" +
                    zeroPad(Math.floor(state.totalDuration % 60), 2)}
                </div>
              </div>

              <div
                className={`${phonestyles.showSongInfo} d-flex text-light pb-2 px-2 justify-content-between`}
              >
                <div className="player__actions d-flex justify-content-center ">
                  <div
                    className={`${phonestyles.icon} playlist_sound_playlist d-flex justify-content-between align-self-end  align-self-center`}
                    onClick={() => showLeftList(leftList ? false : true)}
                  >
                    <QueueMusic style={{ fontSize: 22 }} />
                  </div>
                  <div className={phonestyles.icon}>
                    {isAuth && (
                      <PlaylistAddRounded
                        style={{ fontSize: 22 }}
                        onClick={() =>
                          setWhichSongToSaveInPlaylist(state.songId)
                        }
                      />
                    )}
                  </div>
                  <div
                    onClick={() => changeShuffle()}
                    className={`${phonestyles.icon}  ${
                      state.shuffle ? "" : styles.icon_press
                    } align-self-center`}
                  >
                    <ShuffleRounded style={{ fontSize: 20 }} />
                  </div>

                  <div
                    className={phonestyles.icon}
                    onClick={changeLoop}
                    className={`${phonestyles.icon}  ${
                      state.loop === "off" ? styles.icon_press : ""
                    } align-self-center`}
                  >
                    {state.loop !== "once" ? (
                      <RepeatRounded style={{ fontSize: 20 }} />
                    ) : (
                      <RepeatOneRounded style={{ fontSize: 20 }} />
                    )}
                  </div>
                </div>
                <div className={phonestyles.mobileSound}>
                  <div
                    className={`${phonestyles.icon} col-2 p-0 d-flex align-self-center`}
                    onClick={() => muteAndUnmuteMusic(audioRef.current)}
                  >
                    {state.mute ? <VolumeOff /> : <VolumeUp />}
                  </div>

                  <Slider
                    classes={{
                      rail: classes.rail,
                      track: classes.rail,
                      thumb: classes.thumb,
                    }}
                    className="mobileSound "
                    value={state.volume * 100}
                    onChange={(e, newVolume) =>
                      changeVolume(audioRef.current, newVolume)
                    }
                    aria-labelledby="continuous-slider"
                  />
                </div>
              </div>
            </SwipeableDrawer>
          </div>

          {state.currentUrl && (
            <Slide direction="up" timeout={500} in={showMusic}>
              <div
                className={`${phonestyles.phoneMusicBar}  d-flex text-light`}
              >
                <div
                  className={`${phonestyles.phoneMusicBar__left} d-flex align-self-center 
                  justify-content-start`}
                >
                  <img
                    className={phonestyles.phoneMusicBar__img}
                    src={
                      state.songPhoto !== null
                        ? state.songPhoto
                        : "/defualtPhoto.jpeg"
                    }
                    alt="logo"
                  />
                  <div
                    className={`${phonestyles.phoneMusicBar__info} align-self-center `}
                  >
                    <div className={phonestyles.phoneMusicBar__title}>
                      <div className={phonestyles.scroll}>
                        <span>{state.songName}</span>
                      </div>
                    </div>
                    <div className={phonestyles.phoneMusicBar__singer}>
                      <span>{state.songSinger}</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`${phonestyles.phoneMusicBar__right} d-flex align-self-center 
                  justify-content-around`}
                >
                  <div className="icon " onClick={handleNext}>
                    <SkipNextRounded style={{ fontSize: "25px" }} />
                  </div>
                  <div className="icon ">
                    {/* SpinnerLoading */}
                    {state.loading ? (
                      <SpinnerLoading />
                    ) : state.playing ? (
                      <div
                        className=""
                        onClick={() => playAndPauseMusic(audioRef.current)}
                      >
                        <Pause style={{ fontSize: "25px" }} />
                      </div>
                    ) : (
                      <div
                        className=""
                        onClick={() => playAndPauseMusic(audioRef.current)}
                      >
                        <PlayCircleFilledRounded style={{ fontSize: "25px" }} />
                      </div>
                    )}
                  </div>
                  <div className="icon" onClick={handlePrevious}>
                    <SkipPreviousRounded style={{ fontSize: "25px" }} />
                  </div>
                  <div
                    className="icon"
                    onClick={() => setShowMusicBarOnMoblieRatio()}
                  >
                    {state.showMusicBarOnMoblieRatio ? (
                      <ExpandMoreRounded style={{ fontSize: "25px" }} />
                    ) : (
                      <ExpandLessRounded style={{ fontSize: "25px" }} />
                    )}
                  </div>
                </div>
              </div>
            </Slide>
          )}
        </Fragment>
        {/* for web ratio
       /////////////////////////////////////////////
       //////////////////////////////////////////// */}
        <Fragment>
          <Slide direction="up" timeout={500} in={showMusic}>
            <div
              className={`${styles.musicBar} text-light`}
              style={{ display: showMusic ? "block" : "none" }}
            >
              <div
                className={`${styles.position} d-flex justify-content-around`}
              >
                <div className={styles.musicBar__right}>
                  <div className={styles.musicBar__info}>
                    <div className={styles.musicBar__infoImage}>
                      <img src={state.songPhoto} alt="logo" />
                    </div>
                    <div className={styles.musicBar__infoDesc}>
                      <div className={styles.infoDesc__title}>
                        <div className={phonestyles.scroll}>
                          <span>{state.songName}</span>
                        </div>
                      </div>
                      <div className={styles.infoDesc__person}>
                        {state.songSinger}
                      </div>
                    </div>
                  </div>
                </div>
                <div className={`${styles.musicBar__center} ${styles.player} `}>
                  <div className="player__actions d-flex justify-content-center ">
                    <div
                      onClick={() => changeShuffle()}
                      className={`${styles.icon}  ${
                        state.shuffle ? "" : styles.icon_press
                      } align-self-center`}
                    >
                      <ShuffleRounded style={{ fontSize: 25 }} />
                    </div>
                    <div
                      className={`${styles.icon}  `}
                      onClick={handlePrevious}
                    >
                      <SkipPreviousRounded style={{ fontSize: 35 }} />
                    </div>
                    <div className={`${styles.icon}  align-self-center `}>
                      {state.loading ? (
                        <SpinnerLoading className={styles.spinner} />
                      ) : // 'spinerr'
                      state.playing ? (
                        <div
                          className=""
                          onClick={() => playAndPauseMusic(audioRef.current)}
                        >
                          <Pause style={{ fontSize: 35 }} />
                        </div>
                      ) : (
                        <div
                          className=""
                          onClick={() => playAndPauseMusic(audioRef.current)}
                        >
                          <PlayArrowRounded style={{ fontSize: 35 }} />
                        </div>
                      )}
                    </div>
                    <div className={`${styles.icon} `} onClick={handleNext}>
                      <SkipNextRounded style={{ fontSize: 35 }} />
                    </div>
                    <div
                      onClick={changeLoop}
                      className={`${styles.icon}  ${
                        state.loop === "off" ? `${styles.icon_press}` : ""
                      } align-self-center`}
                    >
                      {state.loop !== "once" ? (
                        <RepeatRounded style={{ fontSize: 25 }} />
                      ) : (
                        <RepeatOneRounded style={{ fontSize: 25 }} />
                      )}
                    </div>
                  </div>
                  <div className={`${styles.player__zone} d-flex `}>
                    <div
                      className={`${styles.current_time} align-self-center text-right`}
                    >
                      <Time />
                    </div>
                    <ClickAwayListener onClickAway={() => (state.seek = false)}>
                      <div
                        className={`${styles.playerMusic} mt-1 align-self-center mx-3 `}
                        onMouseUp={() => (state.seek = false)}
                      >
                        <Bar
                          handleChange={handleChange}
                          loading={state.loading}
                        />
                      </div>
                    </ClickAwayListener>
                    <div
                      className={`${styles.last_time} align-self-center text-left `}
                    >
                      {Math.floor(state.totalDuration / 60) +
                        ":" +
                        zeroPad(Math.floor(state.totalDuration % 60), 2)}
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.playlist_sound}   ${styles.musicBar__left} `}
                >
                  <div className="d-flex align-items-center ">
                    <div className={styles.icon}>
                      {/* {isAuth && ( */}
                      <PlaylistAddRounded
                        fontSize="large"
                        onClick={() =>
                          setWhichSongToSaveInPlaylist(state.songId)
                        }
                      />
                      {/* )} */}
                    </div>
                    <div
                      className={`${styles.icon} ${styles.playlist_sound_playlist}  d-flex justify-content-end align-self-end  `}
                      onClick={() => showLeftList(true)}
                    >
                      <QueueMusic fontSize="large" />
                    </div>
                  </div>

                  <div className={`${styles.sound}  d-flex `}>
                    <div className={`${styles.progressBar}  p-0  w-100 mt-1 `}>
                      <Slider
                        // className={styles.playerSlider}
                        value={state.volume * 100}
                        classes={{
                          rail: classes.rail,
                          track: classes.rail,
                          thumb: classes.thumb,
                        }}
                        onChange={(e, newVolume) =>
                          changeVolume(audioRef.current, newVolume)
                        }
                        aria-labelledby="continuous-slider"
                      />
                    </div>
                    <div
                      className={`${styles.soundIcon}  col-2 p-0 d-flex align-self-center mr-2`}
                      onClick={() => muteAndUnmuteMusic(audioRef.current)}
                    >
                      {state.mute ? <VolumeOff /> : <VolumeUp />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slide>
        </Fragment>
      </Fragment>
    </PlayerContext.Provider>
  );
};

export default PlayerState;
