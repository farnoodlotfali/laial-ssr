import styles from '../../styles/SpinnerLoadingOnRowitem.module.css';

const SpinnerLoadingOnRowitem = () => {
  return (
    <div
      // className='mr-auto'
      className={styles.spinner}
      // style={{
      //   display: 'flex',
      //   height: '100%',
      //   opacity: '0.7',
      //   position: 'absolute',
      //   top: '50%',
      //   left: '50%',
      //   transform: 'translate(-50%, -50%)',
      // }}
    >
      <img
        // className='mr-auto'
        className={styles.spinnerImg}
        src={'/SpinnerLoad.gif'}
        alt='..loading'
        // style={{
        //   widows: '200px',
        //   display: 'block',
        //   width: '100%',
        //   height: '250px',
        //   borderRadius: '5px',
        // }}
      />
    </div>
  );
};

export default SpinnerLoadingOnRowitem;
