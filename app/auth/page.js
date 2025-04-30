"use client";
import styles from "./page.module.css";
import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";

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
const handleSubmit = async (formView, email, username, password) => {
  try {
    let endPoint = "";
    let payload = {};

    switch (formView) {
      case "signin":
        (endPoint = "/auth/signin"),
          (payload = {
            email: email,
            password: password,
          });
        break;
      case "signup":
        (endPoint = "/auth/signup"),
          (payload = {
            email: email,
            username: username,
            password: password,
          });
        break;
      case "resetPassword":
        (endPoint = "/auth/reset-password"),
          (payload = {
            email: email,
          });
        break;
    }

    const response = await fetch(
      process.env.NODE_ENV === "production"
        ? `https://learning-audit.onrender.com${endPoint}`
        : `http://localhost:3010${endPoint}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      type: "error",
      message: "Error submiting the form",
      error,
    };
  }
};

export default function Auth() {
  const router = useRouter();
  const [formView, setFormView] = useState("signin");
  const [state, submitAction, isPending] = useActionState(async (prev, formData) => {
    const email = formData.get("email");
    const username = formData.get("username");
    const password = formData.get("password");

    //
    if (
      !email ||
      (formView === "signup" && !username) ||
      (formView !== "resetPassword" && !password)
    ) {
      return {
        type: "error",
        message: "All fields are required",
      };
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      return {
        type: "error",
        message: "The email address is invalid",
      };
    }

    const response = await handleSubmit(formView, email, username, password);
    console.log("state", state);

    return {
      response,
    };
  });

  const toggleFormView = () => {
    setFormView(formView === "signin" ? "signup" : "signin");
    ReactDOM.requestFormReset(formData);
  };

  return (
    <div className={styles.container}>
      <h2>{formView === "signin" ? "Sign In" : "Sign Up"}</h2>
      <form action={submitAction}>
        <label htmlFor="email" className={styles.formInput}>
          Email Address:
        </label>
        <input id="email" name="email" type="email"></input>
        {formView === "signup" ? (
          <>
            <label htmlFor="username" className={styles.formInput}>
              Username:
            </label>
            <input id="username" name="username" type="text"></input>
          </>
        ) : null}
        <label htmlFor="password" className={styles.formInput}>
          Password:
        </label>
        <input id="password" name="password" type="password"></input>
        <button type="submit">{formView === "signin" ? "Sign In" : "Sign Up"}</button>
      </form>
      {state && <p>{state.response.message}</p>}
      <button onClick={toggleFormView}>
        {formView === "signin"
          ? "Don't have an account? Sign up instead"
          : "Already have an account? Sign in instead"}
      </button>
    </div>
  );
}
