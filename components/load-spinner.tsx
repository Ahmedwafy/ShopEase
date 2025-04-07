import "../styles/components/_loader.scss";

const Loader = () => {
  console.log("Loader component is rendering...");
  return (
    <div className="load">
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
