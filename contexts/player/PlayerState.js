import {
  Fragment,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import PlayerContext from './playerContext';
import {
  ClickAwayListener,
  Drawer,
  ListItem,
  ListItemText,
  Slide,
  Slider,
  SwipeableDrawer,
} from '@material-ui/core';
import appContext from '../app/appContext';
import authContext from '../auth/authContext';
import styles from '../../styles/Player.module.css';
import phonestyles from '../../styles/PlayerPhone.module.css';
import playerReducer from './playerReducer';
import { detect } from 'detect-browser';
import SpinnerLoading from '../../components/spinner/SpinnerLoading';
import {
  ExpandLessRounded,
  ExpandMoreRounded,
  Pause,
  PlayArrowRounded,
  PlayCircleFilledRounded,
  PlaylistAddRounded,
  QueueMusic,
  RepeatRounded,
  ShuffleRounded,
  SkipNextRounded,
  SkipPreviousRounded,
  VolumeOff,
  VolumeUp,
} from '@material-ui/icons';
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
} from './types';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
  rail: {
    height: '4px',
    color: 'white',
  },
  thumb: {
    color: 'white',
  },
  paper: {
    backgroundColor: 'rgb(78, 83, 88)',
    bottom: '109px',
    /* max-width: 360px, */
    overflow: 'hidden',
    /* top: 10%, */
    /* position: relative, */
    zIndex: '999',
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
    '-' +
    (today.getMonth() + 1) +
    '-' +
    today.getDate() +
    '/' +
    today.getHours() +
    '-' +
    today.getMinutes() +
    '-' +
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
  } = useContext(appContext);
  const classes = useStyles();
  const { isAuth } = useContext(authContext);

  const initialState = {
    playList: [],
    playing: false,
    loading: false,
    mute: false,
    seek: false,
    shuffle: false,
    duration: 0,
    totalDuration: 0,
    currentUrl: null,
    audioElement: null,
    volume: 1,
    telegramId: null,
    songId: null,
    songPhoto: null,
    songName: '',
    songSinger: '',
    currentProgress: 0,
    showMusicBarOnMoblieRatio: false,
  };
  const [state, dispatch] = useReducer(playerReducer, initialState);
  const { playList } = state;
  const audioRef = useRef();
  useEffect(() => {
    //   ???????? ?????????? ??????progress ?????? ???? ?????? ?????? ??????

    if (state.playing && !state.loading) {
      //progress ???????? ?????? ????????
      const timer = setInterval(() => {
        if (audioRef?.current && audioRef?.current?.ended && !state.seek) {
          nextMusic();
        } else if (
          audioRef?.current?.paused &&
          state.currentUrl !== null &&
          !state.loading
        ) {
          audioRef?.current?.play();
        }

        let progress = parseFloat(
          (audioRef?.current?.currentTime * 100) / audioRef?.current?.duration
        ).toFixed(2);
        setNewProgress(progress);
        dispatch({
          type: CHANGE_DURATION,
          payload: {
            currentTime: audioRef.current.currentTime,
          },
        });
      }, 1000);
      return () => {
        clearInterval(timer);
      };
    }
  }, [state.playing, state.loading, state.seek]);

  const playMusic = (audioElement = audioRef.current) => {
    if (audioElement) {
      audioElement.pause();
      audioElement.load();

      // audioElement.play();
    }
    dispatch({
      type: PLAY_MUSIC,
    });
  };

  const playAndPauseMusic = (audioElement = audioRef.current) => {
    // ?????? ?? ???????? ???????? ????????
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

    putToMusicChangeList(audioElement.currentTime, 'next');
    let last = null;
    // console.log(playList);
    if (playList !== undefined) {
      for (let i = 0; i < playList.length; i++) {
        if (state.songId === playList[i].media[0].id) {
          let which;
          if (state.shuffle) {
            which = Math.floor(Math.random() * Math.floor(playList?.length));
          } else {
            which = i + 1;
          }
          let chosen =
            playList[which] !== undefined ? playList[which] : playList[0];
          setIds(
            chosen.media[0]?.telegram_id,
            chosen.media[0]?.id,
            chosen.media[0]?.duration,
            chosen.media[0]?.name,
            chosen.person?.[0]?.name,
            chosen?.media?.[0]?.image !== null
              ? chosen?.media?.[0]?.image
              : chosen?.person?.[0]?.image.full_image_url
          );
          fetch(
            `http://downloader.7negare.ir/download/${chosen.media[0]?.telegram_id}`
          )
            .then((respone) => respone.json())
            .then((res) => setUrl(res.download_link, playList))
            .then(() => playMusic())
            .catch((err) => console.log(err));
          // try {
          //   const res = await axios.downloader.get(
          //     `/${chosen.media[0]?.telegram_id}`
          //   );
          //   setUrl(res.data.download_link, playList);

          //   playMusic();
          // } catch (error) {
          //   console.log(error);
          // }
        }
      }
    }

    setNewProgress(0);
  };
  const handleNext = () => {
    //  ?????????? ????????
    nextMusic(audioRef.current);
    // setProgress(0);
    setNewProgress(0);
  };
  const handlePrevious = () => {
    // ?????????? ????????
    previousMusic(audioRef.current);
    // setProgress(0);
    setNewProgress(0);
  };
  const previousMusic = async (audioElement = audioRef.current) => {
    audioElement.pause();

    putToMusicChangeList(audioElement.currentTime, 'previous');
    let last = null;
    if (playList !== undefined) {
      for (let i = 0; i < playList.length; i++) {
        if (state.songId === playList[i].media[0].id) {
          let which;
          if (state.shuffle) {
            which = Math.floor(Math.random() * Math.floor(playList?.length));
          } else {
            which = i - 1;
          }
          let chosen =
            playList[which] !== undefined
              ? playList[which]
              : playList[playList.length - 1];

          setIds(
            chosen.media[0]?.telegram_id,
            chosen.media[0]?.id,
            chosen.media[0]?.duration,
            chosen.media[0]?.name,
            chosen.person?.[0]?.name,
            chosen?.media?.[0]?.image !== null
              ? chosen?.media?.[0]?.image
              : chosen?.person?.[0]?.image.full_image_url
          );

          fetch(
            `http://downloader.7negare.ir/download/${chosen.media[0]?.telegram_id}`
          )
            .then((respone) => respone.json())
            .then((res) => setUrl(res.download_link, playList))
            .then(() => playMusic())
            .catch((err) => console.log(err));

          // try {
          //   const res = await axios.downloader.get(
          //     `/${chosen.media[0]?.telegram_id}`
          //   );
          //   setUrl(res.data.download_link, playList);

          //   playMusic();
          // } catch (error) {
          //   console.log(error);
          // }
        }
      }
    }
    setNewProgress(0);
  };
  const setIds = (tId, id, duration, name, singer, photo) => {
    if (audioRef.current.played) {
      audioRef.current.pause();
    }
    dispatch({
      type: SET_IDS,
      payload: {
        telegramId: tId,
        songId: id,
        totalDuration: duration,
        songName: name,
        songSinger: singer,
        songPhoto: photo,
      },
    });
  };
  const setUrl = (url, playlist) => {
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

  const setPlayList = (playlist) => {
    if (playlist !== state.playList) {
      dispatch({
        type: SET_PALYLIST,
        payload: playlist,
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
    // ?????????? ?????? ???????? ?????????? ????????
    // state.seek = true;
    state.seek = true;
    changeDuration(audioRef.current, newDuration);
    setNewProgress(newDuration);
  };
  const muteAndUnmuteMusic = (audioElement) => {
    // ???????? ?? ????-???????? ???????? ????????
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
    // ?????????? ???????? ????????
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

  const [musicChangeList, setMusicChangeList] = useState([]);

  const zeroPad = (num, places) => String(num).padStart(places, '0');
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
        // changeShuffle,
        // changeLoop,
        setIds,
        playAndPauseMusic,
        muteAndUnmuteMusic,
        setPlayList,
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
        // loop: loop,
        totalDuration: state.totalDuration,
        songId: state.songId,
        songPhoto: state.songPhoto,
        loading: state.loading,
        showMusicBarOnMoblieRatio: state.showMusicBarOnMoblieRatio,
      }}
    >
      {props.children}
      <Fragment>
        <div id='audio'>
          <audio
            ref={audioRef}
            className='player'
            // autoPlay={state.playing}
            src={state.currentUrl}
            // src={
            //   'https://files.musico.ir/Song/Ehsan%20Daryadel%20-%20Koochamoon%20(320).mp3'
            // }
            type='audio/mpeg'
            preload='metadata'
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
              variant='persistent'
              className={phonestyles.phoneMusicBar__slide}
              anchor={'bottom'}
              open={state.showMusicBarOnMoblieRatio}
              onClose={() => setShowMusicBarOnMoblieRatio()}
              onOpen={() => setShowMusicBarOnMoblieRatio()}
            >
              <div className={phonestyles.player__zone}>
                <div
                  className={`${phonestyles.current_time} align-self-center `}
                >
                  {Math.floor(audioRef.current?.currentTime / 60) +
                    ':' +
                    zeroPad(Math.floor(audioRef.current?.currentTime % 60), 2)}
                </div>

                <div className={phonestyles.player}>
                  <Slider
                    classes={{
                      rail: classes.rail,
                      track: classes.rail,
                      thumb: classes.thumb,
                    }}
                    variant='determinate'
                    value={state.currentProgress}
                    onChange={(e, newDuration) => handleChange(newDuration)}
                  />
                </div>

                <div className={`${phonestyles.last_time} align-self-center`}>
                  {' '}
                  {Math.floor(state.totalDuration / 60) +
                    ':' +
                    zeroPad(Math.floor(state.totalDuration % 60), 2)}
                </div>
              </div>

              <div
                className={`${phonestyles.showSongInfo} d-flex text-light pb-2 px-2 justify-content-between`}
              >
                <div className='player__actions d-flex justify-content-center '>
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
                        // onClick={() =>
                        //   setWhichSongToSaveInPlaylist(state.songId)
                        // }
                      />
                    )}
                  </div>
                  <div
                    // onClick={() => changeShuffle()}
                    className={phonestyles.icon}
                  >
                    <ShuffleRounded style={{ fontSize: 20 }} />
                  </div>

                  <div
                    className={phonestyles.icon}

                    // onClick={changeLoop}
                    // className={`${phonestyles.icon}   ${
                    //   loop ? 'icon-press' : ''
                    // } align-self-center `}
                  >
                    <RepeatRounded style={{ fontSize: 20 }} />
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
                    className='mobileSound '
                    value={state.volume * 100}
                    onChange={(e, newVolume) =>
                      changeVolume(audioRef.current, newVolume)
                    }
                    aria-labelledby='continuous-slider'
                  />
                </div>
              </div>
            </SwipeableDrawer>
          </div>

          {state.currentUrl && (
            <Slide direction='up' timeout={500} in={showMusic}>
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
                        : '/defualtPhoto.jpeg'
                    }
                    alt='logo'
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
                  <div className='icon ' onClick={handleNext}>
                    <SkipNextRounded style={{ fontSize: '25px' }} />
                  </div>
                  <div className='icon '>
                    {/* SpinnerLoading */}
                    {state.loading ? (
                      <SpinnerLoading />
                    ) : state.playing ? (
                      <div
                        className=''
                        onClick={() => playAndPauseMusic(audioRef.current)}
                      >
                        <Pause style={{ fontSize: '25px' }} />
                      </div>
                    ) : (
                      <div
                        className=''
                        onClick={() => playAndPauseMusic(audioRef.current)}
                      >
                        <PlayCircleFilledRounded style={{ fontSize: '25px' }} />
                      </div>
                    )}
                  </div>
                  <div className='icon' onClick={handlePrevious}>
                    <SkipPreviousRounded style={{ fontSize: '25px' }} />
                  </div>
                  <div
                    className='icon'
                    onClick={() => setShowMusicBarOnMoblieRatio()}
                  >
                    {state.showMusicBarOnMoblieRatio ? (
                      <ExpandMoreRounded style={{ fontSize: '25px' }} />
                    ) : (
                      <ExpandLessRounded style={{ fontSize: '25px' }} />
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
          <Slide direction='up' timeout={500} in={showMusic}>
            <div
              className={`${styles.musicBar} text-light`}
              style={{ display: showMusic ? 'block' : 'none' }}
            >
              <div
                className={`${styles.position} d-flex justify-content-around`}
              >
                <div className={styles.musicBar__right}>
                  <div className={styles.musicBar__info}>
                    <div className={styles.musicBar__infoImage}>
                      <img src={state.songPhoto} alt='logo' />
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
                <div
                  className={`${styles.musicBar__center} ${styles.player} mt-3`}
                >
                  <div className='player__actions d-flex justify-content-center '>
                    <div
                      // onClick={() => changeShuffle()}
                      className={`${styles.icon}  ${
                        state.shuffle ? `${styles.icon_press}` : ''
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
                          className=''
                          onClick={() => playAndPauseMusic(audioRef.current)}
                        >
                          <Pause style={{ fontSize: 35 }} />
                        </div>
                      ) : (
                        <div
                          className=''
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
                      // onClick={changeLoop}
                      className={`${styles.icon}  ${
                        state.shuffle ? `${styles.icon_press}` : ''
                      } align-self-center`}
                    >
                      <RepeatRounded style={{ fontSize: 25 }} />
                    </div>
                  </div>
                  <div className={`${styles.player__zone} d-flex mt-2`}>
                    <div
                      className={`${styles.current_time} align-self-center text-right`}
                    >
                      {Math.floor(audioRef.current?.currentTime / 60) +
                        ':' +
                        zeroPad(
                          Math.floor(audioRef.current?.currentTime % 60),
                          2
                        )}
                    </div>
                    <ClickAwayListener onClickAway={() => (state.seek = false)}>
                      <div
                        className={`${styles.playerMusic} mt-1 align-self-center mx-3 `}
                        onMouseUp={() => (state.seek = false)}
                      >
                        <Slider
                          // className={styles.playerSlider}
                          classes={{
                            rail: classes.rail,
                            track: classes.rail,
                            thumb: classes.thumb,
                          }}
                          variant='determinate'
                          value={state.currentProgress}
                          onChange={(e, newDuration) =>
                            handleChange(newDuration)
                          }
                        />
                      </div>
                    </ClickAwayListener>
                    <div
                      className={`${styles.last_time} align-self-center text-left `}
                    >
                      {Math.floor(state.totalDuration / 60) +
                        ':' +
                        zeroPad(Math.floor(state.totalDuration % 60), 2)}
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.playlist_sound}   ${styles.musicBar__left} mt-3 mb-2`}
                >
                  <div className='d-flex justify-content-around  '>
                    <div className={styles.icon}>
                      {/* {isAuth && ( */}
                      <PlaylistAddRounded
                        fontSize='large'
                        // onClick={() =>
                        //   setWhichSongToSaveInPlaylist(state.songId)
                        // }
                      />
                      {/* )} */}
                    </div>
                    <div
                      className={`${styles.icon} ${styles.playlist_sound_playlist}  d-flex justify-content-end align-self-end mb-2 `}
                      onClick={() => showLeftList(true)}
                    >
                      <QueueMusic fontSize='large' />
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
                        aria-labelledby='continuous-slider'
                      />
                    </div>
                    <div
                      className={`${styles.soundIcon}  col-2 p-0 d-flex align-self-center mr-2`}
                      // onClick={() => muteAndUnmuteMusic(audioRef.current)}
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
