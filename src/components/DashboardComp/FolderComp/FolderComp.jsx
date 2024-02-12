import { useParams } from "react-router-dom";

const FolderComp = () => {
  const { folderId } = useParams();
  return <div>FolderComp: {folderId}</div>;
};

export default FolderComp;
