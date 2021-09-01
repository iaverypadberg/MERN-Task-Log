// ./PublicRoute.jsx

import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { atom, useAtom } from "jotai";
import { LightningBoltIcon } from "@heroicons/react/solid";
import PrivateRoutes from "./PrivateRoutes";

export const manageLoginPage = atom("login");

const PublicRoutes = () => {
  return (
    <>
      <Route path="/login">
        <Login />
      </Route>

      <Route path="/register">
        <Register />
      </Route>

      <Route path="/nothing">
        <LightningBoltIcon className="bg-contain bg-center" />
      </Route>
    </>
  );
};

export default PublicRoutes;
