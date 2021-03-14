import { Pause, PlayArrowRounded } from '@material-ui/icons';
import Link from 'next/link';
import { useContext } from 'react';
import appContext from '../../contexts/app/appContext';
import playerContext from '../../contexts/player/playerContext';
import styles from '../../styles/RowItem.module.css';
import SpinnerLoadingOnRowitem from '../spinner/SpinnerLoadingOnRowitem';
import AbortController from 'abort-controller';
const controller = new AbortController();
const RowItem = ({ media, person, slug, context }) => {
  const {
    playMusic,
    playing,
    songId,
    loading,
    setUrl,
    setIds,
    playAndPauseMusic,
  } = useContext(playerContext);
  const { ChangeShowMusic, ChangeshowCenter, showMusic } = useContext(
    appContext
  );
  const truncate = (str, no_words) => {
    return str?.split(' ').splice(0, no_words).join(' ');
  };
  const playMusicAndShowMusicBar = async () => {
    // نشان دادن موزیک و پخش موزیک
    const signal = controller.signal;
    // controller.abort();

    if (media?.id === songId) {
      playAndPauseMusic();
    } else {
      setIds(
        media?.telegram_id,
        media?.id,
        media?.duration,
        media?.name,
        person?.[0]?.name,
        media?.image !== null ? media?.image : person?.[0]?.image.full_image_url
      );

      fetch(`http://downloader.7negare.ir/download/${media?.telegram_id}`, {
        method: 'get',
        signal: signal,
      })
        .then((respone) => respone.json())
        .then((res) => setUrl(res.download_link, context))
        .then(() => playMusic())
        .then(() => ChangeShowMusic(true))
        .catch((err) => console.log(err));
      // if (cancel !== undefined) {
      //   cancel();
      // }
      // console.log(media?.name, person?.[0]?.name);
      // try {
      //   const res = await axios.downloader.get(`/${media?.telegram_id}`, {
      //     cancelToken: new CancelToken(function executor(c) {
      //       cancel = c;
      //     }),
      //   });
      //   setUrl(res.data.download_link, context);
      //   if (!showMusic) {
      //     ChangeShowMusic();
      //   }
      //   playMusic();
      // } catch (error) {
      //   console.log(error);
      // }
    }
  };
  return (
    <div className={styles.rowItem}>
      {/* <div className={styles.liner1}></div>
      <div className={styles.liner2}></div>
      <div className={styles.liner3}></div>
      <div className={styles.liner4}></div> */}

      <div className={`${styles.rowItem__image}`}>
        <img
          className={`${styles.rowItem__image__img}`}
          src={person?.[0]?.image.full_image_url}
          alt='logo'
        />

        {/* mobile ratio  */}
        {/* {loading && media?.id === songId ? (
          <div className='rowItem__playing'>
            <SpinnerLoadingOnRowitem />
          </div>
        ) : playing && media?.id === songId ? (
          <div className=' moblie_play' onClick={() => playAndPauseMusic()}>
            <Pause style={{ fontSize: '100px' }} />
          </div>
        ) : (
          <div className=' moblie_play' onClick={playMusicAndShowMusicBar}>
            <PlayArrowRounded style={{ fontSize: '100px' }} />
          </div>
        )} */}

        {loading && media?.id === songId ? (
          <div className=''>
            <SpinnerLoadingOnRowitem />
          </div>
        ) : playing && media?.id === songId ? (
          <div
            className={styles.play__music}
            onClick={() => playAndPauseMusic()}
          >
            <Pause />
          </div>
        ) : (
          <div
            className={styles.play__music}
            onClick={playMusicAndShowMusicBar}
          >
            <PlayArrowRounded />
          </div>
        )}
      </div>
      <div className='rowItem__info '>
        <Link href={`/song/${slug}`}>
          <h4 className={`${styles.rowItem__title} text-center`}>
            {truncate(media?.name, 4)}
            {/* {media?.name} */}
          </h4>
        </Link>
        <Link href={`/person/${person?.[0]?.slug}`}>
          <h4 className={`${styles.rowItem__person} text-center`}>
            {/* حاج محمد شریفی */}
            {person?.[0]?.name}
          </h4>
        </Link>{' '}
      </div>
    </div>
  );
};

export default RowItem;
