import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles/Search.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import spinerrStyles from "../styles/LoadingIcon.module.css";
import LoadingIcon from "../components/spinner/LoadingIcon";
import PersonItem from "../components/PersonItem";
import RowItem from "../components/relatedToRowItem/RowItem";
import authContext from "../contexts/auth/authContext";
import { CloseRounded } from "@material-ui/icons";
import { useRouter } from "next/router";
import axios from "../axios/axios";
const Search = () => {
  const router = useRouter();
  const inputRef = useRef();
  const { user, loadUser } = useContext(authContext);

  const [next, setNext] = useState({
    next: "",
    listResults: null,
    listPersons: null,
    hasMore: false,
    page: 2,
    loaderMsg: "",
    loading: false,
  });
  useEffect(() => {
    // loadUser();
  }, [user]);

  const onchange = (e) => {
    setSearchValue(([e.target.name] = e.target.value));
  };
  const [searchValue, setSearchValue] = useState("");

  const onSubmitHandle = (e) => {
    setNext({
      ...next,
      next: "",
      listResults: null,
      listPersons: null,
      hasMore: false,
      loading: true,
      page: 2,
      loaderMsg: "",
    });
    e.preventDefault();
    setTimeout(async () => {
      try {
        const resData = await axios.instanceApi.get(
          `/search/?q=${searchValue}`
        );

        setNext({
          next: resData.data.next,
          hasMore: resData.data.next ? true : false,
          listResults: resData.data.results,
          listPersons: resData.data.persons,
          page: 2,
          loaderMsg: resData.data.next ? "Loading..." : "Finish :)",
          loading: false,
        });
      } catch (error) {
        console.log(error);
      }
    }, 1200);
  };

  const infiniteList = async () => {
    // console.log(2);
    setNext({
      ...next,
      loading: true,
    });
    setTimeout(async () => {
      try {
        const resData = await axios.instanceApi.get(
          `/search/?page=${next.page}&q=${searchValue}`
        );

        // console.log(res.data);
        // next.listResults.concat(res.data.results);
        setNext({
          next: resData.data.next,
          hasMore: resData.data.next ? true : false,
          listResults: next.listResults.concat(resData.data.results),
          listPersons: next.listPersons,
          page: ++next.page,
          loaderMsg: resData.data.next ? "Loading..." : "Finish :)",
          loading: false,
        });
        // console.log(next.page);
      } catch (error) {
        console.log(error);
      }
    }, 1200);
  };
  useEffect(() => {
    inputRef.current.focus();
  });
  return (
    <div className={styles.search}>
      <div className={`${styles.searchFields__option}  my-3 py-3`}>
        <form onSubmit={(e) => onSubmitHandle(e)}>
          <input
            className="ml-2"
            onChange={onchange}
            name="searchValue"
            type="text"
            value={searchValue}
            placeholder="متن جستجو ...."
            required
            autoFocus={true}
            ref={inputRef}
          />

          <div
            className={styles.searchFields__option__form__goBack}
            onClick={() => router.back()}
          >
            <CloseRounded />
          </div>
        </form>
      </div>
      <div className="listPersons">
        {next?.listPersons && (
          <h2 className="text-white text-center my-5">نتایج براساس افراد</h2>
        )}
        {next?.listPersons && (
          <InfiniteScroll
            dataLength={next?.listPersons?.length}
            next={() => infiniteList()}
            className={styles.infiniteScroll}
            hasMore={next.hasMore}
          >
            {next.listPersons &&
              next.listPersons?.map((item, i) => {
                return (
                  <PersonItem
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    name={item.name}
                    slug={item.slug}
                  />
                );
              })}
          </InfiniteScroll>
        )}
      </div>
      <div className="listResults">
        {next?.listResults && (
          <h2 className="text-white text-center my-5">نتایج براساس آهنگ</h2>
        )}
        {next?.listResults && (
          <InfiniteScroll
            dataLength={next?.listResults?.length}
            next={() => infiniteList()}
            className={styles.infiniteScroll}
            hasMore={next.hasMore}
          >
            {next.listResults &&
              next.listResults?.map((item, i) => {
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

export default Search;
