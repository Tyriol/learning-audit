"use client";
import styles from "./page.module.css";
import { useState } from "react";

// check if signed in or not
// if not show sign in form
// else redirect to home page
// on sign in give option to sign up and vice versa
// sign in form should have option to reset password
// sign up form should have
// email
// username
// password
// sign in form should have
// email
// password
// forgot password form should have
// email
export default function Auth() {
  const [signIn, setSignIn] = useState(false);
  console.log("Test", signIn);
  return (
    <div className={styles.container}>
      <h2>{signIn ? "Sign In" : "Sign Up"}</h2>
      <form>
        <label className={styles.formInput}>
          Email Address:
          <input type="email"></input>
        </label>
        {signIn ? (
          <label className={styles.formInput}>
            Username:
            <input type="text"></input>
          </label>
        ) : null}
        <label className={styles.formInput}>
          Password:
          <input type="password"></input>
        </label>
      </form>
      <p>No Account? Sign In instead</p>
    </div>
  );
}
