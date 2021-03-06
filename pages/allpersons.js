import spinerrStyles from '../styles/LoadingIcon.module.css';
import styles from '../styles/AllPerson.module.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useState } from 'react';
import LoadingIcon from '../components/spinner/LoadingIcon';
import PersonItem from '../components/PersonItem';

const AllPerson = ({ data }) => {
  // console.log(data);

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
        const res = await fetch(
          `http://laial.7negare.ir/api/persons/?page=${next.page}`
        );
        const resData = await res.json();
        // console.log(resData);
        // console.log(resData.data.results);
        setNext({
          next: resData.next,
          hasMore: resData.next ? true : false,
          list: next.list.concat(resData.results),
          loading: false,
          page: ++next.page,
          loaderMsg: resData.next ? 'Loading...' : 'Finish :)',
        });
        //  next.list.concat(res.data.results);
      } catch (error) {
        console.log(error);
      }
    }, 1200);
  };

  return (
    <div className={styles.allPerson}>
      {' '}
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
          opacity: next.loading ? '1' : '0',
          transform: next.loading && 'translate(-50%, 0px)',
        }}
      >
        <LoadingIcon color='#fff' />
        <span>???? ?????? ????????????</span>
      </div>
    </div>
  );
};
export const getServerSideProps = async ({ params }) => {
  const res = await fetch(`http://laial.7negare.ir/api/persons/`);
  const resData = await res.json();
  console.log(resData);

  //   if (!resData.data) {
  //     return {
  //       notFound: true,
  //     };
  //   }

  return {
    props: {
      data: resData,
    },
  };
};

export default AllPerson;
