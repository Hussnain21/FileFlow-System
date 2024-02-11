import * as types from "../actions/elementsActions";
import { useDispatch } from "react-redux";

import fb from "../..//config/firebase";

const addFolder = (payload) => ({
  type: types.CREATE_FOLDER,
  payload,
});

const addFolders = (payload) => ({
  type: types.ADD_FOLDERS,
  payload,
});

const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload,
});

export const createFolder = (data) => (dispatch) => {
  fb.firestore()
    .collection("folders")
    .add(data)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data();
      dispatch(addFolder(folderData));
      alert("Folder created successfully");
    });
};

export const getFolders = (userId) => (dispatch) => {
  dispatch(setLoading(true));
  fb.firestore()
    .collection("folders")
    .where("userId", "==", userId)
    .get()
    .then(async (folders) => {
      const foldersData = await folders.docs.map((folder) => folder.data());
      dispatch(setLoading(false));
      dispatch(addFolder(foldersData));
    });
};
