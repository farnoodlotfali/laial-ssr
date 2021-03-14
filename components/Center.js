import { Backdrop, IconButton, Modal, Slide, Tooltip } from '@material-ui/core';
import styles from '../styles/Center.module.css';

import { PostAddRounded } from '@material-ui/icons';
import appContext from '../contexts/app/appContext';
import { useContext } from 'react';

const Center = () => {
  const { showCenterList, centerList } = useContext(appContext);
  return (
    <div>
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
            <div className='playlist__title justify-content-center pl-3 d-flex '>
              <div className={`${styles.title} ml-4`}>
                {/* {isAddingSong ? (
                  <span>آهنگ به کدام لیست اضافه شود؟</span>
                ) : ( */}
                <span>لیست های من</span>
                {/* )}{' '} */}
              </div>

              <div className={styles.addBtn}>
                <Tooltip placement='left' title='لیست جدید'>
                  <IconButton
                    aria-label='add'
                    //    onClick={addList}
                  >
                    <PostAddRounded fontSize='large' />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
            <div className={`my-2 ml-4 ${styles.playlist__line}`} />
            <div className={styles.playlist__lists}>
              {/* {userPlaylists !== null &&
                userPlaylists.map((list) => (
                  <CenterItem
                    key={list.id}
                    name={list.name}
                    id={list.id}
                    items={list.items}
                  />
                ))} */}
            </div>
          </div>
        </Slide>
      </Modal>
    </div>
  );
};

export default Center;
