import { Button, Callout, FormGroup, InputGroup } from "@blueprintjs/core";
import React, { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";

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

      <form onSubmit={formSubmitHandler} className="auth-form">
        <FormGroup label="First Name" labelFor="firstName">
          <InputGroup
            id="firstName"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
        </FormGroup>
        <FormGroup label="Last Name" labelFor="firstName">
          <InputGroup
            id="lastName"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
            value={lastName}
          />
        </FormGroup>
        <FormGroup label="Email" labelFor="email">
          <InputGroup
            id="email"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </FormGroup>
        <FormGroup label="Password" labelFor="password">
          <InputGroup
            id="password"
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </FormGroup>
        <Button
          intent="primary"
          disabled={isSubmitting}
          text={`${isSubmitting ? "Registering" : "Register"}`}
          fill
          type="submit"
        />
      </form>
    </>
  );
};

export default Register;
