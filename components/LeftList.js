import { makeStyles, Slide } from "@material-ui/core";
import {
  Close,
  Pause,
  PlayArrowRounded,
  RepeatOneRounded,
  RepeatRounded,
  Shuffle,
  SkipNextRounded,
  SkipPreviousRounded,
} from "@material-ui/icons";
import { useContext } from "react";
import appContext from "../contexts/app/appContext";
import Bar from "../contexts/player/Bar";
import playerContext from "../contexts/player/playerContext";
import Time from "../contexts/player/Time";
import styles from "../styles/LeftList.module.css";
import SongOnLeft from "./SongOnLeft";
const useStyles = makeStyles({
  rail: {
    height: "4px",
    color: "white",
  },
  thumb: {
    color: "white",
  },
});
const LeftList = () => {
  const zeroPad = (num, places) => String(num).padStart(places, "0");
  const { showLeftList, leftList } = useContext(appContext);
  const {
    playList,
    // progress,
    currentProgress,
    handleChange,
    previousMusic,
    nextMusic,
    playAndPauseMusic,
    playing,
    duration,
    totalDuration,
    changeShuffle,
    shuffle,
    changeLoop,
    loop,
    songSinger,
    songName,
    songPhoto,
  } = useContext(playerContext);
  const classes = useStyles();

  return (
    <Slide direction="right" timeout={500} in={leftList}>
      <div className={` p-0 ${styles.playList} text-light`}>
        <div className={styles.bg__gray}>
          <Close
            className={styles.closeBtn}
            onClick={() => showLeftList(false)}
            fontSize="large"
          />
          <div className={`${styles.playerInfo}  d-flex `}>
            <div className={`${styles.info__image} mr-3`}>
              <img src={songPhoto} alt="" />
            </div>
            <div className={`${styles.info} mr-3`}>
              <div className={`${styles.info__title} mb-2`}>{songName}</div>
              <div className={`${styles.info__person} mb-4`}>{songSinger}</div>
            </div>
          </div>
          <div
            className={`${styles.icons} d-flex justify-content-around mt-3 mb-4`}
          >
            <div
              className={`${styles.icon} align-self-center ${
                shuffle ? "" : styles.icon_press
              } align-items-center`}
              onClick={() => changeShuffle()}
            >
              <Shuffle style={{ fontSize: 25 }} />
              {/* {shuffle && <span className="icon__title">shuffle</span>} */}
            </div>

            <div className={styles.icon} onClick={() => previousMusic()}>
              <SkipPreviousRounded style={{ fontSize: 35 }} />
            </div>
            <div
              className={`${styles.icons}   ${styles.icon} `}
              onClick={() => playAndPauseMusic()}
            >
              {playing ? (
                <Pause style={{ fontSize: 35 }} />
              ) : (
                <PlayArrowRounded style={{ fontSize: 35 }} />
              )}
            </div>
            <div className={styles.icon} onClick={() => nextMusic()}>
              <SkipNextRounded style={{ fontSize: 35 }} />
            </div>
            <div
              onClick={() => changeLoop()}
              className={`${styles.icon} d-flex ${
                loop ? `${styles.icon_press}` : ""
              } align-items-center`}
            >
              {loop !== "once" ? (
                <RepeatRounded style={{ fontSize: 25 }} />
              ) : (
                <RepeatOneRounded style={{ fontSize: 25 }} />
              )}
            </div>
          </div>

          <div
            className={`${styles.playlist__musicBar} m d-flex mb-4 mt-2 justify-content-center`}
          >
            <div className="player__zone d-flex  col-10 p-0">
              <div
                className={`${styles.current_time}  d-flex align-items-center`}
              >
                <Time />
              </div>

              <div
                className={`${styles.player} d-flex align-items-center mx-2`}
              >
                <Bar handleChange={handleChange} />
              </div>
              <div className={`${styles.last_time} d-flex align-items-center`}>
                {Math.floor(totalDuration / 60) +
                  ":" +
                  zeroPad(Math.floor(totalDuration % 60), 2)}
              </div>
            </div>
          </div>
        </div>
        {playList && (
          <div className={styles.songs}>
            {playList.map((item, i) => (
              <SongOnLeft
                key={i}
                item={item?.post ? item?.post : item}
                playlist={playList}
                zeroPad={zeroPad}
                number={i + 1}
              />
            ))}
          </div>
        )}
      </div>
    </Slide>
  );
};

export default LeftList;
