// import { shallowEqual, useSelector } from "react-redux";
// import { useParams } from "react-router-dom";

// const FolderComp = () => {
//   const { folderId } = useParams();

//   const { currentFolderData } = useSelector(
//     (state) => ({
//       currentFolderData: state.elements.userFolders.find(
//         (folder) => folder.docId === folderId
//       ).data,
//     }),
//     shallowEqual
//   );

//   // console.log("folderId:", folderId);
//   console.log("currentFolderData:", currentFolderData);

//   return (
//     <div>
//       FolderComp: {folderId} {JSON.stringify(currentFolderData)} {""}
//     </div>
//   );
// };

// export default FolderComp;

import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const FolderComp = () => {
  const { folderId } = useParams();

  const { currentFolderData, childFolders } = useSelector(
    (state) => ({
      currentFolderData: state.elements.userFolders.find(
        (folder) => folder.docId == folderId
      )?.data,
      childFolders: state.elements.userFolders.filter(
        (folder) => folder.parent == folderId
      ),
    }),
    shallowEqual
  );

  // Check if currentFolderData is not undefined before accessing its properties
  const folderDataExists = currentFolderData !== undefined;
  const folderData = folderDataExists ? currentFolderData.data : null;

  console.log("folderId:", folderId);
  console.log("currentFolderData:", currentFolderData);

  return (
    <div>
      {childFolders.length > 0 ? (
        <p>{JSON.stringify(childFolders)}</p>
      ) : (
        <p className="text-center my-5">Empty Folder</p>
      )}
    </div>
  );
};

export default FolderComp;
