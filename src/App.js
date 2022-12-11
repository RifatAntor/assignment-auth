import React, { useState } from "react";
import "./App.css";

import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";

function App() {
  const [switchMode, setSwitchMode] = useState(true);

  const login = ({ email, password }) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCl5iuFUssbM3CmcxkKGIN_q0Zy_jWd97I",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("Login Successfull");
        } else {
          return res.json().then((data) => {
            let errMessage = "Login Failed";
            if (data && data.error && data.error.message) {
              errMessage = data.error.message;
              throw new Error(errMessage);
            }
          });
        }
      })
      .catch((err) => alert(err.message));
  };
  const signup = ({ email, password }) => {
    fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCl5iuFUssbM3CmcxkKGIN_q0Zy_jWd97I",
      {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true,
        }),
        headers: {
          "content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          alert("Authentication Success");
        } else {
          return res.json().then((data) => {
            let errMessage = "Authentication Failed";
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
    <div className="App">
      <div className="buttons">
        <button onClick={() => setSwitchMode(true)}>Login</button>
        <button onClick={() => setSwitchMode(false)}>SignUp</button>
      </div>

      {switchMode && <LoginForm loginInfo={login} />}
      {!switchMode && <SignupForm signupInfo={signup} />}
    </div>
  );
}

export default App;
