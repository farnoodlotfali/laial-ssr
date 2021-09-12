import styles from "../../styles/Person.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import { useContext, useEffect, useState } from "react";
import LoadingIcon from "../../components/spinner/LoadIcon";
import RowItem from "../../components/relatedToRowItem/RowItem";
import spinerrStyles from "../../styles/LoadingIcon.module.css";
import { useRouter } from "next/router";
import authContext from "../../contexts/auth/authContext";
import axios from "../../axios/axios";
import playerContext from "../../contexts/player/playerContext";
import appContext from "../../contexts/app/appContext";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import { makeStyles } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import Head from "next/head";

const useStyles = makeStyles((theme) => ({
  summaryRoot: {
    width: "100%",
    display: "flex",
    background: "black",
    color: "white",
    borderTopLeftRadius: "10px",
    borderTopRightRadius: "10px",
    borderBottom: "1px solid lightgrey",
  },
  summaryContent: {
    justifyContent: "space-between",
  },
  detailsRoot: {
    background: "black",
    borderBottomLeftRadius: "10px",
    borderBottomRightRadius: "10px",
    color: "white",
    textAlign: "justify",
    direction: "rtl",
    fontSize: "12px",
    lineHeight: "30px",
    "@media (max-width: 768px)": {
      display: "grid",
    },
  },
}));
const Person = ({ data }) => {
  const classes = useStyles();
  const [readMore, setReadMore] = useState(false);

  const { showMusicBarOnMoblieRatio, playing } = useContext(playerContext);
  const { showMusic } = useContext(appContext);
  const router = useRouter();
  const id = router.query.id;
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
    <div
      className={`${
        showMusic
          ? showMusicBarOnMoblieRatio
            ? styles.personPageShowMusicBarOnMoblieRatio
            : styles.personPageShowMusic
          : ""
      }  ${styles.person}`}
    >
      <Head>
        {!playing && <title> {next.list?.[0]?.person?.[0]?.name}</title>}
      </Head>
      <div className=" m-5 ">
        <Accordion onChange={(e, expanded) => setReadMore(expanded)}>
          <AccordionSummary
            classes={{
              root: classes.summaryRoot,
              content: classes.summaryContent,
            }}
          >
            {readMore ? (
              <div className="">
                <span className={styles.person_expand}>بستن </span>
                <ExpandLess fontSize="small" />
              </div>
            ) : (
              <div className="">
                <span className={styles.person_expand}>نمایش بیشتر</span>
                <ExpandMore fontSize="small" />
              </div>
            )}

            <span>{next.list?.[0]?.person?.[0]?.name}</span>
          </AccordionSummary>

          <AccordionDetails classes={{ root: classes.detailsRoot }}>
            <div className="d-flex justify-content-center">
              <div className={styles.person_information_img_information}>
                <img
                  src={
                    next.list?.[0]?.media[0]?.image !== null
                      ? next.list?.[0]?.media[0]?.image
                      : next.list?.[0]?.person[0]?.image.full_image_url !== null
                      ? next.list?.[0]?.person[0]?.image.full_image_url
                      : defualtPhoto
                  }
                  alt=""
                />
              </div>
            </div>
            <div>{next.list?.[0]?.person?.[0]?.description}</div>
          </AccordionDetails>
        </Accordion>
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
