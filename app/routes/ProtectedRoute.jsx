"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/authContext";
import Spinner from "../components/Spinner/Spinner";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, isAuthLoading } = useContext(AuthContext);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!isAuthLoading) {
      if (!isAuthenticated) {
        router.push("/");
      } else {
        setAuthChecked(true);
      }
    }
  }, [isAuthenticated, isAuthLoading, router]);

  return isAuthLoading || !authChecked ? (
    <div style={{ width: "4rem", height: "4rem", margin: "auto" }}>
      <Spinner />
    </div>
  ) : (
    children
  );
}
