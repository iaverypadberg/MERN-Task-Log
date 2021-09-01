import React, { useContext } from "react";
import PrivateRoutes from "./PrivateRoutes";
import PublicRoutes from "./PublicRoutes";
import { UserContext } from "./context/UserContext";
import axios from "axios";
axios.defaults.withCredentials = true;

const Routes = () => {
  const [userContext, setUserContext] = useContext(UserContext);

  return userContext.token === null ? <PublicRoutes /> : <PrivateRoutes />;
};

export default Routes;
