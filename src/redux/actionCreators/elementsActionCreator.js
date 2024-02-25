import * as types from "../actions/elementsActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

import fb from "../..//config/firebase";
import { saveAs } from "file-saver";

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

const setFileData = (payload) => ({
  type: types.SET_FILE_DATA,
  payload,
});

const deleteFileAction = (payload) => ({
  type: types.DELETE_FILE,
  payload,
});

export const deleteFolderAction = (folderId) => ({
  type: types.DELETE_FOLDER,
  payload: {
    folderId: folderId,
  },
});

export const createFolder = (data) => (dispatch) => {
  fb.firestore()
    .collection("folders")
    .add(data)
    .then(async (folder) => {
      const folderData = await (await folder.get()).data();
      const folderId = folder.id;
      dispatch(addFolder({ data: folderData, docId: folderId }));
      toast.success("Folder created successfully");
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
      toast.success("File created successfully!");
      dispatch(addFile({ data: fileData, docId: fileId }));
      setSuccess(true);
    })
    .catch(() => {
      setSuccess(false);
    });
};

export const updateFileData = (fileId, data) => (dispatch) => {
  fb.firestore()
    .collection("files")
    .doc(fileId)
    .update({ data })
    .then(() => {
      dispatch(setFileData({ fileId, data }));
      toast.success("File updated successfully");
    })
    .catch(() => {
      toast.error("Something went wrong!");
    });
};

export const uploadFile = (file, data, setSuccess) => (dispatch) => {
  const uploadFileRef = fb.storage().ref(`files/${data.userId}/${data.name}`);
  uploadFileRef.put(file).on(
    "state_changed",
    (snapshot) => {
      const progressBar = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      console.log("uploading" + progressBar + "%");
    },
    (error) => {
      console.log(error);
    },
    async () => {
      const fileUrl = await uploadFileRef.getDownloadURL();
      const fullData = { ...data, url: fileUrl };
      fb.firestore()
        .collection("files")
        .add(fullData)
        .then(async (file) => {
          const fileData = await (await file.get()).data();
          const fileId = file.id;
          dispatch(addFile({ data: fileData, docId: fileId }));
          toast.success("Your file uploaded successfully!");
          setSuccess(true);
        })
        .catch(() => {
          setSuccess(false);
        });
    }
  );
};

export const deleteFile = (fileId) => (dispatch) => {
  fb.firestore()
    .collection("files")
    .doc(fileId)
    .delete()
    .then(() => {
      dispatch(deleteFileAction({ fileId }));
      toast.success("File deleted successfully");
    })
    .catch(() => {
      toast.error("Something went wrong while deleting the file");
    });
};

// Function to download a single file
const downloadFile = async (fileData) => {
  const fileRef = fb.storage().ref(fileData.url);
  const fileBlob = await fileRef.getDownloadURL();
  saveAs(fileBlob, fileData.name);
};

const downloadFolder = async (folder) => {
  for (const file of folder.userFiles) {
    await downloadFile(file.data);
  }

  for (const subfolder of folder.userFolders) {
    await downloadFolder(subfolder);
  }
};

export const deleteFolder = (folderId) => (dispatch) => {
  fb.firestore()
    .collection("folders")
    .doc(folderId)
    .delete()
    .then(() => {
      dispatch(deleteFolderAction(folderId));
      toast.success("Folder deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting folder:", error);
      toast.error("Failed to delete folder");
    });
};
