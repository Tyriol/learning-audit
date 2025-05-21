"use client";

import styles from "./page.module.css";
import { useContext, useEffect } from "react";

import { ContentContext } from "./context/contentContext";

import ProtectedRoute from "./routes/ProtectedRoute";
import FormsSection from "./components/FormsSections/FormsSection";

export default function Home() {
  const { loading } = useContext(ContentContext);

  const screenToDisplay = loading ? <div>Loading...</div> : <FormsSection />;

  return (
    <main className={styles.main}>
      <ProtectedRoute>{screenToDisplay}</ProtectedRoute>
    </main>
  );
}
