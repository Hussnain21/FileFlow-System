import Header from "./Header";

import { useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import FileEditor from "./FileEditor";

const FileComp = () => {
  const { fileId } = useParams();
  const { openedFile } = useSelector(
    (state) => ({
      openedFile: state.elements.userFiles.find(
        (file) => file.docId === fileId
      ),
    }),
    shallowEqual
  );

  return (
    <div>
      <Header fileName={openedFile.data.name} />
      <FileEditor fileName={openedFile.data.name} />
    </div>
  );
};

export default FileComp;
