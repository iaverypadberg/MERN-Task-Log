import { UserContext } from "../context/UserContext";
import { useContext, useState } from "react";
import { atom, useAtom } from "jotai";
import axios from "axios";

const sendTaskData = async (inputData, config) => {
  const { data } = await axios({
    method: "POST",
    data: inputData,
    url: "http://localhost:8080/tasks/addtask",
    headers: { Authorization: `${config.headers.Authorization}` },
  });
  return data;
};

// Use jotai to manage state of tasks
export const manageTasks = atom([]);

const AddTask = () => {
  const [tasks, setTasks] = useAtom(manageTasks);
  const [userContext, setUserContext] = useContext(UserContext);
  const [name, setName] = useState("");
  const [day, setDay] = useState("");
  const [importance, setImportance] = useState("");

  const config = {
    withCredentials: true,
    headers: { Authorization: `Bearer ${userContext.token}` },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    //console.log("Token: " + userContext.token);

    if (!name) {
      alert("Please add a task");
      return;
    }
    const data = { name: name, day: day, importance: importance };
    const response = await sendTaskData(data, config);
    setName("");
    setDay("");
    setImportance("");
    setTasks([...tasks, data]);
  };

  return (
    // <form className= "grid justify-items-center border-2 border-indigo-600 mt-1" onSubmit={onSubmit}>
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className=" mt-8 bg-secondary py-8 px-4 shadow rounded-lg sm:px-10 sm:mx-auto sm:w-full sm:max-w-md">
      <form
        className="space-y-6"
        onSubmit={onSubmit}
      >
        <div>
          <label className="text-lg font-medium text-primary"> Task </label>
          <div className="mt-2">
            <input
              className="border-2 border-light focus:outline-none rounded-md"
              type="text"
              placeholder="Add Task"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="text-lg  justify-center font-medium text-primary">
            {" "}
            Day{" "}
          </label>
          <div className="mt-2">
            <input
              className="border-2 border-light focus:outline-none rounded-md"
              type="text"
              placeholder="Add Day"
              value={day}
              onChange={(e) => setDay(e.target.value)}
            />
          </div>
        </div>
        <div>
          <label className="text-lg  justify-center font-medium text-primary">
            {" "}
            Importance{" "}
          </label>
          <div className="mt-2">
            <input
              className="border-2 border-light focus:outline-none rounded-md"
              type="number"
              placeholder="Set Importance of Task"
              value={importance}
              onChange={(e) => setImportance(e.target.value)}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className=" mt-2 inline-flex items-center px-3 py-2  border-transparent text-sm leading-4 font-medium rounded-md text-red bg-lightest hover:light "
          >
            Submit
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default AddTask;
