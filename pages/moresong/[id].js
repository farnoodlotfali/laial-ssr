import axios from "../../axios/axios";
import styles from "../../styles/MoreSong.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext, useEffect, useState } from "react";
import RowItem from "../../components/relatedToRowItem/RowItem";
import { useRouter } from "next/router";
import spinerrStyles from "../../styles/LoadingIcon.module.css";
import LoadingIcon from "../../components/spinner/LoadIcon";
import authContext from "../../contexts/auth/authContext";
import Head from "next/head";
import playerContext from "../../contexts/player/playerContext";

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
  const { user, loadUser } = useContext(authContext);
  const { playing } = useContext(playerContext);

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
          loaderMsg: res.data.next ? "Loading..." : "Finish :)",
        });
        //  next.list.concat(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }, 1200);
  };

  return (
    <div className={`${styles.moreSong} pt-5`}>
      <Head>{!playing && <title> {data?.block?.name}</title>}</Head>
      <div className="moreSong__title text-light text-center mb-3">
        <h3> {data?.block?.name}</h3>
      </div>
      <div className={` ${styles.moreSong__items} mt-5`}>
        <div className={styles.moreSong__infiniteScroll__section}>
          {next?.list && (
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
              {next?.list.map((item) => (
                <RowItem
                  key={item.id}
                  postId={item.id}
                  isRow={true}
                  logo={item.image}
                  media={item.media[0]}
                  person={item.person}
                  slug={item.slug}
                  meta_description={item.meta_description}
                  meta_title={item.meta_title}
                  description={item.description}
                  title={item.title}
                />
                // </div>
              ))}
            </InfiniteScroll>
          )}
        </div>

        <div
          className={spinerrStyles.loading_message}
          // ref={loadingRef}
          style={{
            opacity: next.loading ? "1" : "0",
            transform: next.loading && "translate(-50%, 0px)",
            border: "2px solid white",
          }}
        >
          <LoadingIcon color="#fff" />
          <span>در حال دریافت</span>
        </div>
      </div>
      {/* <hr /> */}
    </div>
  );
};
export async function getServerSideProps({ params }) {
  // const req = await axios.instanceApi.get(`/block/${params.id}/`);
  // const req = await fetch(`https://nejat.safine.co/api/block/${params.id}/`);
  // const resData = await req.json();
  // console.log(resData.results);
  // if (!resData.results) {
  //   return {
  //     notFound: true,
  //   };
  // }
  let resData;
  try {
    resData = await axios.instanceApi.get(`/block/${params.id}/`);
  } catch (error) {
    return {
      notFound: true,
    };
  }
  // console.log(params.id);
  return {
    props: { data: resData.data },
  };
}
export default MoreSong;
