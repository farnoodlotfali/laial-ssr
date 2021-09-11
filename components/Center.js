import {
  Backdrop,
  IconButton,
  makeStyles,
  Modal,
  Slide,
  Tooltip,
} from "@material-ui/core";
import styles from "../styles/Center.module.css";

import { PostAddRounded } from "@material-ui/icons";
import appContext from "../contexts/app/appContext";
import { useContext, useEffect, useRef, useState } from "react";
import CenterItem from "./CenterItem";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import authContext from "../contexts/auth/authContext";

const useStyles = makeStyles({
  paper: {
    background: "linear-gradient( 135deg, #303030 10%, #05060b 100%)",
    border: "1px solid white",
    cursor: "default",
  },
  content: {
    borderBottom: "2px solid black",
    display: "flex",
    flexDirection: "column",
  },
  title: {
    color: "white",
    fontFamily: "vazir",
    direction: "rtl",
    display: "flex",
    borderBottom: "1px solid black",
    paddingBottom: 5,
  },
});

const Center = () => {
  const classes = useStyles();
  const inputRef = useRef();
  const { user, isAuth } = useContext(authContext);
  // const [open, setOpen] = useState(false);
  const [SongListName, setSongListName] = useState();
  const [showUserlist, setShowUserlist] = useState(true);
  const [showMsg, setShowMsg] = useState({
    showMsg: false,
    msg: " ",
    success: null,
  });
  const {
    showCenterList,
    centerList,
    userPlaylists,
    makeNewPlaylist,
    isAddingSong,
    ChangeShowCreateList,
    showCreateList,
    mainPlaylistId,
  } = useContext(appContext);

  const addList = () => {
    let i = 0;
    let name = "";
    if (userPlaylists !== null) {
      do {
        i++;
        name = "safine " + i;
        // eslint-disable-next-line
      } while (userPlaylists.findIndex((list) => list.name === name) !== -1);
    } else name = "myList 0";
    // let form = [
    //   {
    //     name: name,
    //     status: "publish",
    //   },
    // ];

    setSongListName(name);

    ChangeShowCreateList(true);
    // makeNewPlaylist(form);
  };
  // console.log(userPlaylists);
  const handleClose = () => {
    ChangeShowCreateList(false);
  };

  const createList = async () => {
    ChangeShowCreateList(false);

    setShowUserlist(false);
    // let form = [
    //   {
    //     name: SongListName,
    //   },
    // ];

    const success = await makeNewPlaylist(SongListName);

    if (success) {
      setShowMsg({
        showMsg: true,
        msg: "لیست با موفقیت ایجاد گردید",
        success: true,
      });
    } else {
      setShowMsg({
        showMsg: true,
        msg: "ساخت لیست با خطا مواجه شد",
        success: false,
      });
    }
    setTimeout(() => {
      setShowUserlist(true);
    }, 5000);
  };
  useEffect(() => {
    setSongListName("");
  }, [showCreateList]);
  return (
    <div>
      <div className="center__input_dialog">
        <Dialog
          open={showCreateList}
          onEnter={() => inputRef.current.focus()}
          onClose={handleClose}
          classes={{ paper: classes.paper }}
        >
          <DialogTitle classes={{ root: classes.title }}>
            {"نام لیست خود را وارد کنید"}
          </DialogTitle>
          <DialogContent classes={{ root: classes.content }}>
            <div className={styles.center__input_dialog__div}>
              <input
                ref={inputRef}
                className={styles.center__input_dialog__input}
                value={SongListName}
                onChange={(e) => setSongListName(e.target.value)}
                maxLength={18}
              />
              <span className={styles.center__input_dialog__div__warn}>
                حداکثر 18 حرف*
              </span>
            </div>
          </DialogContent>
          <DialogActions>
            <span
              className={styles.center__input_dialog__btn}
              onClick={() => handleClose()}
            >
              بستن
            </span>
            <span
              className={styles.center__input_dialog__btn}
              onClick={() => createList()}
            >
              ساخت لیست
            </span>
          </DialogActions>
        </Dialog>
      </div>

      <Modal
        className={styles.modal}
        open={centerList}
        onClose={() => showCenterList(centerList ? false : true)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide
          direction={centerList ? `down` : `up`}
          timeout={500}
          in={centerList}
        >
          <div className={`${styles.playlist} py-3 pl-1  pr-4 text-white`}>
            <div className="playlist__title justify-content-around pl-3 d-flex ">
              <div className={`${styles.title} ml-4`}>
                {isAddingSong ? (
                  <span>آهنگ به کدام لیست اضافه شود؟</span>
                ) : (
                  <span>لیست های من</span>
                )}
              </div>

              <div
                className={styles.addBtn}
                onClick={() => ChangeShowCreateList(true)}
              >
                <PostAddRounded fontSize="large" />
                <span>لیست جدید</span>
              </div>
            </div>
            <div className={`my-2 ml-4 ${styles.playlist__line}`} />
            <div className={styles.playlist__lists}>
              {userPlaylists !== null &&
                userPlaylists.map(
                  (list) =>
                    mainPlaylistId !== list.id && (
                      <CenterItem
                        key={list.id}
                        name={list.name}
                        id={list.id}
                        items={list.items}
                      />
                    )
                )}
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
};

export default Center;
