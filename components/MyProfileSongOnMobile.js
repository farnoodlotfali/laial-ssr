import styles from "../styles/MyProfile.module.css";
import defualtPhoto from "../public/defualtPhoto.jpeg";
import { useContext } from "react";
import appContext from "../contexts/app/appContext";
import { DeleteRounded, Pause, PlayArrowRounded } from "@material-ui/icons";
import playerContext from "../contexts/player/playerContext";

const MyProfileSongOnMobile = ({ item, deleteBtn, playlist }) => {
  const { ChangeShowMusic, showMusic, removeSongFromPlaylist } =
    useContext(appContext);
  const { setUrl, playMusic, setIds, playing, playAndPauseMusic, songId } =
    useContext(playerContext);

  const zeroPad = (num, places) => String(num).padStart(places, "0");
  const truncate = (str, no_words) => {
    return str?.split(" ").splice(0, no_words).join(" ");
  };

  const paly = async () => {
    if (item?.post.media[0]?.id === songId) {
      playAndPauseMusic();
    } else {
      setIds(
        item?.post.media[0]?.telegram_id,
        item?.post.media[0]?.id,
        item?.post.media[0]?.duration,
        item?.post?.title ? item?.post?.title : item?.post.media[0]?.name,
        item?.post.person?.[0]?.name,
        item?.post?.image?.full_image_url
          ? item?.post?.image?.full_image_url
          : item?.post?.media?.[0]?.image !== null
          ? item?.post?.media?.[0]?.image
          : item?.post?.person?.[0]?.image.full_image_url,
        item?.post.id,
        item?.post?.slug,
        item?.post?.meta_title ? item?.post?.meta_title : item?.post?.title,
        item?.post?.meta_description
          ? item?.post?.meta_description
          : item?.post?.description
      );
      if (item?.post.media[0]?.path) {
        // console.log("path");
        setUrl(item?.post.media[0]?.path, playlist);
        playMusic();
        if (!showMusic) {
          ChangeShowMusic(true);
        }
      } else {
        try {
          const res = await axios.downloader.get(
            `/${item?.post.media[0]?.telegram_id}`
          );
          setUrl(res.data.download_link, playlist);

          if (!showMusic) {
            ChangeShowMusic();
          }
          playMusic();
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  return (
    <div
      className={` ${styles.song}  d-flex`}
      //   onClick={() => {
      //     console.log(333, item);
      //   }}
    >
      <div className={styles.songImg}>
        <img
          src={
            item?.post?.media?.[0]?.image !== null &&
            item?.post?.media?.[0]?.image !== undefined
              ? item?.post?.media?.[0]?.image
              : item?.post?.person?.[0]?.image.full_image_url !== null
              ? item?.post?.person?.[0]?.image.full_image_url
              : defualtPhoto
          }
          alt=""
        />
        {playing && item?.post.media[0]?.id === songId ? (
          <div
            className={styles.myProfileSong_playbtn}
            onClick={() => {
              playAndPauseMusic();
            }}
          >
            <Pause />
          </div>
        ) : (
          <div
            className={styles.myProfileSong_playbtn}
            onClick={() => {
              paly();
            }}
          >
            <PlayArrowRounded />
          </div>
        )}
      </div>
      <div className={styles.songInfo}>
        <span className={styles.songName}>
          {truncate(
            item?.post?.title
              ? item?.post?.title
              : item?.post?.media?.[0]?.name,
            4
          )}
        </span>
        <span className={styles.songSinger}>
          {item?.post?.person?.[0]?.name}
        </span>
      </div>
      <div className={styles.songTime}>
        <span>
          {item?.post?.media?.[0]?.duration &&
            Math.floor(item?.post?.media?.[0]?.duration / 60) +
              ":" +
              zeroPad(Math.floor(item?.post?.media?.[0]?.duration % 60), 2)}
        </span>
        {deleteBtn && (
          <div
            className={styles.listItemsShow__delete}
            onClick={() =>
              removeSongFromPlaylist(
                item?.post?.PostIdForDeleteFromUserPlaylist
              )
            }
          >
            <DeleteRounded />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfileSongOnMobile;
