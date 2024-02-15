import { shallowEqual, useSelector } from "react-redux";
import Elements from "../Elements/Elements";
import { useMemo } from "react";

const HomePageComp = () => {
  const folders = ["New folder", "new folder 2"];
  const files = [{ name: "New file" }, { name: "new file 2" }];

  const { isLoading, userFolders } = useSelector(
    (state) => ({
      isLoading: state.elements.isLoading,
      userFolders: state.elements.userFolders[0]?.filter(
        (folder) => folder.data && folder.data.parent === "root"
      ),
    }),
    shallowEqual
  );

  console.log("user:", userFolders);

  return (
    <div className="col-md-12 w-100">
      {isLoading ? (
        <h1 className="display-1 my-5 text-center">It's loading...</h1>
      ) : (
        <>
          <Elements
            title={"Created Folders"}
            type={"folder"}
            elements={userFolders}
          />
          <Elements title={"Created Files"} elements={files} />
        </>
      )}
    </div>
  );
};

export default HomePageComp;
