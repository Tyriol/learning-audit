"use client";
import styles from "../../../routes/auth/page.module.css";
import { useActionState } from "react";
import { useRouter } from "next/navigation";

export default function PasswordResetForm({ id, token }) {
  const router = useRouter();
  const [state, submitPasswordReset, isPending] = useActionState(async (prev, formData) => {
    const password = formData.get("password");
    if (!password)
      return {
        type: "error",
        message: "a new password is required",
      };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/reset-password/${id}/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password }),
        }
      );
      if (!response.ok)
        return {
          type: "error",
          message: "there was an error while creating your new password",
        };
      router.push("/routes/auth");
    } catch (error) {
      return {
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      };
    }
  });

  return (
    <div className={styles.container}>
      <h2>Reset your password</h2>
      <form action={submitPasswordReset} className={styles.form}>
        <div className={styles.input}>
          <label htmlFor="password" className={styles.formInput}>
            New Password:
          </label>
          <input id="password" name="password" type="password" autoComplete="new-password"></input>
        </div>
        <button type="submit" disabled={isPending}>
          Submit
        </button>
      </form>
    </div>
  );
}
