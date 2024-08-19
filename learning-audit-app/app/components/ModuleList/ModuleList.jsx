import React from "react";
import styles from "./ModuleList.module.css";

export default function ModuleList() {
    return (
        <section className={styles.display}>
        <div className={styles.moduleDisplay}>
          <h3>Onboarding</h3>
          <ul className={styles.uList}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </section>
    );
}