import { Pause, PlayArrowRounded } from "@material-ui/icons";
import Link from "next/link";
import { useContext } from "react";
import appContext from "../../contexts/app/appContext";
import playerContext from "../../contexts/player/playerContext";
import styles from "../../styles/RowItem.module.css";
import AbortController from "abort-controller";
import defualtPhoto from "../../assets/defualtPhoto.jpeg";
import PlaySvg from "../svgs/PlaySvg";
import SpinnerLoading from "../spinner/SpinnerLoading";

const controller = new AbortController();

const RowItem = ({
  media,
  person,
  slug,
  context,
  isRow,
  postId,
  meta_description,
  meta_title,
  description,
  title,
  logo,
}) => {
  const {
    playMusic,
    playing,
    songId,
    loading,
    setUrl,
    setIds,
    playAndPauseMusic,
  } = useContext(playerContext);
  const { ChangeShowMusic, ChangeshowCenter, showMusic } =
    useContext(appContext);
  const truncate = (str, no_words) => {
    return str?.split(" ").splice(0, no_words).join(" ");
  };
  const playMusicAndShowMusicBar = async () => {
    // نشان دادن موزیک و پخش موزیک
    const signal = controller.signal;

    if (media?.id === songId) {
      playAndPauseMusic();
    } else {
      if (!showMusic) {
        ChangeShowMusic(true);
      }
      setIds(
        media?.telegram_id,
        media?.id,
        media?.duration,
        media?.name,
        person?.[0]?.name,
        media?.image !== null ? media?.image : person?.[0]?.image.full_image_url
      );

      if (media.path) {
        // console.log(postId);

        setUrl(media.path, context);
        playMusic();
      } else {
        fetch(`https://downloader.safine.co/${media?.telegram_id}`, {
          method: "get",
          signal: signal,
        })
          .then((respone) => respone.json())
          .then((res) => setUrl(res.download_link, context))
          .then(() => playMusic())

          .catch((err) => console.log(err));
      }
    }
  };
  console.log(postId);
  return (
    <div className={styles.rowItem}>
      <div className={`${styles.rowItem__image}`}>
        {postId === 854 && (
          <>
            <div className={styles.liner1}></div>
            <div className={styles.liner2}></div>
            <div className={styles.liner3}></div>
            <div className={styles.liner4}></div>
          </>
        )}
        <img
          className={`${styles.rowItem__image__img}`}
          src={
            logo?.full_image_url
              ? logo?.full_image_url
              : media?.[0]?.image !== null && media?.[0]?.image !== undefined
              ? media?.[0]?.image
              : person?.[0]?.image?.full_image_url !== null
              ? person?.[0]?.image?.full_image_url
              : defualtPhoto
          }
          alt="logo"
        />

        {loading && media?.id === songId ? (
          <div className="">
            <SpinnerLoading />
            <div className="text-light">در حال آماده سازی</div>
          </div>
        ) : playing && media?.id === songId ? (
          <div
            className={styles.play__music}
            onClick={() => playAndPauseMusic()}
          >
            <Pause />
          </div>
        ) : (
          <div className={styles.play__music}>
            <PlaySvg playMusicAndShowMusicBar={playMusicAndShowMusicBar} />
          </div>
        )}
      </div>
      <div className="rowItem__info ">
        <Link href={`/song/${slug}`}>
          <h4 className={`${styles.rowItem__title} text-center`}>
            <div className={styles.steady__rowItem__title}>
              {truncate(title ? title : media?.name, 4)}
            </div>
            {/* {media?.name} */}
          </h4>
        </Link>
        <Link href={`/person/${person?.[0]?.slug}`}>
          <h4 className={`${styles.rowItem__person} text-center`}>
            {/* حاج محمد شریفی */}
            {person?.[0]?.name}
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default RowItem;
