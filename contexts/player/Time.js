import { useEffect, useState } from "react";

const Time = () => {
  const zeroPad = (num, places) => String(num).padStart(places, "0");
  const [time, settime] = useState("00:00");

  useEffect(() => {
    const audio = document.getElementById("audio2");
    const setAudioTime = () => {
      settime(
        Math.floor(audio?.currentTime / 60) +
          ":" +
          zeroPad(Math.floor(audio?.currentTime % 60), 2)
      );
    };

    audio?.addEventListener("timeupdate", setAudioTime);
    return () => {
      audio?.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  // console.log(addToRecentlyViewed);
  return <>{time}</>;
};

export default Time;
