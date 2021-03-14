import { useContext } from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import { Delete } from '@material-ui/icons';
import styles from '../styles/SongOnLeft.module.css';
import appContext from '../contexts/app/appContext';
import playerContext from '../contexts/player/playerContext';

const SongOnLeft = ({ item, playlist, number, zeroPad }) => {
  const {
    playing,
    setUrl,
    playList,
    playMusic,
    setIds,

    songId,
  } = useContext(playerContext);
  const { ChangeShowMusic, showMusic } = useContext(appContext);

  const paly = async () => {
    setIds(
      item.media[0]?.telegram_id,
      item.media[0]?.id,
      item.media[0]?.duration,
      item.media[0]?.name,
      item.person?.[0]?.name,
      item?.media?.[0]?.image !== null
        ? item?.media?.[0]?.image
        : item?.person?.[0]?.image.full_image_url
    );

    fetch(`http://downloader.7negare.ir/download/${item.media[0]?.telegram_id}`)
      .then((respone) => respone.json())
      .then((res) => setUrl(res.download_link, playList))
      .then(() => playMusic())
      .then(() => ChangeShowMusic(true))
      .catch((err) => console.log(err));
    // try {
    //   const res = await axios.downloader.get(`/${item.media[0]?.telegram_id}`);
    //   setUrl(res.data.download_link, playList);

    //   if (!showMusic) {
    //     ChangeShowMusic();
    //   }
    //   playMusic();
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <div className='songOnLeft'>
      <div className={`${styles.song} d-flex my-5 justify-content-between`}>
        <div className='song__right d-flex'>
          <div className={`${styles.number} align-self-center`}>{number}</div>
          <div className={styles.song__image} onClick={() => paly()}>
            <img
              src={
                item?.media?.[0]?.image !== null
                  ? item?.media?.[0]?.image
                  : item?.person?.[0]?.image.full_image_url !== null
                  ? item?.person?.[0]?.image.full_image_url
                  : '/defualtPhoto.jpeg'
              }
              alt=''
            />
            {item.media[0]?.id === songId ? (
              <div className={styles.overlay}>
                <div className={`now  ${styles.playing}`} id='music'>
                  <span className={`${styles.bar}   ${styles.n1}`}>A</span>
                  <span className={`${styles.bar}   ${styles.n2}`}>B</span>
                  <span className={`${styles.bar}   ${styles.n3}`}>G</span>
                  <span className={`${styles.bar}   ${styles.n4}`}>H</span>
                </div>
              </div>
            ) : (
              ''
            )}
          </div>

          <div className={`${styles.song__info} mr-3 align-self-center `}>
            <div className={styles.song__title}>{item.media[0].name}</div>
            <div className={styles.song__person}>{item.person[0].name}</div>
          </div>
          <div className='song__center d-flex align-self-center'></div>
        </div>
        <div className='song__left d-flex'>
          <div className={`${styles.song__time} align-self-center text-muted`}>
            {Math.floor(item.media[0].duration / 60) +
              ':' +
              zeroPad(Math.floor(item.media[0].duration % 60), 2)}
          </div>

          <div className='deleteSongBtn d-flex align-self-center '>
            <Tooltip placement='right' title='Delete '>
              <IconButton aria-label='delete' color='inherit'>
                <Delete fontSize='inherit' />
              </IconButton>
            </Tooltip>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SongOnLeft;
