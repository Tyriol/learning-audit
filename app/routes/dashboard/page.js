"use client";

import { useContext } from "react";
import ProtectedRoute from "../ProtectedRoute";
import { AuthContext } from "@/app/context/authContext";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <ProtectedRoute>
      <h2>Hey again {user.username}</h2>
    </ProtectedRoute>
  );
}
