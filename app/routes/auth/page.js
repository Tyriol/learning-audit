"use client";
import styles from "./page.module.css";
import { useState, useActionState, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/authContext";

const handleSubmit = async (formView, email, username, password) => {
  try {
    let endPoint = "";
    let payload = {};

    switch (formView) {
      case "signin":
        endPoint = "/auth/signin";
        payload = {
          email: email,
          password: password,
        };
        break;
      case "signup":
        endPoint = "/auth/signup";
        payload = {
          email: email,
          user_name: username,
          password: password,
        };
        break;
      case "resetPassword":
        endPoint = "/auth/send-password-reset-email";
        payload = {
          email: email,
        };
        break;
    }

    const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}${endPoint}`;

    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return {
      type: "error",
      message: `Error submiting the form - ${error}`,
    };
  }
};

export default function Auth() {
  const router = useRouter();
  const { isAuthenticated, setIsAuthenticated, handleLogin } = useContext(AuthContext);
  const [formView, setFormView] = useState("signin");
  const [initialState, setInitialState] = useState(null);
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
    if ((formView === "signin" || formView === "signup") && response.accesstoken && !isPending) {
      handleLogin(response.accesstoken, username);
      router.push("/");
    }

    return {
      response,
    };
  }, initialState);

  const toggleFormView = () => {
    setFormView(formView === "signin" ? "signup" : "signin");
  };

  const pageTitle =
    formView === "signin" ? "Sign In" : formView === "resetPassword" ? "Reset Password" : "Sign Up";
  const submitButtonText = isPending
    ? "signing in"
    : formView === "signin"
    ? "Sign In"
    : formView === "resetPassword"
    ? "Get reset link"
    : "Sign Up";

  return (
    <div className={styles.container}>
      <h2>{pageTitle}</h2>
      <form className={styles.form} action={submitAction}>
        <div className={styles.input}>
          <label htmlFor="email" className={styles.formInput}>
            Email Address:
          </label>
          <input id="email" name="email" type="email"></input>
        </div>
        {formView === "signup" ? (
          <div className={styles.input}>
            <label htmlFor="username" className={styles.formInput}>
              Username:
            </label>
            <input id="username" name="username" type="text"></input>
          </div>
        ) : null}
        {formView !== "resetPassword" ? (
          <div className={styles.input}>
            <label htmlFor="password" className={styles.formInput}>
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
            ></input>
          </div>
        ) : null}
        <button type="submit">{submitButtonText}</button>
      </form>
      {state !== null && state.response.type === "error" && (
        <p className={styles.error}>{state.response.message}</p>
      )}
      <p>
        {formView === "signin" ? "Don't have an account? " : "Already have an account? "}
        <a href="#" onClick={toggleFormView}>
          {formView === "signin" ? "Sign up" : "Sign in"}
        </a>{" "}
        instead
      </p>
      {formView !== "resetPassword" ? (
        <p>
          Forgot your password?
          <a href="#" onClick={() => setFormView("resetPassword")}>
            {" "}
            Reset it here
          </a>
        </p>
      ) : null}
    </div>
  );
}
