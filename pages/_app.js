import '../styles/globals.css';
// import 'flickity-fade';
import 'swiper/swiper.scss';
import 'swiper/swiper-bundle.css';
import 'swiper/swiper-bundle';
import 'bootstrap/dist/css/bootstrap.css';
import 'swiper/components/effect-fade/effect-fade.scss';
import Header from '../components/Header';
import AppState from '../contexts/app/AppState';
import PlayerState from '../contexts/player/PlayerState';
import NextNprogress from 'nextjs-progressbar';
import ScrollToTop from '../components/ScrollToTop';
import RightList from '../components/RightList';
import LeftList from '../components/LeftList';
import Center from '../components/Center';
import PhoneMenu from '../components/PhoneMenu';
import AuthState from '../contexts/auth/AuthState';
import { useEffect } from 'react';
import theme from '../src/theme';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <div style={{ backgroundColor: 'rgb(18, 18, 18)' }}>
      <ThemeProvider theme={theme}>
        <NextNprogress
          color='blue'
          options={{ easing: 'ease', speed: 500 }}
          startPosition={0.3}
          stopDelayMs={200}
          height='6'
        />
        <CssBaseline />
        <AppState>
          <AuthState>
            <PlayerState>
              <ScrollToTop />
              <Header />
              <RightList />
              <LeftList />
              <Center />
              <Component {...pageProps} />
              <PhoneMenu />
            </PlayerState>
          </AuthState>
        </AppState>
      </ThemeProvider>
    </div>
  );
}

export default MyApp;
