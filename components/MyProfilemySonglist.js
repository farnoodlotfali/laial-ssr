import { IconButton } from "@material-ui/core";
import { CheckRounded, Close, Edit } from "@material-ui/icons";
import { useContext, useEffect, useRef, useState } from "react";
import appContext from "../contexts/app/appContext";
import styles from "../styles/MyProfile.module.css";

const MyProfilemySonglist = ({
  name,
  id,
  setListName,
  setListShow,
  setDeleteBtn,
}) => {
  const {
    getOnePlayList,
    updatePlaylistName,
    removePlaylist,
    changeMyProfilemySonglistId,
    myProfilemySonglistId,
  } = useContext(appContext);
  const inputRef = useRef();
  const [edit, setEdit] = useState(false);
  const [SongListName, setSongListName] = useState(name);

  useEffect(() => {
    inputRef.current.focus();
  }, [edit]);
  const saveEditedName = () => {
    setEdit(false);
    updatePlaylistName(id, inputRef.current.value);
  };
  const editName = () => {
    setEdit(true);
  };
  const removeList = () => {
    // console.log(id);
    removePlaylist(id);
    // removePlaylist();
  };
  const onChange = (e) => {
    setSongListName(inputRef.current.value);
  };

  const handleClick = async () => {
    changeMyProfilemySonglistId(id);
  };

  return (
    <div
      className={`${styles.myProfilemySonglist} ${styles.list__name} ${
        myProfilemySonglistId === id ? styles.list__name_HasBeenChosen : ""
      }`}
      onClick={() => handleClick()}
    >
      <div
        onClick={async () =>
          !edit &&
          setListShow(await getOnePlayList(id)) &
            setListName(name) &
            setDeleteBtn(true)
        }
      >
        <input
          className={`${styles.list__name__innerText}  ${
            edit ? styles.bgwhite : styles.bgnormal
          }`}
          type="text"
          value={SongListName}
          onChange={onChange}
          disabled={!edit}
          ref={inputRef}
          maxLength={18}
        />
      </div>

      <div className={`${styles.list__icons}  d-flex `}>
        {edit ? (
          <IconButton aria-label="save" onClick={saveEditedName}>
            <CheckRounded className={styles.list__icons_btn} />
          </IconButton>
        ) : (
          <IconButton aria-label="edit" onClick={editName}>
            <Edit className={styles.list__icons_btn} />
          </IconButton>
        )}
        <IconButton aria-label="remove" onClick={removeList}>
          <Close className={styles.list__icons_btn} />
        </IconButton>
      </div>
    </div>
  );
};

export default MyProfilemySonglist;
