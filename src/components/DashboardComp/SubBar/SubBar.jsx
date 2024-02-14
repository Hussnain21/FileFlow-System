import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileUpload,
  faFileAlt,
  faFileCirclePlus,
  faFolderPlus,
  faSquareCaretUp,
} from "@fortawesome/free-solid-svg-icons";
import "./SubBar.css";
import { Link, useNavigate } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { changeFolder } from "../../../redux/actionCreators/elementsActionCreator";

const SubBar = ({ setIsCreateFolderModalOpen }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { currentFolder, currentFolderData, userFolders } = useSelector(
    (state) => ({
      currentFolder: state.elements.currentFolder,
      currentFolderData: state.elements.userFolders[0]?.find(
        (folder) => folder.docId === state.elements.currentFolder
      ),
      userFolders: state.elements.userFolders,
    }),
    shallowEqual
  );

  const handleNavigate = (link, id) => {
    navigate(link);
    dispatch(changeFolder(id));
  };

  return (
    <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-white py-2">
      <nav className="ms-5 " aria-label="breadcrumb">
        <ol class="breadcrumb d-flex align-items-center">
          {currentFolder !== "root" ? (
            <>
              <button
                onClick={() => handleNavigate("/dashboard", "root")}
                className="breadcrumb-item btn btn-link text-decoration-none"
              >
                Root
              </button>
              {currentFolderData?.data.path.map((folder, index) => (
                <button
                  key={index}
                  className="breadcrumb-item btn btn-link text-decoration-none"
                  onClick={() =>
                    handleNavigate(
                      `/dashboard/folder/${
                        userFolders.find((fldr) => folder === fldr.docId).docId
                      }`,
                      userFolders.find((fldr) => folder === fldr.docId).docId
                    )
                  }
                >
                  {userFolders.find((fldr) => folder === fldr.docId).data.name}
                </button>
              ))}
              <li className="breadcrumb-item active ">
                {currentFolderData?.data.name}
              </li>
            </>
          ) : (
            <>
              <li className="breadcrumb-item active">Root</li>
            </>
          )}
        </ol>
      </nav>

      <ul className="navbar-nav ms-auto me-5 ">
        <li className="nav-item mx-2">
          <button
            className="btn btn-outline-dark"
            onClick={() => setIsFileUploadModalOpen(true)}
          >
            <FontAwesomeIcon icon={faFileUpload} /> &nbsp; Upload File
          </button>
        </li>
        <li className="nav-item mx-2">
          <button
            className="btn btn-outline-dark"
            onClick={() => setIsCreateFileModalOpen(true)}
          >
            <FontAwesomeIcon icon={faFileAlt} /> &nbsp; Create File
          </button>
        </li>
        <li className="nav-item ms-2">
          <button
            className="btn btn-outline-dark"
            onClick={() => setIsCreateFolderModalOpen(true)}
          >
            <FontAwesomeIcon icon={faFolderPlus} /> &nbsp; Create Folder
          </button>
        </li>
      </ul>
    </nav>
  );
};
//   return (
//     <nav className="navbar navbar-expand-lg mt-2 navbar-light bg-white py-2">
//       <nav aria-label="breadcrumb">
//         <ol className="breadcrumb d-flex align-items-center">
//           {currentFolder !== "root" ? (
//             <>

//             </>
//           )}
//           <li className="breadcrumb-item ms-5">
//             <Link to="/dashboard">Root</Link>
//           </li>
//           <li className="breadcrumb-item active" aria-current="page">
//             New Folder
//           </li>
//         </ol>
//       </nav>

//       <ul className="navbar-nav ms-auto me-5">
//         <li className="nav-item mx-2">
//           <button className="btn btn-outline-dark ">
//             <FontAwesomeIcon icon={faFileUpload} /> &nbsp;Upload Files
//           </button>
//         </li>
//         <li className="nav-item mx-2">
//           <button className="btn btn-outline-dark">
//             <FontAwesomeIcon icon={faFileCirclePlus} /> &nbsp;Create Files
//           </button>
//         </li>
//         <li className="nav-item ms-2">
//           <button
//             className="btn btn-outline-dark"
//             onClick={() => setIsCreateFolderModalOpen(true)}
//           >
//             <FontAwesomeIcon icon={faFolderPlus} /> &nbsp;Create Folder
//           </button>
//         </li>
//         <li className="nav-item mx-2">
//           <button className="btn btn-outline-dark">
//             <FontAwesomeIcon icon={faSquareCaretUp} /> &nbsp;Upload Images
//           </button>
//         </li>
//       </ul>
//     </nav>
//   );
// };

export default SubBar;
