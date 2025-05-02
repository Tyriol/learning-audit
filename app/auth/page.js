"use client";
import styles from "./page.module.css";
import { useState, useActionState } from "react";
import { useRouter } from "next/navigation";

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
            user_name: username,
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

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://learning-audit.onrender.com${endPoint}`
        : `http://localhost:3010${endPoint}`;

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
    if ((formView === "signin" || formView === "signup") && response.accesstoken) {
      localStorage.setItem("accesstoken", response.accesstoken);
      setTimeout(() => router.push("/"), 1500);
    }

    return {
      response,
    };
  }, initialState);

  const toggleFormView = () => {
    setFormView(formView === "signin" ? "signup" : "signin");
  };

  const pageTitle = formView === "signin" ? "Sign In" : "Sign Up";
  const submitButtonText = isPending ? "signing in" : formView === "signin" ? "Sign In" : "Sign Up";

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
        <div className={styles.input}>
          <label htmlFor="password" className={styles.formInput}>
            Password:
          </label>
          <input id="password" name="password" type="password"></input>
        </div>
        <button type="submit">{submitButtonText}</button>
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
