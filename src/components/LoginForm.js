import { React, useState } from "react";
import classes from "./LoginForm.module.css";
import Modal from "./Modal";

const isEmpty = (value) => value.trim() === "";

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [emailIsValid, setEmailIsValid] = useState(true);
  const [passIsValid, setPassIsValid] = useState(true);

  

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmailIsValid = !isEmpty(email);
    const enteredPassIsValid = !isEmpty(password);

    setEmailIsValid(enteredEmailIsValid);
    setPassIsValid(enteredPassIsValid);

    const formIsValid = enteredEmailIsValid && enteredPassIsValid;

    if (!formIsValid) {
      return;
    }

    props.loginInfo({
      email: email,
      password: password,
    });

    setEmail("");
    setPassword("");
  };

  return (
    <div>
      <form className={classes.form} onSubmit={submitHandler}>
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
          {!emailIsValid && <p>Enter valid Email</p>}
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
          <button type="submit">Login</button>
        </div>
        {props.isLoading && <p>Loading...</p>}
        <div className={classes.txt}>
          <p onClick={() => setOpenModal(true)}>Forget your password</p>
        </div>
      </form>

      {openModal && <Modal closeModal={setOpenModal} />}
    </div>
  );
};

export default LoginForm;
