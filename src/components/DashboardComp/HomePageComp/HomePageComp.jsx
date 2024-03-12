import { shallowEqual, useSelector } from "react-redux";
import Elements from "../Elements/Elements";
import { useMemo } from "react";
import Footer from "../../HomePageComp/FooterComp";

const HomePageComp = () => {
  const { isLoading, userFolders, userFiles } = useSelector(
    (state) => ({
      isLoading: state.elements.isLoading,
      userFolders: state.elements.userFolders.filter(
        (folder) => folder.data && folder.data.parent === "root"
      ),

      userFiles: state.elements.userFiles.filter(
        (file) => file.data.parent === "root"
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
          <Elements
            title={"Created Files"}
            type={"file"}
            elements={userFiles.filter((file) => file.data.url === null)}
          />
          <Elements
            title={"Uploaded Files"}
            type={"file"}
            elements={userFiles.filter((file) => file.data.data === null)}
          />
          <Footer />
        </>
      )}
    </div>
  );
};

export default HomePageComp;
