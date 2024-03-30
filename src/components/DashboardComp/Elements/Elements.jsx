import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, ButtonGroup, Dropdown } from "react-bootstrap";
import {
  faFolder,
  faFileAlt,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {
  changeFolder,
  deleteFolder,
} from "../../../redux/actionCreators/elementsActionCreator";
import JSZip from "jszip";
import Footer from "../../HomePageComp/FooterComp";

const Elements = ({ title, elements, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { folderId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const { childFolders, childFiles } = useSelector(
    (state) => ({
      childFolders: state.elements.userFolders,

      childFiles: state.elements.userFiles,
    }),
    shallowEqual
  );
  console.log(childFiles);

  const downloadFolder = (folderName, folderContents, folderId) => {
    const zip = new JSZip();

    const processFolder = (currentFolder, currentPath) => {
      if (Array.isArray(currentFolder)) {
        currentFolder.forEach((fileOrFolder) => {
          const targetFiles = childFiles.filter(
            (x) => x.data.parent === folderId
          );
          console.log(targetFiles);
          targetFiles.forEach((x) => {
            zip.folder(folderName, x.data.name);
          });
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

  const filteredElements = elements.filter(
    (item) =>
      item.data &&
      item.data.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-100">
      <div className="ms-4 mt-0">
        <div className="col-md-2 mt-0 mb-0 px-0">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control shadow-sm rounded-2"
            style={{ border: " 1px solid #ced4da" }}
          />
        </div>
      </div>
      <h4 className="text-center border-bottom py-2">{title}</h4>
      <div className="row gap-2 p-4 flex-wrap">
        {filteredElements.map((item, index) => (
          <div
            key={index * 55}
            className="col-md-2 p-3 text-center d-flex flex-column border position-relative"
            onDoubleClick={() => handleDblClick(item.docId)}
          >
            {type === "folder" ? (
              <>
                <FontAwesomeIcon
                  icon={faFolder}
                  size="3x"
                  className="mb-2"
                  style={{ color: "#FED55F", cursor: "pointer" }}
                />
                <div className="position-absolute top-0 end-0">
                  <ButtonGroup>
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle
                        variant="link"
                        id={`dropdown-split-basic-${index}`}
                        style={{
                          fontSize: "18px",
                          color: "#000",
                          padding: "0",
                        }}
                      >
                        <FontAwesomeIcon icon={faEllipsisV} />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            downloadFolder(
                              item.data.name,
                              childFolders,
                              item.data.parent
                            )
                          }
                        >
                          Download
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() => handleDeleteFolder(item.docId)}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </ButtonGroup>
                </div>
              </>
            ) : (
              <FontAwesomeIcon
                icon={faFileAlt}
                size="3x"
                className="mb-2"
                style={{ color: "#7c7d7c", cursor: "pointer" }}
              />
            )}
            {item.data && item.data.name ? item.data.name : "No Name"}
          </div>
        ))}
      </div>
    </div>

    // <div className="w-100">
    //   <div className="ms-4 mt-0">
    //     <div className="col-md-2 mt-0 mb-0 px-0">
    //       <input
    //         type="text"
    //         placeholder="Search..."
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //         className="form-control shadow-sm rounded-2"
    //         style={{ border: " 1px solid #ced4da" }}
    //       />
    //     </div>
    //   </div>
    //   <h4 className="text-center border-bottom py-2">{title}</h4>
    //   <div className="row gap-2 p-4 flex-wrap">
    //     {filteredElements.map((item, index) => (
    //       <div
    //         key={index * 55}
    //         className="col-md-2 p-3 text-center d-flex flex-column border position-relative"
    //       >
    //         {type === "folder" ? (
    //           <>
    //             <FontAwesomeIcon
    //               icon={faFolder}
    //               size="3x"
    //               className="mb-2"
    //               style={{ color: "#3498db" }}
    //             />
    //             <div className="position-absolute top-0 end-0">
    //               <ButtonGroup>
    //                 <Dropdown as={ButtonGroup}>
    //                   <Dropdown.Toggle
    //                     variant="link"
    //                     id={`dropdown-split-basic-${index}`}
    //                     style={{
    //                       fontSize: "18px",
    //                       color: "#000",
    //                       padding: "0",
    //                     }}
    //                   >
    //                     <FontAwesomeIcon icon={faEllipsisV} />
    //                   </Dropdown.Toggle>

    //                   <Dropdown.Menu>
    //                     <Dropdown.Item
    //                       onClick={() => downloadFolder(item.data.name)}
    //                     >
    //                       Download
    //                     </Dropdown.Item>
    //                     <Dropdown.Item
    //                       onClick={() => handleDeleteFolder(item.docId)}
    //                     >
    //                       Delete
    //                     </Dropdown.Item>
    //                   </Dropdown.Menu>
    //                 </Dropdown>
    //               </ButtonGroup>
    //             </div>
    //           </>
    //         ) : (
    //           <FontAwesomeIcon
    //             icon={faFileAlt}
    //             size="3x"
    //             className="mb-2"
    //             style={{ color: "#2ecc71" }}
    //           />
    //         )}
    //         {item.data && item.data.name ? item.data.name : "No Name"}
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default Elements;
