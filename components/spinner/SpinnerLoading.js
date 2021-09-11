const SpinnerLoading = () => {
  return (
    <div
      // className='mr-auto'
      className="spinner"
      style={{
        display: "flex",
        height: "100%",
        opacity: 0.7,
        position: "absolute",
        // top: '1%',
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "30px",
        height: "30px",
        position: "inherit",
        transform: "none",
      }}
    >
      <img
        // className='mr-auto'
        src={"/SpinnerLoad.gif"}
        alt="..loading"
        style={{
          widows: "200px",
          display: "block",
          display: "block",
          width: "100% ",
          height: "100% ",
        }}
      />
    </div>
  );
};

export default SpinnerLoading;
