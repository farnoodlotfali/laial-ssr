import { Pause } from "@material-ui/icons";
import Link from "next/link";
import Image from "next/image";
import { useContext } from "react";
import appContext from "../../contexts/app/appContext";
import playerContext from "../../contexts/player/playerContext";
import styles from "../../styles/RowItem.module.css";
// import AbortController from "abort-controller";
import defualtPhoto from "../../public/defualtPhoto.jpeg";
import PlaySvg from "../svgs/PlaySvg";
import authContext from "../../contexts/auth/authContext";
import SpinnerLoadingOnRowItem from "../spinner/SpinnerLoadingOnRowItem";
import Axios from "axios";
import axios from "../../axios/axios";

// const controller = new AbortController();
const CancelToken = Axios.CancelToken;
let cancel;
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
  const {
    ChangeShowMusic,
    ChangeshowCenter,
    showMusic,
    addMusicToRecentlyViewed,
  } = useContext(appContext);
  const { changeShowLoginModal, checkIfForce, user } = useContext(authContext);
  const playMusicAndShowMusicBar = async () => {
    // نشان دادن موزیک و پخش موزیک
    // const signal = controller.signal;
    if (checkIfForce()) {
      changeShowLoginModal(true);
    } else {
      // user !== null && addMusicToRecentlyViewed(1, postId);
      if (!showMusic) {
        ChangeShowMusic(true);
      }
      if (media?.id === songId) {
        playAndPauseMusic();
      } else {
        setIds(
          media?.telegram_id,
          media?.id,
          media?.duration,
          title ? title : media?.name,
          person?.[0]?.name,
          logo?.full_image_url
            ? logo?.full_image_url
            : media?.image !== null
            ? media?.image
            : person?.[0]?.image.full_image_url,
          postId,
          slug,
          meta_title ? meta_title : title,
          meta_description ? meta_description : description
        );

        if (media.path) {
          // console.log(postId);

          setUrl(media.path, context);
          playMusic();
        } else {
          try {
            const res = await axios.downloader.get(`/${media?.telegram_id}`, {
              cancelToken: new CancelToken(function executor(c) {
                cancel = c;
              }),
            });

            setUrl(res.data.download_link, context);

            playMusic();
          } catch (error) {
            console.log(error);
          }
          // fetch(`https://downloader.safine.co/${media?.telegram_id}`, {
          //   method: "get",
          //   signal: signal,
          // })
          //   .then((respone) => respone.json())
          //   .then((res) => setUrl(res.download_link, context))
          //   .then(() => playMusic())

          //   .catch((err) => console.log(err));
        }
      }
    }
  };
  const truncate = (str, no_words) => {
    return str?.split(" ").splice(0, no_words).join(" ");
  };

  const shimmer = (w, h) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stop-color="#333" offset="20%" />
        <stop stop-color="#222" offset="50%" />
        <stop stop-color="#333" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#333" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
  </svg>`;

  const toBase64 = (str) =>
    typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  const myloader = ({ src }) => {
    return src;
  };
  return (
    <div className={styles.rowItem}>
      <div className={`${styles.rowItem__image}`}>
        {songId === media?.id && (
          <>
            <div className={styles.liner1}></div>
            <div className={styles.liner2}></div>
            <div className={styles.liner3}></div>
            <div className={styles.liner4}></div>
          </>
        )}
        <div className={styles.rowItemImgSection}>
          <Image
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
            unoptimized
            // alt="logo"
            loading="lazy"
            loader={myloader}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(700, 475)
            )}`}
            layout="fill"
          />
        </div>

        {loading && media?.id === songId ? (
          <div className={styles.rowItemSpinnerLoading}>
            <SpinnerLoadingOnRowItem
              styleSpinnerLoadingOnRowItem={styles.spinnerLoadingOnRowItem}
            />
            <div className="text-light text-center">در حال آماده سازی</div>
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
      <div className={styles.rowItem__info}>
        <Link href={`/song/${slug}`}>
          <h4 className={`${styles.rowItem__title} text-center`}>
            <div className={styles.steady__rowItem__title}>
              {truncate(title ? title : media?.name, 4)}
            </div>
            <div className={styles.scroll__rowItem__title}>
              {title ? title : media?.name}
            </div>
          </h4>
        </Link>
        <Link href={`/person/${person?.[0]?.slug}`}>
          <h4 className={`${styles.rowItem__person} text-center`}>
            {person?.[0]?.name}
          </h4>
        </Link>
      </div>
    </div>
  );
};

export default RowItem;
