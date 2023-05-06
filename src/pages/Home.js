import { useEffect } from "react";
import { useTasksContext } from "../hooks/useTaskContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import TaskDetails from "../components/taskDetails";
import TaskForm from "../components/taskForm";

const Home = () => {
  const { tasks, dispatch } = useTasksContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/tasks", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TASKS", payload: json });
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [dispatch, user]);

  return (
    <div className="home">
      <div className="tasks">
        {tasks &&
          tasks.map((task) => <TaskDetails key={task._id} task={task} />)}
      </div>
      <div>
        <TaskForm />
      </div>
    </div>
  );
};

export default Home;
