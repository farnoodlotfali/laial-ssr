const SpinnerLoadingOnRowItem = () => {
  return (
    <div
      className="spinner"
      style={{
        display: "flex",
        height: "100%",
        width: "100%",
        opacity: 0.7,
        justifyContent: "center",
      }}
    >
      <img
        src={"/SpinnerLoad.gif"}
        alt="..loading"
        style={{
          widows: "200px",
          display: "block",
          width: "60px",
          height: "90px",
        }}
      />
    </div>
  );
};

export default SpinnerLoadingOnRowItem;
