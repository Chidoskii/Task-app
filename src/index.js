import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TasksContextProvider } from "./context/TaskContext";
import { GroupsContextProvider } from "./context/GroupContext";
import { AuthContextProvider } from "./context/authContext";
import { ArchivesContextProvider } from "./context/ArchiveContext";
import { disableReactDevTools } from "@fvilers/disable-react-devtools";

if (process.env.NODE_ENV === "production") disableReactDevTools();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ArchivesContextProvider>
        <TasksContextProvider>
          <GroupsContextProvider>
            <App />
          </GroupsContextProvider>
        </TasksContextProvider>
      </ArchivesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
