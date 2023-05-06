import { useTasksContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";
import PriorityController from "../components/priorityController";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const TaskDetails = ({ task }) => {
  const { dispatch } = useTasksContext();
  const { user } = useAuthContext();
  const { level, color } = PriorityController(task.priority);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/tasks/" + task._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_TASK", payload: json });
    }
  };

  return (
    <div className="task-details">
      <h4> {task.taskName}</h4>
      <p>
        <strong>Description:&nbsp; </strong>
        {task.description}
      </p>
      <p>
        <strong>Priority:&nbsp; </strong>
        <strong className="priors" style={{ color: color }}>
          {level}
        </strong>
      </p>
      <p>
        <strong>Progress:&nbsp; </strong>
        {task.progress}
      </p>

      <p>
        <strong>Reported:&nbsp; </strong>
        {formatDistanceToNow(new Date(task.createdAt), { addSuffix: true })}
      </p>
      <span className="material-symbols-outlined" id="arch">
        archive
      </span>
      <span className="material-symbols-outlined" onClick={handleClick}>
        remove
      </span>
    </div>
  );
};

export default TaskDetails;
