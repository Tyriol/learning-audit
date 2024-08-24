"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import FormsSection from "./components/FormsSections/FormsSection";
import ModuleList from "./components/ModuleList/ModuleList";

export default function Home() {
  const [moduleList, setmoduleList] = useState([]);

  const api = async function () {
    const response = await fetch("http://localhost:3010/api/modules");
    const data = await response.json();
    const { payload } = data;
    setMessage(payload);
  };

  return (
    <main className={styles.main}>
      <FormsSection />
      <ModuleList />
    </main>
  );
}
