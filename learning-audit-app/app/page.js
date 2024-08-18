"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import FormsSection from "./components/FormsSections/FormsSection";

export default function Home() {
  const [message, setMessage] = useState([]);

  const api = async function () {
    const response = await fetch("http://localhost:3010/api/modules");
    const data = await response.json();
    const { payload } = data;
    setMessage(payload);
  };

  return (
    <main className={styles.main}>
      <FormsSection />
      <section className={styles.display}>
        <div className={styles.moduleDisplay}>
          <h3>Onboarding</h3>
          <ul>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
    </main>
  );
}
