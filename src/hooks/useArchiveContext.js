import { ArchivesContext } from "../context/ArchiveContext";
import { useContext } from "react";

export const useArchivesContext = () => {
  const context = useContext(ArchivesContext);

  if (!context) {
    throw Error(
      "useArchivesContext must be used inside a ArchivesContextProvider"
    );
  }

  return context;
};
