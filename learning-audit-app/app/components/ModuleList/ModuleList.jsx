import React from "react";
import styles from "./ModuleList.module.css";

export default function ModuleList() {
    return (
        <section className={styles.display}>
        <div className={styles.moduleDisplay}>
          <ul className={styles.uList}>
            <li className={styles.uListItem}>
              <button className={styles.button} type="button">
                <h3>Onboarding</h3>
                <p>Some stuff</p>
              </button>
            </li>
            <li className={styles.uListItem}>
              <button className={styles.button} type="button">
                <h3>Onboarding</h3>
                <p>Some stuff</p>
              </button>
            </li>
            <li className={styles.uListItem}>
              <button className={styles.button} type="button">
                <h3>Onboarding</h3>
                <p>Some stuff</p>
              </button>
            </li>
            <li className={styles.uListItem}>
              <button className={styles.button} type="button">
                <h3>Onboarding</h3>
                <p>Some stuff</p>
              </button>
            </li>
          </ul>
        </div>
      </section>
    );
}