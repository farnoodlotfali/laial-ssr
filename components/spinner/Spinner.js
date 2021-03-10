// import spinner2 from './Spinner2.gif';

const Spinner = () => {
  return (
    <div className='spinner' style={{ display: 'flex', height: '100vh' }}>
      <img
        src={'/Spinner2.gif'}
        alt='..loading'
        style={{
          widows: '200px',
          margin: 'auto',
          display: 'block',
        }}
      />
    </div>
  );
};

export default Spinner;
