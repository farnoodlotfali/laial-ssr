import styles from "../../styles/Person.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext, useEffect, useState } from "react";
import LoadingIcon from "../../components/spinner/LoadIcon";
import RowItem from "../../components/relatedToRowItem/RowItem";
import spinerrStyles from "../../styles/LoadingIcon.module.css";
import { useRouter } from "next/router";
import authContext from "../../contexts/auth/authContext";
import axios from "../../axios/axios";

const Person = ({ data }) => {
  //   console.log(data);
  const router = useRouter();
  const id = router.query.id;
  const { user, loadUser } = useContext(authContext);

  useEffect(() => {
    // loadUser();
  }, [user]);
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
        const resData = await axios.instanceApi.get(
          `/persons/${id}/?page=${next.page}`
        );

        setNext({
          next: resData.data.next,
          hasMore: resData.data.next ? true : false,
          list: next.list.concat(resData.data.results),
          loading: false,
          page: ++next.page,
          loaderMsg: resData.data.next ? "Loading..." : "Finish :)",
        });
        //  next.list.concat(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }, 1200);
  };
  return (
    <div className={`${styles.person} person`}>
      <div className="person__infoAndImg py-4 d-flex justify-content-center align-items-center">
        <div className={`${styles.card__person}`}>
          <div className={`${styles.circle__person}`}>
            <div className={`${styles.content__person} text-center`}>
              <h2>Franood lotfali</h2>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Repellendus voluptatum dolorebus animi explicabo ullam est
                expedita dolore? Praesentium excepturi delectus illo culpa.
              </p>
            </div>
            <img
              src={
                data.results[0]?.media?.[0]?.image !== null
                  ? data.results[0]?.media?.[0]?.image
                  : data.results[0]?.person?.[0]?.image.full_image_url !== null
                  ? data.results[0]?.person?.[0]?.image.full_image_url
                  : "/defualtPhoto.jpeg"
              }
              alt="image"
            />
          </div>
        </div>
      </div>
      <div className="person__infiniteScroll__section">
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
                  <RowItem
                    key={item.id}
                    logo={item.image}
                    media={item.media[0]}
                    person={item.person}
                    slug={item.slug}
                  />
                );
              })}
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
  );
};

export default Person;

export const getServerSideProps = async ({ params }) => {
  // console.log(params);
  // const res = await fetch(`https://nejat.safine.co/api/persons/${params.id}`);
  // const resData = await res.json();
  // // console.log(resData);

  // if (!resData.results) {
  //   return {
  //     notFound: true,
  //   };
  // }

  let resData;
  try {
    resData = await axios.instanceApi.get(`/persons/${params.id}`);
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
