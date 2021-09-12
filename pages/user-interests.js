import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import axios from "../axios/axios";
import styles from "../styles/UserInterests.module.css";
import authContext from "../contexts/auth/authContext";
import InfiniteScroll from "react-infinite-scroll-component";
import playerContext from "../contexts/player/playerContext";
import Head from "next/head";

const userinterests = () => {
  const router = useRouter();
  const { getTags, tags, tagsUrls, saveChosenTags, isUserChooseTags, user } =
    useContext(authContext);
  const { playing } = useContext(playerContext);
  const [chosenTagsList, setChosenTagsList] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [next, setNext] = useState({
    next: "",
    listResults: null,
    hasMore: false,
    page: 2,
  });
  // console.log(tags);

  useEffect(() => {
    if (isUserChooseTags || user === null) {
      router.push("/");
    }
    if (tags === null) {
      getTags();
    }
    setNext({
      ...next,
      listResults: tags,
      next: tagsUrls.next,
      hasMore: tagsUrls.next ? true : false,
    });
  }, [tags, isUserChooseTags, user]);

  const infiniteList = async () => {
    try {
      const res = await axios.simpleApi.get(`/tags/?page=${next.page}`);
      setNext({
        next: res.data.next,
        hasMore: res.data.next ? true : false,
        listResults: next.listResults.concat(res.data.results),
        page: ++next.page,
      });
      // console.log(next.page);
    } catch (error) {
      console.log(error);
    }
  };
  const handleClick = (id) => {
    if (chosenTagsList?.includes(id)) {
      setChosenTagsList(chosenTagsList.filter((idItem) => idItem !== id));
    } else {
      setChosenTagsList(chosenTagsList.concat(id));
    }
    // console.log(chosenTagsList);
  };

  const sendTags = () => {
    if (chosenTagsList.length === 0) {
      showErrorMsg();
    } else {
      let sendListTags = [];
      chosenTagsList.forEach((item) =>
        sendListTags.push({
          tag: item,
        })
      );
      saveChosenTags(sendListTags);
    }
    // console.log(sendListTags);
  };
  const showErrorMsg = () => {
    setErrorMsg(" لطفا یک یا چند موضوع را انتخاب کنید");
    setTimeout(() => {
      setErrorMsg("");
    }, 7000);
  };

  return (
    <div className={styles.userInterests}>
      <Head>{!playing && <title> علاقه ها</title>}</Head>

      <div className={styles.userInterests__top}>
        <div className={styles.userInterests__info}>
          <span className={styles.userInterests__info__title}>
            لطفا یک یا چند موضوع که به آن‌ها علاقه دارید را انتخاب کنید تا وارد
            سایت شوید
          </span>
          <span className={styles.userInterests__info__desc}>
            به کمک این اطلاعات، پست‌هایی که بیشتر دوست دارید به شما پیشنهاد داده
            می‌شود
          </span>
        </div>
      </div>
      <div className={styles.userInterests__bottom}>
        <div className={styles.userInterests__list}>
          {next?.listResults && (
            <InfiniteScroll
              dataLength={next?.listResults?.length}
              next={() => infiniteList()}
              hasMore={next.hasMore}
              className={styles.userInterestsInfiniteScroll}
            >
              {next.listResults &&
                next.listResults?.map((item, i) => {
                  return (
                    <div
                      onClick={() => handleClick(item.id)}
                      key={item.id}
                      className={`   
                  ${
                    chosenTagsList?.includes(item.id)
                      ? styles.userInterests__option__selected
                      : styles.userInterests__option
                  }
                  `}
                    >
                      <span>{item.name}</span>
                    </div>
                  );
                })}
            </InfiniteScroll>
          )}
        </div>
        <div className={styles.userInterests__errorMsg}>{errorMsg}</div>
        <div className={styles.userInterests__saveChosenTags}>
          <span onClick={sendTags} className={styles.saveChosenTags__btn}>
            ثبت
          </span>
        </div>
      </div>
    </div>
  );
};

export default userinterests;
