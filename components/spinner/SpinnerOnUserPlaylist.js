import Image from "next/image";

const SpinnerOnUserPlaylist = () => {
  const myloader = ({ src }) => {
    return src;
  };
  return (
    <div className="spinner" style={{ width: "120px", height: "120px" }}>
      <Image
        src={"/Spinner2.gif"}
        alt="..loading"
        style={{
          width: "100%",
          height: "100%",
          margin: "auto",
          display: "block",
        }}
        loader={myloader}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
};

export default SpinnerOnUserPlaylist;
