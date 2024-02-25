import * as types from "../actions/elementsActions";

const initialState = {
  isLoading: true,
  currentFolder: "root",
  userFolders: [],
  userFiles: [],
  adminFolders: [],
  adminFiles: [],
  folders: [],
};

const deleteFolderRecursively = (allFolders, folderIdToDelete) => {
  const updatedFolders = [];
  for (const folder of allFolders) {
    if (folder.docId === folderIdToDelete) {
      continue;
    }

    if (folder.data.parentId === folderIdToDelete) {
      continue;
    }

    if (folder.data.parentId && folder.data.parentId === folderIdToDelete) {
      const updatedSubfolder = {
        ...folder,
        data: {
          ...folder.data,
          parentId: null,
        },
      };
      updatedFolders.push(
        updatedSubfolder,
        ...deleteFolderRecursively(allFolders, folder.docId)
      );
    } else {
      updatedFolders.push(folder);
    }
  }
  return updatedFolders;
};

const elementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_FOLDER:
      return {
        ...state,
        userFolders: [...state.userFolders, action.payload],
      };
    case types.ADD_FOLDERS:
      return {
        ...state,
        userFolders: action.payload,
      };
    case types.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case types.CHANGE_FOLDER:
      return {
        ...state,
        currentFolder: action.payload,
      };

    case types.ADD_FILES:
      return {
        ...state,
        userFiles: action.payload,
      };

    case types.CREATE_FILE:
      return {
        ...state,
        userFiles: [...state.userFiles, action.payload],
      };

    case types.SET_FILE_DATA:
      const { fileId, data } = action.payload;
      const allFiles = state.userFiles;
      const openedFile = allFiles.find((file) => file.docId === fileId);
      openedFile.data.data = data;
      return {
        ...state,
        userFiles: state.userFiles.map((file) =>
          file.docId === fileId ? openedFile : file
        ),
      };

    case types.DELETE_FILE:
      const fileIdToDelete = action.payload.fileId;
      return {
        ...state,
        userFiles: state.userFiles.filter(
          (file) => file.docId !== fileIdToDelete
        ),
      };

    case types.DELETE_FOLDER:
      const folderIdToDelete = action.payload.folderId;
      const updatedUserFolders = deleteFolderRecursively(
        state.userFolders,
        folderIdToDelete
      );

      return {
        ...state,
        userFolders: updatedUserFolders,
      };

    default:
      return state;
  }
};

export default elementsReducer;
