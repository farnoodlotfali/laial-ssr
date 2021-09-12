import { makeStyles, Slider } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import playerContext from "./playerContext";

const useStyles = makeStyles({
  rail: {
    height: "4px",
    color: "white",
  },
  thumb: {
    color: "white",
  },

  paper: {
    backgroundColor: "rgb(78, 83, 88)",
    bottom: "109px",
    /* max-width: 360px, */
    overflow: "hidden",
    /* top: 10%, */
    /* position: relative, */
    zIndex: "999",
  },
});
const Bar = ({
  loading,
  // currentProgress,
  handleChange,
  className = "",
}) => {
  // const { progressToZero } = useContext(playerContext);
  const classes = useStyles();

  //   console.log(audio);
  const [progress, setprogress] = useState(0);
  useEffect(() => {
    const audio = document.getElementById("audio2");
    const setAudioTime = () => {
      setprogress(
        parseFloat(((audio?.currentTime * 100) / audio?.duration).toFixed(2))
      );
      // if (progressToZero) {
      //   setprogress(0);
      // }
    };

    audio?.addEventListener("timeupdate", setAudioTime);
    return () => {
      // audio.removeEventListener("loadeddata", setAudioData);
      audio?.removeEventListener("timeupdate", setAudioTime);
    };
  }, []);

  // console.log(parseFloat(progress.toFixed(0)) === 33);
  return (
    <Slider
      classes={{
        rail: classes.rail,
        track: classes.rail,
        thumb: classes.thumb,
      }}
      variant="determinate"
      disabled={loading}
      value={progress}
      onChange={(e, newDuration) => handleChange(newDuration)}
    />
  );
};

export default Bar;
