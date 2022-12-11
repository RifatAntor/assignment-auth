import React, { useState } from "react";
import classes from "./Modal.module.css";

const isEmpty = (value) => value.trim() === "";

const Modal = (props) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(false);
  const [emailIsValid, setEmailIsValid] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmailIsValid = !isEmpty(email);

    setEmailIsValid(enteredEmailIsValid);

    if (!enteredEmailIsValid) {
      return;
    }

    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCl5iuFUssbM3CmcxkKGIN_q0Zy_jWd97I",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          requestType: "PASSWORD_RESET",
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          setMessage(true);
        } else {
          return res.json().then((data) => {
            let errMessage = "Something went wrong";
            if (data && data.error && data.error.message) {
              errMessage = data.error.message;
              throw new Error(errMessage);
            }
          });
        }
      })
      .catch((err) => alert(err.message));
  };

  return (
    <div className={classes.modalBackground}>
      <div className={classes.modalContainer}>
        <div>
          <div className={classes.titleCloseBtn}>
            <button onClick={() => props.closeModal(false)}>X</button>
          </div>
          <h3>Password Recovery</h3>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div
              className={`${classes.control} ${
                emailIsValid ? "" : classes.invalid
              }`}
            >
              <input
                type="text"
                placeholder="Enter Email or Username Here"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              {!emailIsValid && <p>Enter valid Email</p>}
            </div>
            <div className={classes.actions}>
              <button>Submit</button>
            </div>
            <div>
              {message && (
                <p>An email has been sent to you with further instructions</p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Modal;
