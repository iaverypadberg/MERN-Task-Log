/* This example requires Tailwind CSS v2.0+ */
import { DotsVerticalIcon } from "@heroicons/react/solid";

import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { atom, useAtom } from "jotai";
import { manageTasks } from "./AddTask";
import { FaTimes } from "react-icons";
import Loader from "./Loader";
import axios from "axios";

// Request functions
const fetchTasks = async (token) => {
  const res = await axios({
    url: "http://localhost:8080/tasks/tasks",
    method: "GET",
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.data;
  return data;
};

const deleteTask = async (taskId, token) => {
  const res = await axios({
    url: "http://localhost:8080/tasks/delete",
    method: "DELETE",
    data: { id: taskId },
    headers: { Authorization: `Bearer ${token}` },
  });
  const data = await res.data;
  return data;
};

// Tasks main react function
const Tasks = () => {
  const [tasks, setTasks] = useAtom(manageTasks);
  const [userContext, setUserContext] = useContext(UserContext);
  const token = userContext.token;
  const { data, status } = useQuery(["tasks", token], () => fetchTasks(token), {
    staleTime: 2000,
    retry: 1,
    refetchOnMount: true,
    onError: () => {
      console.log("Some Error... IDK?");
    },
    onSuccess: async (data) => {
      await setTasks([...data]);
    },
  });

  const onDelete = (taskId) => {
    const deletedTask = deleteTask(taskId, token);
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <div>
      {status === "loading" && <div>Loading Data...</div>}

      {status === "error" && <div>Errer Fetching Data</div>}
      {status === "success" && (
        <div className="grid justify-items-center">
          <h2 className="text-primary text-lg font-medium uppercase justify-center">
            All Tasks
          </h2>
          <ul
            role="list"
            className="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {tasks.map((task) => (
              <li
                key={task.id}
                className="col-span-1 flex shadow-sm rounded-md"
              >
                <div
                  className={
                    "flex-shrink-0  bg-second flex items-center justify-center w-16 text-light text-sm font-medium rounded-l-md"
                  }
                >
                  {task.name[0] + task.day[0]}
                </div>
                <div className="flex-1 flex items-center justify-between border-t border-r border-b border-lightest bg-white rounded-r-md truncate">
                  <div className="flex-4 bg-lightest px-6 py-2 text-sm truncate">

                    <p className="text-second text-lg">{task.name}</p>
                    <p className="text-second">{task.day}</p>
                    <p className="text-second">Importance: {task.importance}</p>

                    <div className="flex-shrink-0 pr-2 text-sm">
              
                    <button
                      type="button"
                      className="inline-flex items-center px-2.5 py-1.5  text-xs font-medium rounded shadow-sm text-white bg-light hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => {
                        onDelete(task._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  
                  
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Tasks;
