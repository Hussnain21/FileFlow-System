import Elements from "../Elements/Elements";

const HomePageComp = () => {
  const folders = ["New folder", "new folder 2"];
  const files = ["New file", "new file 2"];

  return (
    <div className="col-md-1 w-100">
      <Elements title={"Created Folders"} elements={folders} />
      <Elements title={"Created Files"} elements={files} />
    </div>
  );
};

export default HomePageComp;
