import styles from "./page.module.css";
import ProtectedRoute from "../ProtectedRoute";

import Intro from "@/app/components/Intro/Intro";
import ModuleList from "@/app/components/ModuleList/ModuleList";
import DashBoardLearnings from "@/app/components/DashboardLearnings/DashboardLearnings";

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <div className={styles.container}>
        <div className={styles.info}>
          <Intro />
        </div>
        <div className={styles.learnings}>
          <h3>Your Learnings</h3>
          <DashBoardLearnings />
        </div>
        <div className={styles.modules}>
          <h3>Your Modules</h3>
          <ModuleList />
        </div>
      </div>
    </ProtectedRoute>
  );
}
