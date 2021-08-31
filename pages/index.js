import axios from "../axios/axios";
import Head from "next/head";
import Banner from "../components/Banner";
import styles from "../styles/Home.module.css";
import Rowlist from "../components/relatedToRowItem/Rowlist";
import TileBanner from "../components/TileBanner";
import Spinner from "../components/spinner/Spinner";
import { useContext, useEffect } from "react";
import authContext from "../contexts/auth/authContext";
// import styles from '../styles/Home.module.css';
import fetch from "isomorphic-unfetch";

export default function Home({ data }) {
  const { user, loadUser } = useContext(authContext);
  useEffect(() => {
    loadUser();
  }, [user]);
  return (
    <div className={styles.home}>
      <Head>
        <title>Laial App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
  const req = await fetch(`https://nejat.safine.co/api/page/home/`);
  const data = await req.json();

  return {
    props: { data: data.data[0].block },
  };
};
