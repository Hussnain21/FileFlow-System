import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Elements from "../Elements/Elements";

const FolderComp = () => {
  const { folderId } = useParams();

  const { currentFolderData, childFolders, childFiles } = useSelector(
    (state) => ({
      currentFolderData: state.elements.userFolders.find(
        (folder) => folder.docId === folderId
      )?.data,
      childFolders: state.elements.userFolders.filter(
        (folder) => folder.data.parent === folderId
      ),

      childFiles: state.elements.userFiles.filter(
        (file) => file.data.parent === folderId
      ),
      // childFolders: Array.isArray(state.elements.userFolders?.[0])
      //   ? state.elements.userFolders[0].filter(
      //       (folder) => folder.data && folder.data.parent === folderId
      //     )
      //   : [],

      // childFolders: state.elements.userFolders[0]?.filter(
      //   (folder) => folder.data && folder.data.parent === folderId
      // ),
    }),
    shallowEqual
  );

  const createFiles =
    childFiles && childFiles.filter((file) => file.data.url === null);
  const uploadedFiles =
    childFiles && childFiles.filter((file) => file.data.data === null);

  console.log(folderId);
  // const a = currentFolderData[0]?.filter(
  //   (x) => x?.docId?.toString() === folderId.toString()
  // )[0];
  // console.log(a);
  // console.log(currentFolderData);

  // const folderDataExists = a !== undefined;
  // const folderData = folderDataExists ? a.data : null;

  return (
    <div>
      {/* FolderComp: {folderId} {JSON.stringify(a)} */}
      {/* childFolders: {JSON.stringify(childFolders)} */}
      {childFolders.length > 0 ? (
        <>
          {childFolders.length > 0 && (
            <Elements
              title={"Created Folders"}
              type={"folder"}
              elements={childFolders}
            />
          )}
          {childFiles.length > 0 && (
            <Elements
              title={"Created Files"}
              type={"file"}
              elements={childFiles.filter((file) => file.data.url === null)}
            />
          )}
          {childFiles.length > 0 && (
            <Elements
              title={"Uploaded Files"}
              type={"file"}
              elements={childFiles.filter((file) => file.data.data === null)}
            />
          )}
        </>
      ) : (
        <h1 className="text-center my-5">Empty Folder</h1>
      )}
    </div>
  );
};

export default FolderComp;
