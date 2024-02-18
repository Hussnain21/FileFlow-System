import { faL, faTimes, fas } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { React, useEffect, useState } from "react";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
// import { createFile } from "../../../redux/actionCreators/elementsActionCreator";

const UploadFile = ({ setIsFileUploadModalOpen }) => {
  const [file, setFile] = useState("");
  const [success, setSuccess] = useState(false);

  const { userFiles, user, currentFolder, currentFolderData } = useSelector(
    (state) => ({
      userFiles: state.elements.userFiles,
      user: state.auth.user,
      currentFolder: state.elements.currentFolder,
      currentFolderData: state.elements.userFolders.find(
        (folder) => folder.docId === state.elements.currentFolder
      ),
    }),
    shallowEqual
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      setFileName("");
      setSuccess(false);
      setIsFileUploadModalOpen(false);
    }
  }, [success]);

  const checkFileAlreadyPresent = (name, exten) => {
    if (!exten) {
      name = name + ".txt";
    }
    const filePresent = userFiles
      .filter((file) => file.data.parent === currentFolder)
      .find((folder) => folder.data.name === name);
    // console.log("folderPresent:", folderPresent);
    if (filePresent) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (fileName) {
    //   if (fileName.length > 3) {
    //     let extension = false;
    //     if (fileName.split(".").length > 1) {
    //       extension = true;
    //     }
    //     if (!checkFileAlreadyPresent(fileName, extension)) {
    //       const data = {
    //         createdAt: new Date(),
    //         name: extension ? fileName : `${fileName}.txt`,
    //         userId: user.uid,
    //         createBy: user.displayName,
    //         path:
    //           currentFolder == "root"
    //             ? []
    //             : [...(currentFolderData?.data.path || []), currentFolder],
    //         parent: currentFolder,
    //         lastAccessed: null,
    //         updatedAt: new Date(),
    //         extension: extension ? fileName.split(".")[1] : "txt",
    //         data: "",
    //         url: null,
    //       };
    //       dispatch(createFile(data, setSuccess));
    //     } else {
    //       alert("File already exists!");
    //     }
    //   } else {
    //     alert("File name must contain 3 or more characters!");
    //   }
    // } else {
    //   alert("File name required!");
    // }
  };
  return (
    <div
      className="col-md-12 position-fixed top-0 left-0 w-100 h-100"
      style={{ background: "rgba(0,0,0,0.4)", zIndex: 9999 }}
    >
      <div className="row align-items-center justify-content-center">
        <div className="col-md-4 mt-5 bg-white rounded p-4">
          <div className="d-flex justify-content-between">
            <h4>Upload File</h4>
            <button
              className="btn"
              onClick={() => setIsFileUploadModalOpen(false)}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="text-black"
                size="sm"
              />
            </button>
          </div>
          <hr />
          <div className="d-flex flex-column algin-items-center">
            <form className="mt-3 w-100" onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="file"
                  className="form-control"
                  id="file"
                  placeholder="File Name e,g. file.txt, index.html, index.php, index.ts, index.js "
                  onChange={(e) => setFile(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary mt-5 form-control"
              >
                Upload File
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;

//   const firstFolderArray = userFolders[0];
//   const folderExists = firstFolderArray
//     ?.filter(
//       (folder) => folder?.parent?.toLowerCase() == currentFolder.toLowerCase()
//     )
//     .find((folder) => folder?.name?.toLowerCase() == name?.toLowerCase());
//   return folderExists;
// };
