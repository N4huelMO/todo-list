import { useState, useEffect } from "react";
import Task from "./components/Task";
import Alert from "./components/Alert";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  const [error, setError] = useState(false);
  const [idTask, setIdTask] = useState("");

  useEffect(() => {
    const getTasks = () => {
      const tasksLS = JSON.parse(localStorage.getItem("tasks"));
      if (tasksLS) {
        setTasks(tasksLS);
      }
    };

    getTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks)) ?? [];
  }, [tasks]);

  const generateID = () => {
    const random = Math.random().toString(36).substring(2);
    const date = Date.now().toString(36);

    return random + date;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (task === "") {
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 4000);
      return;
    }

    if (idTask) {
      const updateTask = tasks.map((taskState) =>
        taskState.id === idTask ? { content: task, id: idTask } : taskState
      );

      setTasks(updateTask);

      setIdTask("");
    } else {
      const taskObject = {
        content: task,
        id: generateID(),
      };

      setTasks([...tasks, taskObject]);
    }

    setTask("");
  };

  const deleteTask = (id) => {
    const updateTasks = tasks.filter((task) => task.id !== id);

    setTasks(updateTasks);
  };

  const editTask = (task) => {
    const { content, id } = task;

    setTask(content);
    setIdTask(id);
  };

  return (
    <div className="md:w-1/2 mt-20 mx-auto">
      <div>
        <h1 className="text-center text-4xl font-semibold">To-Do List</h1>
      </div>

      <div className="flex flex-col items-center mt-8">
        {error ? <Alert msg={"Enter a valid task"} /> : null}

        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col md:flex-row items-center"
          >
            <input
              type="text"
              placeholder="Enter task"
              className="border border-black rounded-sm p-1 mr-2 w-80 md:w-96"
              value={task}
              onChange={(e) => {
                setTask(e.target.value);
              }}
            />

            <button className="bg-sky-700 py-1 px-3 rounded-sm text-white mt-3 md:mt-0 w-4/5 md:w-1/2 hover:bg-sky-800">
              {idTask ? "Edit To-Do" : "Create To-Do"}
            </button>
          </form>
        </div>

        <div className="md:w-full w-4/5 mt-10">
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              deleteTask={deleteTask}
              editTask={editTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
