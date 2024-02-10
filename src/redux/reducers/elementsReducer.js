const initialState = {
  isLoading: false,
  selectedFolder: "",
  userFolders: [],
  userFiles: [],
  adminFolders: [],
  adminFiles: [],
};

const elementsReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default elementsReducer;
