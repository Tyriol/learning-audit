"use client";

import styles from "./page.module.css";
import { useContext } from "react";
import ProtectedRoute from "../ProtectedRoute";
import { AuthContext } from "@/app/context/authContext";

import ModuleList from "@/app/components/ModuleList/ModuleList";
import LearningList from "@/app/components/LearningList/LearningList";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.info}>
          <h2>Hey again {user.username}</h2>
          <p>What are you going to focus on today</p>
          <p>Or would you like to...</p>
          <button>Add a new module</button>
        </div>
        <div className={styles.learnings}>
          <h3>Your Learnings</h3>
          <LearningList />
        </div>
        <div className={styles.modules}>
          <h3>Your Modules</h3>
          <ModuleList />
        </div>
      </div>
    </ProtectedRoute>
  );
}
