"use client";

import styles from "./page.module.css";
import { useContext } from "react";
import ProtectedRoute from "../ProtectedRoute";
import { AuthContext } from "@/app/context/authContext";

import ModuleList from "@/app/components/ModuleList/ModuleList";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>Hey again {user.username}</h2>
          <button>Add new module</button>
        </div>
        <div className={styles.learnings}>Some learnings</div>
        <div className={styles.modules}>
          <ModuleList />
        </div>
      </div>
    </ProtectedRoute>
  );
}
