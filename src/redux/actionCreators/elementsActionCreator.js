import * as types from "../actions/elementsActions";
import { useDispatch } from "react-redux";

import fb from "../..//config/firebase";

const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

export const createFolder = (data) => (dispatch) => {
  fb.firestore()
    .collection("folders")
    .add(data)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data();
      dispatch(addFolder(folderData));
      alert("Folder create successfully");
    });
};
