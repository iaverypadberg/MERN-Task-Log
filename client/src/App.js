import { Card, Tab, Tabs } from "@blueprintjs/core";
import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import Nav from "./components/Nav"
import Login from "./components/Login"
import Loader from "./components/Loader";
import Register from "./components/Register";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import axios from "axios";
import { useQuery } from "react-query";
import {atom, useAtom} from 'jotai'

import { BrowserRouter as Router, Route, Switch} from "react-router-dom"
import { LightningBoltIcon } from "@heroicons/react/outline";
axios.defaults.withCredentials = true;


const verifyUser = async () => {
  const submitData = {
    method: "POST",
    withCredentials: true,
    headers: { "Content-Type": "application/json" },
  };
  const res = await axios.post(
    "http://localhost:8080/users/refreshToken",
    submitData
  );
  const data = await res.data;
  return data;
};

function App() {
  const [userContext, setUserContext] = useContext(UserContext);
  const { data, status } = useQuery(["verifyUser"], verifyUser, {
    staleTime: 60 * 1000, //Five minutes until the refresh of the token
    retry: 1,
    refetchOnMount: false,
    // refetchInterval:10*1000 * 5,
    // onSuccess:(data)=>{console.log("NEW TOKEN: " + data.token)},
    onError: () => setUserContext({ token: null }),
    onSuccess: (data) =>
      setUserContext(
        { token: data.token },
        console.log("NEW TOKEN: " + data.token)
      ),
  });

  return userContext.token === null ? (<Login/>) :(
  <Router>
    <div className="app">
      <Nav/>
      <div className="content">
        <Switch>
          <Route path="/profile">
            <Profile/>
          </Route>

          <Route path="/addTask">
            <AddTask/>
          </Route>

          <Route path="/tasks">
            <Tasks/>
          </Route>

          <Route path="/logout">
            <Logout/>
          </Route>

          <Route path="/login">
            <LightningBoltIcon className="bg-contain bg-center"/>
          </Route>

        </Switch>
      </div>
    </div>
  </Router>
  )
}

export default App;
