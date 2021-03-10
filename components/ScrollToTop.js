import { useEffect } from 'react';
import { useRouter } from 'next/router';
export default function ScrollToTop() {
  const router = useRouter();
  const id = router.query.id;
  const pathanme = router.pathname;
  useEffect(() => {
    if (pathanme !== '/') {
      // console.log(pathanme);
      window.scrollTo(0, 0);
    }
    // eslint-disable-next-line
  }, [pathanme]);

  return null;
}
