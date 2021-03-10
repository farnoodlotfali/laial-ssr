import '../styles/globals.css';
// import 'flickity-fade';
import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle';
import 'bootstrap/dist/css/bootstrap.css';
import 'swiper/components/effect-fade/effect-fade.scss';
import Header from '../components/Header';
import AppState from '../contexts/app/AppState';
import NextNprogress from 'nextjs-progressbar';
import ScrollToTop from '../components/ScrollToTop';
function MyApp({ Component, pageProps }) {
  return (
    <div style={{ backgroundColor: 'rgb(18, 18, 18)' }}>
      <NextNprogress
        color='blue'
        options={{ easing: 'ease', speed: 500 }}
        startPosition={0.3}
        stopDelayMs={200}
        height='6'
      />
      <AppState>
        <ScrollToTop />
        <Header />
        <Component {...pageProps} />
      </AppState>
    </div>
  );
}

export default MyApp;
