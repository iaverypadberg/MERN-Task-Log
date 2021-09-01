// ./PrivateRoute.jsx

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
import Profile from "./components/Profile";
import Logout from "./components/Logout";
import Nav from "./components/Nav";
import Login from "./components/Login";
import { LightningBoltIcon } from "@heroicons/react/solid";

const PrivateRoutes = () => {
  return (
      <div className="app">
        <Nav />
        <div className="content">
            <Route path="/addTask">
              <AddTask />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/tasks">
              <Tasks />
            </Route>

            <Route path="/logout">
              <Logout />
            </Route>

            <Route path="/home">
              <LightningBoltIcon className="bg-contain bg-center" />
            </Route>

            <Route path="/login">
              <Login />
            </Route>

        </div>
      </div>

  );
};

export default PrivateRoutes;
