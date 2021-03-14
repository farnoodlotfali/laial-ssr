import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Slider } from '@material-ui/core';
const useStyles = makeStyles({
  rail: {
    height: '4px',
    color: 'white',
  },
  thumb: {
    color: 'white',
  },
});
export default function NewSlider() {
  const classes = useStyles();
  return (
    <Slider
      variant='determinate'
      classes={{
        rail: classes.rail,
        track: classes.rail,
        thumb: classes.thumb,
      }}
    ></Slider>
  );
}
