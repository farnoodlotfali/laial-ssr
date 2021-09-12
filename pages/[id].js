import axios from "../axios/axios";
import Head from "next/head";
import Banner from "../components/Banner";
import styles from "../styles/Home.module.css";
import Rowlist from "../components/relatedToRowItem/Rowlist";
import TileBanner from "../components/TileBanner";
import Spinner from "../components/spinner/Spinner";
import { useContext, useEffect } from "react";
import authContext from "../contexts/auth/authContext";
import playerContext from "../contexts/player/playerContext";
// import styles from '../styles/Home.module.css';

export default function Home({ data }) {
  const { user, loadUser } = useContext(authContext);
  const { playing } = useContext(playerContext);
  useEffect(() => {
    // loadUser();
  }, [user]);
  // console.log(data[0]?.description);
  return (
    <div className={styles.home}>
      <Head>
        {!playing && (
          <title> سفینه - بزرگترین مرجع نواهای مذهبی - ویژه محرم ۱۴۰۰</title>
        )}
      </Head>
      {data[0]?.description && (
        <div
          className="text-white mx-4"
          dangerouslySetInnerHTML={{ __html: `${data[0]?.description}` }}
        />
      )}
      {data ? (
        data.map((item, i) =>
          item.banner !== null ? (
            item.banner.banner_type === "big" ? (
              <Banner key={i} imgs={item.banner.images} />
            ) : (
              <TileBanner key={i} imgs={item.banner.images} />
            )
          ) : (
            <Rowlist
              key={i}
              slug={item.slug}
              id={item.id}
              title={item.name}
              data={item.data}
            />
          )
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
}

export const getServerSideProps = async ({ params }) => {
  // const req = await axios.instanceApi.get(`/page/home/`);

  // const req = await fetch(`https://nejat.safine.co/api/page/${params?.id}/`);
  // const data = await req.json();
  // if (!data.data[0]) {
  //   return {
  //     notFound: true,
  //   };
  // }

  let data;

  try {
    data = await axios.instanceApi.get(`/page/${params?.id}/`);
    if (!data.data[0]) {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    return {
      notFound: true,
    };
  }
  return {
    props: { data: data.data.data[0].block },
  };
};
