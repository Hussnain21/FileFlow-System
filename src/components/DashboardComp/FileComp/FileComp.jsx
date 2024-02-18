import Header from "./Header";

import { useParams } from "react-router-dom";
import { shallowEqual, useSelector } from "react-redux";
import FileEditor from "./FileEditor";
import { useState, useEffect } from "react";

const FileComp = () => {
  const { fileId } = useParams();
  const [fileData, setFileData] = useState("");
  const [prevFileData, setPrevFileData] = useState("");

  const { openedFile } = useSelector(
    (state) => ({
      openedFile: state.elements.userFiles.find(
        (file) => file.docId === fileId
      ),
    }),
    shallowEqual
  );

  useEffect(() => {
    if (openedFile) {
      setFileData(openedFile.data.data);
      setPrevFileData(openedFile.data.data);
    }
  }, [openedFile, openedFile.data.data]);

  return (
    <div>
      <Header
        fileName={openedFile.data.name}
        fileData={fileData}
        prevFileData={prevFileData}
        fileId={fileId}
      />
      <FileEditor
        fileName={openedFile.data.name}
        data={fileData}
        setData={setFileData}
      />
    </div>
  );
};

export default FileComp;
