import { useContext } from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import styles from "../styles/SongOnLeft.module.css";
import barOnPlayingMusic from "../public/barOnPlayingMusic.gif";
import appContext from "../contexts/app/appContext";
import playerContext from "../contexts/player/playerContext";
import Image from "next/image";
import axios from "../axios/axios";

const SongOnLeft = ({ item, playlist, number, zeroPad }) => {
  const { playing, setUrl, playList, playMusic, setIds, songId } =
    useContext(playerContext);
  const { ChangeShowMusic, showMusic } = useContext(appContext);

  const paly = async () => {
    setIds(
      item?.media[0]?.telegram_id,
      item?.media[0]?.id,
      item?.media[0]?.duration,
      item?.title ? item?.title : item?.media[0]?.name,
      item?.person?.[0]?.name,
      item?.image?.full_image_url
        ? item?.image?.full_image_url
        : item?.media?.[0]?.image !== null
        ? item?.media?.[0]?.image
        : item?.person?.[0]?.image.full_image_url !== null
        ? item?.person?.[0]?.image.full_image_url
        : "/defualtPhoto.jpeg",
      item?.id,
      item?.slug,
      item?.meta_title ? item?.meta_title : item?.title,
      item?.meta_description ? item?.meta_description : item?.description
    );
    if (!showMusic) {
      ChangeShowMusic(true);
    }
    if (item?.media[0]?.path) {
      // console.log("path");
      setUrl(item?.media[0]?.path, playList);
      playMusic();
    } else {
      try {
        const res = await axios.downloader.get(
          `/${item?.media[0]?.telegram_id}`
        );
        setUrl(res.data.download_link, playList);

        playMusic();
        ChangeShowMusic(true);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const myloader = ({ src }) => {
    return src;
  };
  // console.log(item?.media[0]);
  return (
    <div className="songOnLeft">
      <div className={`${styles.song} d-flex my-5 justify-content-between`}>
        <div className="song__right d-flex">
          <div className={`${styles.number} align-self-center`}>{number}</div>
          <div className={styles.song__image} onClick={() => paly()}>
            <img
              src={
                item?.image?.full_image_url
                  ? item?.image?.full_image_url
                  : item?.media?.[0]?.image !== null
                  ? item?.media?.[0]?.image
                  : item?.person?.[0]?.image.full_image_url !== null
                  ? item?.person?.[0]?.image.full_image_url
                  : "/defualtPhoto.jpeg"
              }
              alt=""
            />
            {item?.media[0]?.id === songId && (
              <Image
                src={barOnPlayingMusic}
                layout="fill"
                alt=""
                loader={myloader}
                className={styles.song__imageBarOnPlayingMusic}
                unoptimized
              />
            )}
          </div>

          <div className={`${styles.song__info} mr-3 align-self-center `}>
            <div className={styles.song__title}>
              <span>{item?.title ? item?.title : item?.media?.[0]?.name}</span>
            </div>
            <div className={styles.song__person}>{item?.person?.[0]?.name}</div>
          </div>
          <div className="song__center d-flex align-self-center"></div>
        </div>

        <div className="song__left d-flex">
          <div className={`${styles.song__time} align-self-center text-muted`}>
            {Math.floor(item?.media?.[0]?.duration / 60) +
              ":" +
              zeroPad(Math.floor(item?.media?.[0]?.duration % 60), 2)}
          </div>

          {/* <div className="deleteSongBtn d-flex align-self-center ">
            <Tooltip placement="right" title="Delete ">
              <IconButton aria-label="delete" color="inherit">
                <Delete fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SongOnLeft;
