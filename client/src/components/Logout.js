import React from "react";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { atom, useAtom } from "jotai";
import { managePage } from "../App";
import { Link, useHistory } from "react-router-dom";

const Logout = () => {
  let history = useHistory();
  const [userContext, setUserContext] = useContext(UserContext);

  const logoutHandler = () => {
    fetch("http://localhost:8080/users/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userContext.token}`,
      },
    }).then(async (response) => {
      setUserContext((oldValues) => {
        return { ...oldValues, details: undefined, token: null };
      });
      window.localStorage.setItem("logout", Date.now());
    });
  };

  return (
    <div>
      <Link to="/login">
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          intent="primary"
          text={"Logout"}
          onClick={logoutHandler}
          fill
          type="submit"
        >
          Logout
        </button>
      </Link>
    </div>
  );
};

export default Logout;
