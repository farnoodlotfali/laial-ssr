import axios from '../../axios/axios';
import styles from '../../styles/MoreSong.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import RowItem from '../../components/relatedToRowItem/RowItem';
import { useRouter } from 'next/router';
import spinerrStyles from '../../styles/LoadingIcon.module.css';
import LoadingIcon from '../../components/spinner/LoadingIcon';

const MoreSong = ({ data }) => {
  const router = useRouter();
  const id = router.query.id;
  const [next, setNext] = useState({
    list: data.results,
    next: data.next,
    hasMore: data.next ? true : false,
    page: 2,
    loading: false,
  });

  // console.log(next);

  const infiniteList = async () => {
    setNext({
      ...next,
      loading: true,
    });
    setTimeout(async () => {
      try {
        const res = await axios.instanceApi.get(
          `/block/${id}/?page=${next.page}`
        );
        // console.log(res.data.results);
        setNext({
          next: res.data.next,
          hasMore: res.data.next ? true : false,
          list: next.list.concat(res.data.results),
          loading: false,
          page: ++next.page,
          loaderMsg: res.data.next ? 'Loading...' : 'Finish :)',
        });
        //  next.list.concat(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }, 1200);
  };

  return (
    <div className={`${styles.moreSong}  pb-3 pt-5`}>
      <div className='moreSong__title text-light text-center mb-3'>
        <h3> {data.block.name}</h3>
      </div>
      <div className={` ${styles.moreSong__items} `}>
        <InfiniteScroll
          dataLength={next?.list?.length}
          next={infiniteList}
          hasMore={next.hasMore}
          // loader={<h4>Loading...</h4>}
          // height={400}
          className={styles.infiniteScroll}
          // endMessage={
          //   <p style={{ textAlign: 'center' }}>
          //     <b>Yay! You have seen it all</b>
          //   </p>
          // }
        >
          {next.list.map((item) => (
            <RowItem
              key={item.id}
              logo={item.image}
              media={item.media[0]}
              person={item.person}
              slug={item.slug}
            />
            // </div>
          ))}
        </InfiniteScroll>

        <div
          className={spinerrStyles.loading_message}
          // ref={loadingRef}
          style={{
            opacity: next.loading ? '1' : '0',
            transform: next.loading && 'translate(-50%, 0px)',
          }}
        >
          <LoadingIcon color='#fff' />
          <span>در حال دریافت</span>
        </div>
      </div>
      {/* <hr /> */}
    </div>
  );
};
export async function getServerSideProps({ params }) {
  const req = await axios.instanceApi.get(`/block/${params.id}/`);

  // console.log(params.id);
  return {
    props: { data: req.data },
  };
}
export default MoreSong;
