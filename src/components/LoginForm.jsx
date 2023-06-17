import React, { useState } from "react";
import { Alert, Button, ButtonToolbar } from "rsuite";
import { auth, database } from "../misc/firebase";
import firebase from "firebase/app";

function LoginForm() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [userName, setUserName] = useState();

  const handleEmailPasswordLogin = async (email, password, userName) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);

      Alert.success("Signed in", 4000);
    } catch {
      console.log(email, password);
      const { additionalUserInfo, user } =
        await auth.createUserWithEmailAndPassword(email, password);
      if (additionalUserInfo.isNewUser) {
        await database.ref(`/profiles/${user.uid}`).set({
          name: userName,
          email: user.email,
          password: password,
          createdAt: firebase.database.ServerValue.TIMESTAMP,
        });
      }
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    handleEmailPasswordLogin(email, password, userName);
  };

  return (
    <form
      className="mt-3"
      onSubmit={handleLogin}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1em",
      }}
    >
      <label
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
        }}
      >
        Username
        <input
          style={{ width: "100%", padding: "0.5em" }}
          placeholder="Enter username"
          type="text"
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          required
        />
      </label>
      <label
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
        }}
      >
        Email
        <input
          style={{ width: "100%" }}
          placeholder="Enter Email"
          type="email"
          value={email}
          required
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </label>
      <label
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "0.5em",
        }}
      >
        Password
        <input
          style={{ width: "100%" }}
          placeholder="Enter Password"
          type="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          required
        />
      </label>

      <ButtonToolbar className="mt-3">
        <Button block type="submit" appearance="primary">
          Submit
        </Button>
      </ButtonToolbar>
    </form>
  );
}

export default LoginForm;
