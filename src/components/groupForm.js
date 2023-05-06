import { useState } from "react";
import { useGroupsContext } from "../hooks/useGroupContext";
import { useAuthContext } from "../hooks/useAuthContext";

const GroupForm = () => {
  const { dispatch } = useGroupsContext();
  const { user } = useAuthContext();

  const [groupName, setGroupname] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const group = {
      groupName,
      company,
      error,
    };

    const response = await fetch("/groups", {
      method: "POST",
      body: JSON.stringify(group),
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
      setGroupname("");
      setCompany("");
      setEmptyFields([]);
      setError(null);
      console.log("new group added", json);
      dispatch({ type: "CREATE_GROUP", payload: json });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Group</h3>

      <label>Group Name:</label>
      <input
        type="text"
        onChange={(e) => setGroupname(e.target.value)}
        value={groupName}
        className={emptyFields.includes("groupName") ? "error" : ""}
      />

      <label>Affiliation:</label>
      <input
        type="text"
        onChange={(e) => setCompany(e.target.value)}
        value={company}
        className={emptyFields.includes("company") ? "error" : ""}
      />

      <button>Add Group</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default GroupForm;
