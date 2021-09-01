import Routes from "./Routes";
import React, { useContext } from "react";
import { UserContext } from "./context/UserContext";
import axios from "axios";
import { useQuery } from "react-query";
import { BrowserRouter as Router, Switch } from "react-router-dom";

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
  console.trace({ data });
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
    onError: (status) => setUserContext({ token: null }),
    onSuccess: (data) =>
      setUserContext(
        { token: data.token },
        console.log("NEW TOKEN: " + data.token)
      ),
  });

  // console.trace(userContext.token);
  return (
    <Router>
      <Switch>
        <Routes />
      </Switch>
    </Router>
  );
}
export default App;
