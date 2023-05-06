import { createContext, useReducer } from "react";

export const ArchivesContext = createContext();

export const archivesReducer = (state, action) => {
  switch (action.type) {
    case "SET_ARCHIVES":
      return {
        archives: action.payload,
      };
    case "CREATE_ARCHIVE":
      return {
        archives: [action.payload, ...state.archives],
      };
    case "DELETE_ARCHIVE":
      return {
        archives: state.archives.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const ArchivesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(archivesReducer, {
    archives: null,
  });

  return (
    <ArchivesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ArchivesContext.Provider>
  );
};
