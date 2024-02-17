import "./Elements.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { changeFolder } from "../../../redux/actionCreators/elementsActionCreator";

const Elements = ({ title, elements, type }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDblClick = (itemId) => {
    if (type == "folder") {
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
        {elements.map((item, index) => {
          return (
            <p
              key={index * 55}
              className="col-md-2 p-3 text-center d-flex flex-column border"
              onDoubleClick={() => handleDblClick(item.docId)}
            >
              {type == "folder" ? (
                <FontAwesomeIcon icon={faFolder} size="3x" className="mb-2" />
              ) : (
                <FontAwesomeIcon icon={faFileAlt} size="3x" className="mb-2" />
              )}
              {item.data && item.data.name ? item.data.name : "No Name"}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Elements;
