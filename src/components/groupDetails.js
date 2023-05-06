import { useGroupsContext } from "../hooks/useGroupContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const GroupDetails = ({ group }) => {
  const { dispatch } = useGroupsContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/groups/" + group._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_GROUP", payload: json });
    }
  };

  return (
    <div className="group-details">
      <h4> {group.groupName}</h4>
      <p>
        <strong>Affiliation:&nbsp; </strong>
        {group.company}
      </p>

      <p>
        <strong>Created:&nbsp; </strong>
        {formatDistanceToNow(new Date(group.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        remove
      </span>
    </div>
  );
};

export default GroupDetails;
