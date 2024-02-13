import { createSelector } from "reselect";

const getUserFolders = (state) => state.elements.userFolders;

const getRootUserFolders = createSelector([getUserFolders], (userFolders) =>
  userFolders.filter((folder) => folder.data && folder.data.parent === "root")
);

export default getRootUserFolders;
