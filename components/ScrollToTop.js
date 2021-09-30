import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import appContext from "../contexts/app/appContext";

const ScrollToTop = () => {
  const router = useRouter();
  const id = router.query.id;
  const pathanme = router.pathname;
  const { showCenterList } = useContext(appContext);
  useEffect(() => {
    if (pathanme !== "/") {
      // console.log(pathanme);
      window.scrollTo(0, 0);
    }
    showCenterList(false);
    // eslint-disable-next-line
  }, [pathanme]);

  return <div style={{ display: "none" }}></div>;
};
export default ScrollToTop;
