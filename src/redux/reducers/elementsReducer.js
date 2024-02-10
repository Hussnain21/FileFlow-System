import * as types from "../actions/elementsActions";

const initialState = {
  isLoading: false,
  selectedFolder: "root",
  userFolders: [],
  userFiles: [],
  adminFolders: [],
  adminFiles: [],
};

const elementsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_FOLDER:
      return {
        ...state,
        userFolders: [...state.userFolders, action.payload],
      };
    default:
      return state;
  }
};

export default elementsReducer;
