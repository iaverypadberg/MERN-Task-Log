import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { atom, useAtom } from "jotai";
import { manageLoginPage } from "../PublicRoutes";
import { Link } from "react-router-dom";

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  // Icon http://www.w3.org/2000/svg
  const formSubmitHandler = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const data = {
      firstName: firstName,
      lastName: lastName,
      username: email,
      password: password,
    };

    const genericErrorMessage = "Something went wrong! Please try again later.";

    axios
      .post("http://localhost:8080/users/signup", data)
      .then(async (response) => {
        setIsSubmitting(false);
        if (!response.statusText === "OK") {
          if (response.status === 400) {
            setError("Please fill all the fields correctly!");
          } else if (response.status === 401) {
            setError("Invalid email and password combination.");
          } else if (response.status === 500) {
            console.log(response);
            const data = response.data;
            if (data.message) setError(data.message || genericErrorMessage);
          } else {
            setError(genericErrorMessage);
          }
        } else {
          const data = response.data;
          console.log("Success");
          console.log(data);
          setUserContext((oldValues) => {
            return { ...oldValues, token: data.token };
          });
        }
      })
      .catch((error) => {
        setIsSubmitting(false);
        setError(genericErrorMessage);
      });
  };


  return (
    <>
      {error && <Callout intent="danger">{error}</Callout>}

      <div className="min-h-screen bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
            alt="Workflow"
          />
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-grey-900 py-8 px-4 sm:rounded-lg sm:px-10">
            <form onSubmit={formSubmitHandler} className="space-y-6">
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-white"
                >
                  First Name
                </label>
                <div className="mt-1">
                  <input
                    id="firstName"
                    placeholder="Fist Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    className="apprearance-none block w-full px-3 py-2 border border-ingigo-600 rounded-md shadow-lg placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="text"
                  className="block text-sm font-medium text-white"
                >
                  Last Name
                </label>

                <div className="mt-1">
                  <input
                    id="lastName"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    className="apprearance-none block w-full px-3 py-2 border border-ingigo-600 rounded-md shadow-lg placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    className="apprearance-none block w-full px-3 py-2 border border-ingigo-600 rounded-md shadow-lg placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-white"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    placeholder="Password"
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-white"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  intent="primary"
                  disabled={isSubmitting}
                  text={`${isSubmitting ? "Signing In" : "Sign In"}`}
                  fill
                  type="submit"
                >
                  Register
                </button>
              </div>

              <div>
                <Link to="/login">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    intent="primary"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
