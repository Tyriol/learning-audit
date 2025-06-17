"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/authContext";
import Spinner from "../components/Spinner/Spinner";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, authLoading } = useContext(AuthContext);
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      if (!isAuthenticated) {
        router.push("/");
      } else {
        setAuthChecked(true);
      }
    }
  }, [isAuthenticated, authLoading, router]);

  return authLoading || !authChecked ? (
    <div style={{ width: "4rem", height: "4rem", margin: "auto" }}>
      <Spinner />
    </div>
  ) : (
    children
  );
}
