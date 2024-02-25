// import "./Elements.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFolder, faFileAlt } from "@fortawesome/free-solid-svg-icons";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { changeFolder } from "../../../redux/actionCreators/elementsActionCreator";

// import JSZip from "jszip";

// const Elements = ({ title, elements, type }) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const handleDblClick = (itemId) => {
//     if (type == "folder") {
//       dispatch(changeFolder(itemId));
//       navigate(`/dashboard/folder/${itemId}`);
//     } else {
//       navigate(`/dashboard/file/${itemId}`);
//     }
//   };

//   return (
//     <div className="w-100">
//       <h4 className="text-center border-bottom py-2">{title}</h4>
//       <div className="row gap-2 p-4 flex-wrap">
//         {elements.map((item, index) => {
//           return (
//             <p
//               key={index * 55}
//               className="col-md-2 p-3 text-center d-flex flex-column border"
//               onDoubleClick={() => handleDblClick(item.docId)}
//             >
//               {type == "folder" ? (
//                 <FontAwesomeIcon icon={faFolder} size="3x" className="mb-2" />
//               ) : (
//                 <FontAwesomeIcon icon={faFileAlt} size="3x" className="mb-2" />
//               )}
//               {item.data && item.data.name ? item.data.name : "No Name"}
//             </p>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Elements;

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faFileAlt,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  changeFolder,
  deleteFolder,
} from "../../../redux/actionCreators/elementsActionCreator";
import JSZip from "jszip";

const Elements = ({ title, elements, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const downloadFolder = (folderName, folderContents) => {
    const zip = new JSZip();

    const processFolder = (currentFolder, currentPath) => {
      if (Array.isArray(currentFolder)) {
        currentFolder.forEach((fileOrFolder) => {
          const fullPath = currentPath + fileOrFolder.data.name;

          if (fileOrFolder.type === "folder") {
            const newFolder = zip.folder(fullPath + "/");

            processFolder(fileOrFolder.data.contents, fullPath + "/");
          } else {
            zip.file(fullPath, fileOrFolder.data.data);
          }
        });
      } else {
        console.error("Invalid folder structure:", currentFolder);
      }
    };

    processFolder(folderContents, "");

    zip.generateAsync({ type: "blob" }).then((blob) => {
      const downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.download = `${folderName}.zip`;

      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    });
  };

  const handleDeleteFolder = (folderId) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this folder?"
    );
    if (confirm) {
      dispatch(deleteFolder(folderId));
    }
  };

  const handleDblClick = (itemId) => {
    if (type === "folder") {
      dispatch(changeFolder(itemId));
      navigate(`/dashboard/folder/${itemId}`);
    } else {
      navigate(`/dashboard/file/${itemId}`);
    }
  };

  return (
    <div className="w-100">
      <h4 className="text-center border-bottom py-2">{title}</h4>
      <div className="row gap-2 p-4 flex-wrap">
        {elements.map((item, index) => (
          <p
            key={index * 55}
            className="col-md-2 p-3 text-center d-flex flex-column border"
            onDoubleClick={() => handleDblClick(item.docId)}
          >
            {type === "folder" ? (
              <>
                <FontAwesomeIcon icon={faFolder} size="3x" className="mb-2" />

                <button
                  onClick={() => downloadFolder(item.data.name)}
                  className="btn btn-sm btn-outline-secondary mt-2"
                >
                  Download
                </button>
                <button
                  onClick={() => handleDeleteFolder(item.docId)}
                  className="btn btn-sm btn-outline-danger mt-2"
                >
                  Delete
                </button>
              </>
            ) : (
              <FontAwesomeIcon icon={faFileAlt} size="3x" className="mb-2" />
            )}
            {item.data && item.data.name ? item.data.name : "No Name"}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Elements;
