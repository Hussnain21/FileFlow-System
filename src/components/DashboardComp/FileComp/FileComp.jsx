import Header from "./Header";

import { useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";

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
      FileComp: {JSON.stringify(openedFile)}
    </div>
  );
};

export default FileComp;
