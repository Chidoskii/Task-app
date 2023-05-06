import { useEffect } from "react";
import { useGroupsContext } from "../hooks/useGroupContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import GroupDetails from "../components/groupDetails";
import GroupForm from "../components/groupForm";

const Groups = () => {
  const { groups, dispatch } = useGroupsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchGroups = async () => {
      const response = await fetch("https://slvnt-api.onrender.com/groups", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_GROUPS", payload: json });
      }
    };

    if (user) {
      fetchGroups();
    }
  }, [dispatch, user]);

  return (
    <div className="group">
      <div className="all-groups">
        {groups &&
          groups.map((group) => <GroupDetails key={group._id} group={group} />)}
      </div>
      <div>
        <GroupForm />
      </div>
    </div>
  );
};

export default Groups;
