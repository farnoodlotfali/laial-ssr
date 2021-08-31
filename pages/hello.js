import Flickity from "react-flickity-component";
import RowItem from "../components/relatedToRowItem/RowItem";
import styles from "../styles/Hello.module.css";
// require('flickity-fade');

const hello = ({ slug, id, title, data = data2 }) => {
  const flickityOptions = {
    // initialIndex: 2,
    contain: true,
    prevNextButtons: false,
    pageDots: false,
    rightToLeft: true,
  };
  const { context, pageinate } = data;
  console.log(context);
  return (
    <div className={styles.rowList}>
      <Flickity
        className={`${styles.carousel} col px-2 py-0`}
        options={flickityOptions}
      >
        {context.map((item, i) => {
          // console.log(item);
          return (
            <RowItem
              key={item.id}
              logo={item.image}
              media={item.media[0]}
              person={item.person}
              slug={item.slug}
              context={context}
            />
          );
        })}
      </Flickity>
    </div>
  );
};

export default hello;
export async function getServerSideProps({ params }) {
  const req = await fetch(`https://nejat.safine.co/api/page/home/`);
  // const req = await fetch(`https://nejat.safine.co/api/persons/pooyanfar`);
  const data = await req.json();

  return {
    props: { car: data },
  };
}
const data2 = {
  count: 24,
  context: [
    {
      id: 1,
      title: "شور - دو دستش | گروه تخصصی صدابرداری نیستان",
      desciption: null,
      meta_title: null,
      meta_description: null,
      slug: "89674",
      likes: 9,
      downloads: 0,
      views: 87,
      category: null,
      status: "publish",
      person: [
        {
          id: 1,
          image: {
            src: "/media/images/mh-poyanfar2_BiIElH1.jpg",
            full_image_url:
              "http://laial.7negare.ir/media/images/mh-poyanfar2_BiIElH1.jpg",
            url: null,
            text: "محمدحسین پویانفر",
          },
          name: "محمدحسین پویانفر",
          slug: "pooyanfar",
          desciption:
            "پویانفر مرد خوبی است من اون رو دوست دارم  و شما هم اون رو دوست داشته باشید. \r\nو\r\nهمین دیگه",
          meta_title: "محمدحسین پویانفر",
          meta_description: "جدیدهاش",
          updated_on: "2021-01-07T17:10:33.717289Z",
          created_on: "2021-01-07T17:10:33.717340Z",
        },
        {
          id: 2,
          image: {
            src: "/media/images/haj-mehdi-rasoli.jpeg",
            full_image_url:
              "http://laial.7negare.ir/media/images/haj-mehdi-rasoli.jpeg",
            url: null,
            text: "مهدی رسولی",
          },
          name: "مهدی رسولی",
          slug: "mahdi-rasoli",
          desciption:
            "مهدی رسولی متولد زایشگاه و پسر خوبی است \r\nقدرش رو بدونید",
          meta_title: "مهدی رسولی",
          meta_description: "جدیدترین ها",
          updated_on: "2021-01-07T17:11:36.860975Z",
          created_on: "2021-01-07T17:11:36.861013Z",
        },
      ],
      image: null,
      media: [
        {
          id: 1,
          name: "شور - دو دستش",
          path: null,
          telegram_id: 753,
          extension: "audio/mpeg",
          size: 3645440,
          duration: 90,
          download: 0,
          ftp_status: false,
          type_file: "sound",
          image: null,
          updated_on: "2021-01-07T17:33:45.010770Z",
          created_on: "2021-01-07T17:33:45.010815Z",
        },
      ],
    },
    {
      id: 2,
      title: "شور - شیر عرصه ی مبارزه | گروه تخصصی صدابرداری نیستان",
      desciption: null,
      meta_title: null,
      meta_description: null,
      slug: "68884",
      likes: 9,
      downloads: 0,
      views: 121,
      category: null,
      status: "publish",
      person: [
        {
          id: 1,
          image: {
            src: "/media/images/mh-poyanfar2_BiIElH1.jpg",
            full_image_url:
              "http://laial.7negare.ir/media/images/mh-poyanfar2_BiIElH1.jpg",
            url: null,
            text: "محمدحسین پویانفر",
          },
          name: "محمدحسین پویانفر",
          slug: "pooyanfar",
          desciption:
            "پویانفر مرد خوبی است من اون رو دوست دارم  و شما هم اون رو دوست داشته باشید. \r\nو\r\nهمین دیگه",
          meta_title: "محمدحسین پویانفر",
          meta_description: "جدیدهاش",
          updated_on: "2021-01-07T17:10:33.717289Z",
          created_on: "2021-01-07T17:10:33.717340Z",
        },
        {
          id: 2,
          image: {
            src: "/media/images/haj-mehdi-rasoli.jpeg",
            full_image_url:
              "http://laial.7negare.ir/media/images/haj-mehdi-rasoli.jpeg",
            url: null,
            text: "مهدی رسولی",
          },
          name: "مهدی رسولی",
          slug: "mahdi-rasoli",
          desciption:
            "مهدی رسولی متولد زایشگاه و پسر خوبی است \r\nقدرش رو بدونید",
          meta_title: "مهدی رسولی",
          meta_description: "جدیدترین ها",
          updated_on: "2021-01-07T17:11:36.860975Z",
          created_on: "2021-01-07T17:11:36.861013Z",
        },
      ],
      image: null,
      media: [
        {
          id: 2,
          name: "شور - شیر عرصه ی مبارزه",
          path: null,
          telegram_id: 758,
          extension: "audio/mpeg",
          size: 10131456,
          duration: 252,
          download: 0,
          ftp_status: false,
          type_file: "sound",
          image: null,
          updated_on: "2021-01-07T17:35:58.029351Z",
          created_on: "2021-01-07T17:35:58.029385Z",
        },
      ],
    },
    {
      id: 3,
      title: "شور - نور عالم تابی | گروه تخصصی صدابرداری نیستان",
      desciption: null,
      meta_title: null,
      meta_description: null,
      slug: "81131",
      likes: 2,
      downloads: 0,
      views: 163,
      category: null,
      status: "publish",
      person: [
        {
          id: 1,
          image: {
            src: "/media/images/mh-poyanfar2_BiIElH1.jpg",
            full_image_url:
              "http://laial.7negare.ir/media/images/mh-poyanfar2_BiIElH1.jpg",
            url: null,
            text: "محمدحسین پویانفر",
          },
          name: "محمدحسین پویانفر",
          slug: "pooyanfar",
          desciption:
            "پویانفر مرد خوبی است من اون رو دوست دارم  و شما هم اون رو دوست داشته باشید. \r\nو\r\nهمین دیگه",
          meta_title: "محمدحسین پویانفر",
          meta_description: "جدیدهاش",
          updated_on: "2021-01-07T17:10:33.717289Z",
          created_on: "2021-01-07T17:10:33.717340Z",
        },
        {
          id: 2,
          image: {
            src: "/media/images/haj-mehdi-rasoli.jpeg",
            full_image_url:
              "http://laial.7negare.ir/media/images/haj-mehdi-rasoli.jpeg",
            url: null,
            text: "مهدی رسولی",
          },
          name: "مهدی رسولی",
          slug: "mahdi-rasoli",
          desciption:
            "مهدی رسولی متولد زایشگاه و پسر خوبی است \r\nقدرش رو بدونید",
          meta_title: "مهدی رسولی",
          meta_description: "جدیدترین ها",
          updated_on: "2021-01-07T17:11:36.860975Z",
          created_on: "2021-01-07T17:11:36.861013Z",
        },
      ],
      image: null,
      media: [
        {
          id: 3,
          name: "شور - نور عالم تابی",
          path: null,
          telegram_id: 759,
          extension: "audio/mpeg",
          size: 7391232,
          duration: 183,
          download: 0,
          ftp_status: false,
          type_file: "sound",
          image: null,
          updated_on: "2021-01-07T17:35:58.374545Z",
          created_on: "2021-01-07T17:35:58.374583Z",
        },
      ],
    },
    {
      id: 4,
      title: "شور - زینت مولایی | گروه تخصصی صدابرداری نیستان",
      desciption: null,
      meta_title: null,
      meta_description: null,
      slug: "63247",
      likes: 5,
      downloads: 0,
      views: 75,
      category: null,
      status: "publish",
      person: [
        {
          id: 1,
          image: {
            src: "/media/images/mh-poyanfar2_BiIElH1.jpg",
            full_image_url:
              "http://laial.7negare.ir/media/images/mh-poyanfar2_BiIElH1.jpg",
            url: null,
            text: "محمدحسین پویانفر",
          },
          name: "محمدحسین پویانفر",
          slug: "pooyanfar",
          desciption:
            "پویانفر مرد خوبی است من اون رو دوست دارم  و شما هم اون رو دوست داشته باشید. \r\nو\r\nهمین دیگه",
          meta_title: "محمدحسین پویانفر",
          meta_description: "جدیدهاش",
          updated_on: "2021-01-07T17:10:33.717289Z",
          created_on: "2021-01-07T17:10:33.717340Z",
        },
        {
          id: 2,
          image: {
            src: "/media/images/haj-mehdi-rasoli.jpeg",
            full_image_url:
              "http://laial.7negare.ir/media/images/haj-mehdi-rasoli.jpeg",
            url: null,
            text: "مهدی رسولی",
          },
          name: "مهدی رسولی",
          slug: "mahdi-rasoli",
          desciption:
            "مهدی رسولی متولد زایشگاه و پسر خوبی است \r\nقدرش رو بدونید",
          meta_title: "مهدی رسولی",
          meta_description: "جدیدترین ها",
          updated_on: "2021-01-07T17:11:36.860975Z",
          created_on: "2021-01-07T17:11:36.861013Z",
        },
      ],
      image: null,
      media: [
        {
          id: 4,
          name: "شور - زینت مولایی",
          path: null,
          telegram_id: 760,
          extension: "audio/mpeg",
          size: 12044288,
          duration: 300,
          download: 0,
          ftp_status: false,
          type_file: "sound",
          image: null,
          updated_on: "2021-01-07T17:35:58.666001Z",
          created_on: "2021-01-07T17:35:58.666036Z",
        },
      ],
    },
    {
      id: 5,
      title: "شور - دو دستش | گروه تخصصی صدابرداری نیستان",
      desciption: null,
      meta_title: null,
      meta_description: null,
      slug: "6339",
      likes: 0,
      downloads: 0,
      views: 34,
      category: null,
      status: "publish",
      person: [
        {
          id: 1,
          image: {
            src: "/media/images/mh-poyanfar2_BiIElH1.jpg",
            full_image_url:
              "http://laial.7negare.ir/media/images/mh-poyanfar2_BiIElH1.jpg",
            url: null,
            text: "محمدحسین پویانفر",
          },
          name: "محمدحسین پویانفر",
          slug: "pooyanfar",
          desciption:
            "پویانفر مرد خوبی است من اون رو دوست دارم  و شما هم اون رو دوست داشته باشید. \r\nو\r\nهمین دیگه",
          meta_title: "محمدحسین پویانفر",
          meta_description: "جدیدهاش",
          updated_on: "2021-01-07T17:10:33.717289Z",
          created_on: "2021-01-07T17:10:33.717340Z",
        },
        {
          id: 2,
          image: {
            src: "/media/images/haj-mehdi-rasoli.jpeg",
            full_image_url:
              "http://laial.7negare.ir/media/images/haj-mehdi-rasoli.jpeg",
            url: null,
            text: "مهدی رسولی",
          },
          name: "مهدی رسولی",
          slug: "mahdi-rasoli",
          desciption:
            "مهدی رسولی متولد زایشگاه و پسر خوبی است \r\nقدرش رو بدونید",
          meta_title: "مهدی رسولی",
          meta_description: "جدیدترین ها",
          updated_on: "2021-01-07T17:11:36.860975Z",
          created_on: "2021-01-07T17:11:36.861013Z",
        },
      ],
      image: null,
      media: [
        {
          id: 5,
          name: "شور - دو دستش",
          path: null,
          telegram_id: 761,
          extension: "audio/mpeg",
          size: 3645440,
          duration: 90,
          download: 0,
          ftp_status: false,
          type_file: "sound",
          image: null,
          updated_on: "2021-01-07T17:35:58.941768Z",
          created_on: "2021-01-07T17:35:58.941805Z",
        },
      ],
    },
    {
      id: 6,
      title: "مدیونم | محمدحسین پویانفر",
      desciption: null,
      meta_title: null,
      meta_description: null,
      slug: "39676",
      likes: 3,
      downloads: 0,
      views: 38,
      category: null,
      status: "publish",
      person: [
        {
          id: 1,
          image: {
            src: "/media/images/mh-poyanfar2_BiIElH1.jpg",
            full_image_url:
              "http://laial.7negare.ir/media/images/mh-poyanfar2_BiIElH1.jpg",
            url: null,
            text: "محمدحسین پویانفر",
          },
          name: "محمدحسین پویانفر",
          slug: "pooyanfar",
          desciption:
            "پویانفر مرد خوبی است من اون رو دوست دارم  و شما هم اون رو دوست داشته باشید. \r\nو\r\nهمین دیگه",
          meta_title: "محمدحسین پویانفر",
          meta_description: "جدیدهاش",
          updated_on: "2021-01-07T17:10:33.717289Z",
          created_on: "2021-01-07T17:10:33.717340Z",
        },
        {
          id: 2,
          image: {
            src: "/media/images/haj-mehdi-rasoli.jpeg",
            full_image_url:
              "http://laial.7negare.ir/media/images/haj-mehdi-rasoli.jpeg",
            url: null,
            text: "مهدی رسولی",
          },
          name: "مهدی رسولی",
          slug: "mahdi-rasoli",
          desciption:
            "مهدی رسولی متولد زایشگاه و پسر خوبی است \r\nقدرش رو بدونید",
          meta_title: "مهدی رسولی",
          meta_description: "جدیدترین ها",
          updated_on: "2021-01-07T17:11:36.860975Z",
          created_on: "2021-01-07T17:11:36.861013Z",
        },
      ],
      image: null,
      media: [
        {
          id: 6,
          name: "مدیونم",
          path: null,
          telegram_id: 763,
          extension: "audio/mpeg",
          size: 11351911,
          duration: 260,
          download: 0,
          ftp_status: false,
          type_file: "sound",
          image: null,
          updated_on: "2021-01-07T17:37:37.577662Z",
          created_on: "2021-01-07T17:37:37.577700Z",
        },
      ],
    },
    {
      id: 7,
      title: "کربلایی حسن عطایی | @hassanataie1",
      desciption: null,
      meta_title: null,
      meta_description: null,
      slug: "97653",
      likes: 0,
      downloads: 0,
      views: 20,
      category: null,
      status: "publish",
      person: [
        {
          id: 1,
          image: {
            src: "/media/images/mh-poyanfar2_BiIElH1.jpg",
            full_image_url:
              "http://laial.7negare.ir/media/images/mh-poyanfar2_BiIElH1.jpg",
            url: null,
            text: "محمدحسین پویانفر",
          },
          name: "محمدحسین پویانفر",
          slug: "pooyanfar",
          desciption:
            "پویانفر مرد خوبی است من اون رو دوست دارم  و شما هم اون رو دوست داشته باشید. \r\nو\r\nهمین دیگه",
          meta_title: "محمدحسین پویانفر",
          meta_description: "جدیدهاش",
          updated_on: "2021-01-07T17:10:33.717289Z",
          created_on: "2021-01-07T17:10:33.717340Z",
        },
        {
          id: 2,
          image: {
            src: "/media/images/haj-mehdi-rasoli.jpeg",
            full_image_url:
              "http://laial.7negare.ir/media/images/haj-mehdi-rasoli.jpeg",
            url: null,
            text: "مهدی رسولی",
          },
          name: "مهدی رسولی",
          slug: "mahdi-rasoli",
          desciption:
            "مهدی رسولی متولد زایشگاه و پسر خوبی است \r\nقدرش رو بدونید",
          meta_title: "مهدی رسولی",
          meta_description: "جدیدترین ها",
          updated_on: "2021-01-07T17:11:36.860975Z",
          created_on: "2021-01-07T17:11:36.861013Z",
        },
      ],
      image: null,
      media: [
        {
          id: 7,
          name: "کربلایی حسن عطایی",
          path: null,
          telegram_id: 770,
          extension: "audio/mpeg",
          size: 10992649,
          duration: 272,
          download: 0,
          ftp_status: false,
          type_file: "sound",
          image: null,
          updated_on: "2021-01-07T17:38:00.663350Z",
          created_on: "2021-01-07T17:38:00.663400Z",
        },
      ],
    },
    {
      id: 8,
      title: "کربلایی حسن عطایی | @hassanataie1",
      desciption: null,
      meta_title: null,
      meta_description: null,
      slug: "53067",
      likes: 0,
      downloads: 0,
      views: 18,
      category: null,
      status: "publish",
      person: [
        {
          id: 1,
          image: {
            src: "/media/images/mh-poyanfar2_BiIElH1.jpg",
            full_image_url:
              "http://laial.7negare.ir/media/images/mh-poyanfar2_BiIElH1.jpg",
            url: null,
            text: "محمدحسین پویانفر",
          },
          name: "محمدحسین پویانفر",
          slug: "pooyanfar",
          desciption:
            "پویانفر مرد خوبی است من اون رو دوست دارم  و شما هم اون رو دوست داشته باشید. \r\nو\r\nهمین دیگه",
          meta_title: "محمدحسین پویانفر",
          meta_description: "جدیدهاش",
          updated_on: "2021-01-07T17:10:33.717289Z",
          created_on: "2021-01-07T17:10:33.717340Z",
        },
        {
          id: 2,
          image: {
            src: "/media/images/haj-mehdi-rasoli.jpeg",
            full_image_url:
              "http://laial.7negare.ir/media/images/haj-mehdi-rasoli.jpeg",
            url: null,
            text: "مهدی رسولی",
          },
          name: "مهدی رسولی",
          slug: "mahdi-rasoli",
          desciption:
            "مهدی رسولی متولد زایشگاه و پسر خوبی است \r\nقدرش رو بدونید",
          meta_title: "مهدی رسولی",
          meta_description: "جدیدترین ها",
          updated_on: "2021-01-07T17:11:36.860975Z",
          created_on: "2021-01-07T17:11:36.861013Z",
        },
      ],
      image: null,
      media: [
        {
          id: 8,
          name: "کربلایی حسن عطایی",
          path: null,
          telegram_id: 773,
          extension: "audio/mpeg",
          size: 10342412,
          duration: 256,
          download: 0,
          ftp_status: false,
          type_file: "sound",
          image: null,
          updated_on: "2021-01-07T17:38:00.958279Z",
          created_on: "2021-01-07T17:38:00.958326Z",
        },
      ],
    },
    {
      id: 9,
      title: "کربلایی حسن عطایی | @hassanataie1",
      desciption: null,
      meta_title: null,
      meta_description: null,
      slug: "12813",
      likes: 1,
      downloads: 0,
      views: 29,
      category: null,
      status: "publish",
      person: [
        {
          id: 1,
          image: {
            src: "/media/images/mh-poyanfar2_BiIElH1.jpg",
            full_image_url:
              "http://laial.7negare.ir/media/images/mh-poyanfar2_BiIElH1.jpg",
            url: null,
            text: "محمدحسین پویانفر",
          },
          name: "محمدحسین پویانفر",
          slug: "pooyanfar",
          desciption:
            "پویانفر مرد خوبی است من اون رو دوست دارم  و شما هم اون رو دوست داشته باشید. \r\nو\r\nهمین دیگه",
          meta_title: "محمدحسین پویانفر",
          meta_description: "جدیدهاش",
          updated_on: "2021-01-07T17:10:33.717289Z",
          created_on: "2021-01-07T17:10:33.717340Z",
        },
        {
          id: 2,
          image: {
            src: "/media/images/haj-mehdi-rasoli.jpeg",
            full_image_url:
              "http://laial.7negare.ir/media/images/haj-mehdi-rasoli.jpeg",
            url: null,
            text: "مهدی رسولی",
          },
          name: "مهدی رسولی",
          slug: "mahdi-rasoli",
          desciption:
            "مهدی رسولی متولد زایشگاه و پسر خوبی است \r\nقدرش رو بدونید",
          meta_title: "مهدی رسولی",
          meta_description: "جدیدترین ها",
          updated_on: "2021-01-07T17:11:36.860975Z",
          created_on: "2021-01-07T17:11:36.861013Z",
        },
      ],
      image: null,
      media: [
        {
          id: 9,
          name: "کربلایی حسن عطایی",
          path: null,
          telegram_id: 771,
          extension: "audio/mpeg",
          size: 11676011,
          duration: 289,
          download: 0,
          ftp_status: false,
          type_file: "sound",
          image: null,
          updated_on: "2021-01-07T17:38:01.227539Z",
          created_on: "2021-01-07T17:38:01.227576Z",
        },
      ],
    },
    {
      id: 10,
      title: "کربلایی حسن عطایی | @hassanataie1",
      desciption: null,
      meta_title: null,
      meta_description: null,
      slug: "73773",
      likes: 4,
      downloads: 0,
      views: 18,
      category: null,
      status: "publish",
      person: [
        {
          id: 1,
          image: {
            src: "/media/images/mh-poyanfar2_BiIElH1.jpg",
            full_image_url:
              "http://laial.7negare.ir/media/images/mh-poyanfar2_BiIElH1.jpg",
            url: null,
            text: "محمدحسین پویانفر",
          },
          name: "محمدحسین پویانفر",
          slug: "pooyanfar",
          desciption:
            "پویانفر مرد خوبی است من اون رو دوست دارم  و شما هم اون رو دوست داشته باشید. \r\nو\r\nهمین دیگه",
          meta_title: "محمدحسین پویانفر",
          meta_description: "جدیدهاش",
          updated_on: "2021-01-07T17:10:33.717289Z",
          created_on: "2021-01-07T17:10:33.717340Z",
        },
        {
          id: 2,
          image: {
            src: "/media/images/haj-mehdi-rasoli.jpeg",
            full_image_url:
              "http://laial.7negare.ir/media/images/haj-mehdi-rasoli.jpeg",
            url: null,
            text: "مهدی رسولی",
          },
          name: "مهدی رسولی",
          slug: "mahdi-rasoli",
          desciption:
            "مهدی رسولی متولد زایشگاه و پسر خوبی است \r\nقدرش رو بدونید",
          meta_title: "مهدی رسولی",
          meta_description: "جدیدترین ها",
          updated_on: "2021-01-07T17:11:36.860975Z",
          created_on: "2021-01-07T17:11:36.861013Z",
        },
      ],
      image: null,
      media: [
        {
          id: 10,
          name: "کربلایی حسن عطایی",
          path: null,
          telegram_id: 775,
          extension: "audio/mpeg",
          size: 6633756,
          duration: 233,
          download: 0,
          ftp_status: false,
          type_file: "sound",
          image: null,
          updated_on: "2021-01-07T17:38:01.572893Z",
          created_on: "2021-01-07T17:38:01.572927Z",
        },
      ],
    },
    {
      id: 11,
      title: "کربلایی حسن عطایی | @hassanataie1",
      desciption: null,
      meta_title: null,
      meta_description: null,
      slug: "38049",
      likes: 1,
      downloads: 0,
      views: 17,
      category: null,
      status: "publish",
      person: [
        {
          id: 1,
          image: {
            src: "/media/images/mh-poyanfar2_BiIElH1.jpg",
            full_image_url:
              "http://laial.7negare.ir/media/images/mh-poyanfar2_BiIElH1.jpg",
            url: null,
            text: "محمدحسین پویانفر",
          },
          name: "محمدحسین پویانفر",
          slug: "pooyanfar",
          desciption:
            "پویانفر مرد خوبی است من اون رو دوست دارم  و شما هم اون رو دوست داشته باشید. \r\nو\r\nهمین دیگه",
          meta_title: "محمدحسین پویانفر",
          meta_description: "جدیدهاش",
          updated_on: "2021-01-07T17:10:33.717289Z",
          created_on: "2021-01-07T17:10:33.717340Z",
        },
        {
          id: 2,
          image: {
            src: "/media/images/haj-mehdi-rasoli.jpeg",
            full_image_url:
              "http://laial.7negare.ir/media/images/haj-mehdi-rasoli.jpeg",
            url: null,
            text: "مهدی رسولی",
          },
          name: "مهدی رسولی",
          slug: "mahdi-rasoli",
          desciption:
            "مهدی رسولی متولد زایشگاه و پسر خوبی است \r\nقدرش رو بدونید",
          meta_title: "مهدی رسولی",
          meta_description: "جدیدترین ها",
          updated_on: "2021-01-07T17:11:36.860975Z",
          created_on: "2021-01-07T17:11:36.861013Z",
        },
      ],
      image: null,
      media: [
        {
          id: 11,
          name: "کربلایی حسن عطایی",
          path: "https://dls.music-fa.com/tagdl/downloads/Iraj%20Bastami%20-%20Barge%20Khazan%20(128).mp3",
          telegram_id: 774,
          extension: "audio/mpeg",
          size: 6131996,
          duration: 215,
          download: 0,
          ftp_status: false,
          type_file: "sound",
          image: null,
          updated_on: "2021-01-10T07:03:45.818431Z",
          created_on: "2021-01-07T17:38:01.842689Z",
        },
      ],
    },
    {
      id: 12,
      title: "کربلایی حسن عطایی | @hassanataie1",
      desciption: null,
      meta_title: null,
      meta_description: null,
      slug: "19544",
      likes: 0,
      downloads: 0,
      views: 17,
      category: null,
      status: "publish",
      person: [
        {
          id: 1,
          image: {
            src: "/media/images/mh-poyanfar2_BiIElH1.jpg",
            full_image_url:
              "http://laial.7negare.ir/media/images/mh-poyanfar2_BiIElH1.jpg",
            url: null,
            text: "محمدحسین پویانفر",
          },
          name: "محمدحسین پویانفر",
          slug: "pooyanfar",
          desciption:
            "پویانفر مرد خوبی است من اون رو دوست دارم  و شما هم اون رو دوست داشته باشید. \r\nو\r\nهمین دیگه",
          meta_title: "محمدحسین پویانفر",
          meta_description: "جدیدهاش",
          updated_on: "2021-01-07T17:10:33.717289Z",
          created_on: "2021-01-07T17:10:33.717340Z",
        },
        {
          id: 2,
          image: {
            src: "/media/images/haj-mehdi-rasoli.jpeg",
            full_image_url:
              "http://laial.7negare.ir/media/images/haj-mehdi-rasoli.jpeg",
            url: null,
            text: "مهدی رسولی",
          },
          name: "مهدی رسولی",
          slug: "mahdi-rasoli",
          desciption:
            "مهدی رسولی متولد زایشگاه و پسر خوبی است \r\nقدرش رو بدونید",
          meta_title: "مهدی رسولی",
          meta_description: "جدیدترین ها",
          updated_on: "2021-01-07T17:11:36.860975Z",
          created_on: "2021-01-07T17:11:36.861013Z",
        },
      ],
      image: null,
      media: [
        {
          id: 12,
          name: "کربلایی حسن عطایی",
          path: null,
          telegram_id: 772,
          extension: "audio/mpeg",
          size: 11131310,
          duration: 275,
          download: 0,
          ftp_status: false,
          type_file: "sound",
          image: null,
          updated_on: "2021-01-07T17:38:02.116409Z",
          created_on: "2021-01-07T17:38:02.116455Z",
        },
      ],
    },
  ],
  pageinate: true,
};
