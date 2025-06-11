"use client";

import styles from "./ConfirmEmail.module.css";
import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/app/context/authContext";
import Spinner from "../Spinner/Spinner";

export default function ConfirmEmail({ id, token }) {
  const router = useRouter();
  const { handleLogin } = useContext(AuthContext);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const confirmEmail = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/confirm-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, token }),
        });
        const data = await response.json();
        if (response.ok) {
          handleLogin(data.accesstoken);
          router.push("/");
        } else {
          setIsError(true);
          console.error("Email confirmation failed");
        }
      } catch (error) {
        setIsError(true);
        console.error("Error confirming email:", error);
      }
    };

    confirmEmail();
  }, [id, token, router]);

  return isError ? (
    <div>There was an issue confirming your email, try again.</div>
  ) : (
    <div className={styles.container}>
      <div>Confirming your email...</div>
      <div className={styles.spinner}>
        <Spinner />
      </div>
    </div>
  );
}
