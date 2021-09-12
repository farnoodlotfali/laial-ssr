import spinerrStyles from "../styles/LoadingIcon.module.css";
import styles from "../styles/AllPerson.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext, useEffect, useState } from "react";
import LoadingIcon from "../components/spinner/LoadIcon";
import PersonItem from "../components/PersonItem";
import authContext from "../contexts/auth/authContext";
import axios from "../axios/axios";
import Head from "next/head";

const AllPerson = ({ data }) => {
  // console.log(data);
  const { user, loadUser } = useContext(authContext);

  const [next, setNext] = useState({
    list: data.results,
    next: data.next,
    hasMore: data.next ? true : false,
    page: 2,
    loading: false,
  });

  const infiniteList = async () => {
    setNext({
      ...next,
      loading: true,
    });
    setTimeout(async () => {
      try {
        const res = await axios.simpleApi.get(
          `/persons/${params.slug}/?page=${next.page}`
        );
        // console.log(res.data);

        setNext({
          next: res.data.next,
          hasMore: res.data.next ? true : false,
          list: next.list.concat(res.data.results),
          page: ++next.page,
          loading: false,
          loaderMsg: res.data.next ? "Loading..." : "Finish :)",
        });
        // console.log(next.page);
      } catch (error) {
        console.log(error);
      }
    }, 1200);
  };

  return (
    <div className={styles.allPerson}>
      <Head>{!playing && <title> اشخاص</title>}</Head>

      {next?.list && (
        <InfiniteScroll
          dataLength={next?.list?.length}
          next={() => infiniteList()}
          className={styles.infiniteScroll}
          hasMore={next.hasMore}
        >
          {next.list &&
            next.list?.map((item, i) => {
              return (
                <PersonItem
                  id={item.id}
                  key={item.id}
                  name={item.name}
                  image={item.image}
                  slug={item.slug}
                />
              );
            })}
        </InfiniteScroll>
      )}
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
  );
};
export const getServerSideProps = async ({ params }) => {
  // const res = await fetch(`https://nejat.safine.co/api/persons/`);
  // const resData = await res.json();
  // console.log(resData);

  //   if (!resData.data) {
  //     return {
  //       notFound: true,
  //     };
  //   }
  let resData;
  try {
    resData = await axios.instanceApi.get(`/persons/`);
  } catch (error) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      data: resData.data,
    },
  };
};

export default AllPerson;
