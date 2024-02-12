import { shallowEqual, useSelector } from "react-redux";
import Elements from "../Elements/Elements";

const HomePageComp = () => {
  const folders = ["New folder", "new folder 2"];
  const files = [{ name: "New file" }, { name: "new file 2" }];

  const { isLoading, userFolders } = useSelector(
    (state) => ({
      isLoading: state.elements.isLoading,
      userFolders: state.elements.userFolders,
    }),
    shallowEqual
  );

  console.log("userFolders:", userFolders);

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">It's loading...</h1>
      ) : (
        <>
          <Elements
            title={"Created Folders"}
            type={"folder"}
            elements={userFolders.length > 0 ? userFolders[0] : []}
          />
          <Elements title={"Created Files"} elements={files} />
        </>
      )}
    </div>
  );
};

export default HomePageComp;
