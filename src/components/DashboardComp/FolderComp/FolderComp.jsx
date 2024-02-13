import { shallowEqual, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const FolderComp = () => {
  const { folderId } = useParams();

  const { currentFolderData, childFolders } = useSelector(
    (state) => ({
      currentFolderData: state.elements.userFolders,
      childFolders: state.elements.userFolders.filter(
        (folder) => folder.parent === folderId
      ),
    }),
    shallowEqual
  );

  console.log(folderId);
  const a = currentFolderData[0]?.filter(
    (x) => x?.docId?.toString() === folderId.toString()
  )[0];
  // console.log(a);
  // console.log(currentFolderData);

  // Check if currentFolderData is not undefined before accessing its properties
  const folderDataExists = a !== undefined;
  const folderData = folderDataExists ? a.data : null;

  return (
    <div>
      {/* FolderComp: {folderId} {JSON.stringify(a)} */}
      {/* childFolders: {JSON.stringify(childFolders)} */}
      {childFolders.length > 0 ? (
        <p>{JSON.stringify(childFolders)}</p>
      ) : (
        <h1 className="text-center my-5">Empty Folder</h1>
      )}
    </div>
  );
};

export default FolderComp;
