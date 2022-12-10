import React, { useState } from "react";
import classes from "./SignupForm.module.css";

const isEmpty = (value) => value.trim() === "";

const SignupForm = (props) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passIsValid, setPassIsValid] = useState(true);
  const [usernameIsValid, setUsernameIsValid] = useState(true);

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmailIsValid = !isEmpty(email);
    const enteredPassIsValid = !isEmpty(password);
    const enteredUsenameIsValid = !isEmpty(username);

    setEmailIsValid(enteredEmailIsValid);
    setPassIsValid(enteredPassIsValid);
    setUsernameIsValid(enteredUsenameIsValid);

    const formIsValid =
      enteredEmailIsValid && enteredPassIsValid && enteredUsenameIsValid;

    if (!formIsValid) {
      return;
    }

    props.signupInfo({
      username: username,
      email: email,
      password: password,
    });

    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <form className={classes.form} onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            usernameIsValid ? "" : classes.invalid
          }`}
        >
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          {!usernameIsValid && <p>Enter Username</p>}
        </div>
        <div
          className={`${classes.control} ${
            emailIsValid ? "" : classes.invalid
          }`}
        >
          <input
            type="text"
            name="email"
            placeholder="Email or Username"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          {!emailIsValid && <p>Enter a valid Email</p>}
        </div>

        <div
          className={`${classes.control} ${passIsValid ? "" : classes.invalid}`}
        >
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {!passIsValid && <p>Enter valid Password</p>}
        </div>
        <div className={classes.actions}>
          <button type="submit">SignUp</button>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
