import { useState } from 'react';
import AppContext from './appContext';
const AppState = (props) => {
  const showLeft = false;
  const [x, setstate] = useState(false);
  return (
    <AppContext.Provider value={{ x }}>{props.children}</AppContext.Provider>
  );
};

export default AppState;
