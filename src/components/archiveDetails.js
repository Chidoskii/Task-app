import { useArchivesContext } from "../hooks/useArchiveContext";
import { useAuthContext } from "../hooks/useAuthContext";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const ArchiveDetails = ({ archive }) => {
  const { dispatch } = useArchivesContext();
  const { user } = useAuthContext();

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/tasks/completed" + archive._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_ARCHIVE", payload: json });
    }
  };

  return (
    <div className="archive-details">
      <h4> {archive.archiveName}</h4>
      <p>
        <strong>Description:&nbsp; </strong>
        {archive.description}
      </p>
      <p>
        <strong>Priority:&nbsp; </strong>
        {archive.priority}
      </p>
      <p>
        <strong>Progress:&nbsp; </strong>
        {archive.progress}
      </p>

      <p>
        <strong>Reported:&nbsp; </strong>
        {formatDistanceToNow(new Date(archive.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" onClick={handleClick}>
        remove
      </span>
    </div>
  );
};

export default ArchiveDetails;
