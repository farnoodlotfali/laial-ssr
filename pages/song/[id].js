import styles from '../../styles/songPage.module.css';
import axios from '../../axios/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IconButton, Tooltip } from '@material-ui/core';
import {
  Favorite,
  GetAppRounded,
  PlayArrowRounded,
  PlaylistAdd,
  Visibility,
} from '@material-ui/icons';
import RowItem from '../../components/relatedToRowItem/RowItem';
import Flickity from 'react-flickity-component';

const songPage = ({ data, recommender, view }) => {
  //   console.log(data);
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  // console.log(view);
  return (
    <div className={`${styles.songPage} py-4  `}>
      <div className={`${styles.musicInfo}  d-flex justify-content-around`}>
        <div className={`${styles.musicInfo__right}`}>
          <img
            className={styles.musicInfo__image}
            src={
              data?.media?.[0]?.image !== null
                ? data?.media?.[0]?.image
                : data?.person?.[0]?.image.full_image_url !== null
                ? data?.person?.[0]?.image.full_image_url
                : '/defualtPhoto'
            }
            alt='logo'
          />
        </div>
        <div
          className={`${styles.musicInfo__left} text-light   justify-content-start align-items-center`}
        >
          <div className={`${styles.musicInfo__name} mt-5 mb-3 d-flex`}>
            نام آهنگ : {data?.media?.[0]?.name}
          </div>
          <div className={`${styles.musicInfo__singer} mb-3 d-flex`}>
            خواننده : {data?.person?.[0]?.name}
          </div>
          <div className='musicInfo__mode mb-3 d-flex'>سبک : شور</div>
          <hr />
          <div className={`${styles.actions} d-flex justify-content-around`}>
            <div
            //   onClick={playMusicAndShowMusicBar}
            >
              <Tooltip placement='bottom' title='پخش آهنگ'>
                <IconButton aria-label='play'>
                  <PlayArrowRounded
                    style={{ fontSize: '40px' }}
                    className={`${styles.icon} `}
                  />
                </IconButton>
              </Tooltip>
            </div>

            <div className={`${styles.favoritePart} text-center`}>
              <IconButton
                aria-label='Favorite'
                // onClick={() => (isAuth ? likeSong(params.slug) : setShow(true))}
              >
                <Favorite className={`${styles.favorite}`} fontSize='large' />
              </IconButton>
              {data.likes}
            </div>

            <div>
              <a
              //   href={downloadUrl}
              >
                <Tooltip placement='bottom' title='دانلود'>
                  <IconButton aria-label='download'>
                    <GetAppRounded
                      className={`${styles.download}`}
                      fontSize='large'
                    />
                  </IconButton>
                </Tooltip>
              </a>
            </div>

            <div
            //   onClick={() =>
            //     setWhichSongToSaveInPlaylist(dataSongPage?.media?.[0]?.id)
            //   }
            >
              <Tooltip placement='bottom' title='اضافه به لیست'>
                <IconButton aria-label='Add'>
                  <PlaylistAdd className={`${styles.add}`} fontSize='large' />
                </IconButton>
              </Tooltip>
            </div>
            <div className={`${styles.viewPart} text-center`}>
              <IconButton aria-label='View'>
                <Visibility className={`${styles.view}`} fontSize='large' />
              </IconButton>
              {view}
            </div>
          </div>
        </div>
      </div>

      <div className='rowList  mt-5  pt-5 '>
        <h3 className='text-light text-right pb-3 mr-4'>
          <span>پیشنهاداتی برای شما</span>
        </h3>
        <Flickity className='carousel  px-2 py-0' options={flickityOptions}>
          {recommender &&
            recommender.map((item, i) => {
              return (
                <RowItem
                  key={item.id}
                  logo={item.image}
                  media={item.media[0]}
                  person={item.person}
                  slug={item.slug}
                />
              );
            })}
        </Flickity>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  // const req = await axios.instanceApi.get(`/post/${params.id}s/`);

  const res = await fetch(`http://laial.7negare.ir/api/post/${params.id}/`);
  const resData = await res.json();
  const view = await fetch(
    `http://laial.7negare.ir/api/post/${params.id}/?state=views`
  );
  const viewData = await view.json();
  const recommender = await fetch(`http://laial.7negare.ir/api/recommender/`);
  const recommenderData = await recommender.json();
  // console.log(resData.data);

  if (!resData.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      data: resData.data,
      recommender: recommenderData.data,
      view: viewData.data.views,
    },
  };
};
export default songPage;
