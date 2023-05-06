import { useState } from "react";
import { useTasksContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

const TaskForm = () => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();

  const [taskName, setTaskname] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [progress, setProgress] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const task = {
      taskName,
      description,
      priority,
      progress,
      error,
    };

    const response = await fetch("/tasks", {
      method: "POST",
      body: JSON.stringify(task),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTaskname("");
      setDescription("");
      setPriority("");
      setProgress("");
      setEmptyFields([]);
      setError(null);
      console.log("new task added", json);
      dispatch({ type: "CREATE_TASK", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Task</h3>

      <label>Task Name:</label>
      <input
        type="text"
        onChange={(e) => setTaskname(e.target.value)}
        value={taskName}
        className={emptyFields.includes("taskName") ? "error" : ""}
      />

      <label>Description:</label>
      <input
        type="text"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />

      <label>Priority:</label>
      <select
        type="number"
        onChange={(e) => setPriority(e.target.value)}
        value={priority}
        className={emptyFields.includes("priority") ? "error" : ""}
      >
        <option disabled={true} value={""}>
          -- Priority Level --
        </option>
        <option value={1}>Low</option>
        <option value={2}>Medium</option>
        <option value={3}>High</option>
      </select>

      <label>Progress:</label>
      <select
        type="text"
        onChange={(e) => setProgress(e.target.value)}
        value={progress}
        className={emptyFields.includes("progress") ? "error" : ""}
      >
        <option disabled={true} value={""}>
          -- Select an Option --
        </option>
        <option value={"Pending"}>Not Started</option>
        <option value={"In Progress"}>Working on it</option>
        <option value={"Complete"}>Finished</option>
        <option value={"Suspended"}>Taking a break</option>
        <option value={"Terminated"}>I give up!</option>
      </select>

      <button>Add Task</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default TaskForm;
