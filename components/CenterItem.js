import { Fragment, useContext, useEffect, useRef, useState } from 'react';
import appContext from '../contexts/app/appContext';
import styles from '../styles/CenterItem.module.css';
import { Divider, IconButton } from '@material-ui/core';
import { CheckRounded, Close, Edit } from '@material-ui/icons';
const CenterItem = ({ name, id, items }) => {
  const {
    isAddingSong,
    addMusicToPlaylist,
    updatePlaylistName,
    mainPlaylistId,
    removePlaylist,
  } = useContext(appContext);
  const [edit, setEdit] = useState(false);
  const [listName, setListName] = useState(name);
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.focus();
  }, [edit, isAddingSong]);

  const editName = () => {
    setEdit(true);
  };
  const saveEditedName = () => {
    setEdit(false);
    updatePlaylistName(id, inputRef.current.value);
  };

  const removeList = () => {
    removePlaylist(id);
  };

  const onChange = (e) => {
    setListName(inputRef.current.value);
  };
  const handleClick = (e) => {
    if (isAddingSong) {
      addMusicToPlaylist(id);
    } else console.log(items);
  };
  return (
    <Fragment>
      <div
        className={`${styles.list} d-flex justify-content-between`}
        onClick={() => handleClick()}
      >
        <input
          className={`${styles.list__name} ${
            edit ? 'list__name_edit' : `${styles.list__name_save}`
          }`}
          type='text'
          value={listName}
          onChange={onChange}
          disabled={!edit}
          ref={inputRef}
          maxLength={18}
        />
        {mainPlaylistId !== id ? (
          <div className={`${styles.list__icons} d-flex`}>
            {edit ? (
              <IconButton aria-label='save' onClick={saveEditedName}>
                <CheckRounded />
              </IconButton>
            ) : (
              <IconButton aria-label='edit' onClick={editName}>
                <Edit />
              </IconButton>
            )}
            <IconButton aria-label='remove' onClick={removeList}>
              <Close />
            </IconButton>
          </div>
        ) : (
          <span className={`align-self-center ml-2 ${styles.centerItem__info}`}>
            لیست ثابت سایت
          </span>
        )}
      </div>
      <Divider />
    </Fragment>
  );
};

export default CenterItem;
