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

const setChangeFolder = (payload) => ({
  type: types.CHANGE_FOLDER,
  payload,
});

// files creation

const addFiles = (payload) => ({
  type: types.ADD_FILES,
  payload,
});

const addFile = (payload) => ({
  type: types.CREATE_FILE,
  payload,
});

export const createFolder = (data) => (dispatch) => {
  fb.firestore()
    .collection("folders")
    .add(data)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data();
      const folderId = folder.id;
      dispatch(addFolder({ data: folderData, docId: folderId }));
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
      const foldersData = await folders.docs.map((folder) => ({
        data: folder.data(),
        docId: folder.id,
      }));
      dispatch(setLoading(false));
      dispatch(addFolders(foldersData));
      console.log(foldersData);
    });
};

export const changeFolder = (folderId) => (dispatch) => {
  dispatch(setChangeFolder(folderId));
};

// file actions

export const getFiles = (userId) => (dispatch) => {
  fb.firestore()
    .collection("files")
    .where("userId", "==", userId)
    .get()
    .then(async (files) => {
      const filesData = await files.docs.map((file) => ({
        data: file.data(),
        docId: file.id,
      }));

      dispatch(addFiles(filesData));
    });
};

export const createFile = (data, setSuccess) => (dispatch) => {
  fb.firestore()
    .collection("files")
    .add(data)
    .then(async (file) => {
      const fileData = await (await file.get()).data();
      const fileId = file.id;
      alert("File created successfully!");
      dispatch(addFile({ data: fileData, docId: fileId }));
      setSuccess(true);
    })
    .catch(() => {
      setSuccess(false);
    });
};
