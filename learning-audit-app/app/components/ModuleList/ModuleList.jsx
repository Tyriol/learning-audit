import React from "react";
import { useState, useEffect } from "react";
import styles from "./ModuleList.module.css";

export default function ModuleList() {

  // on page load
  // fetch all modules
  // loop through the returned array and create module buttons

  // create state for storing the data returned from the api call, loading, and errors
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // make the call and set the state depending on success or failure
  useEffect(() => {
    const fetchModules = async () => {
      try {
        const response = await fetch("http://localhost:3010/api/modules");
        if (!response.ok) {
          throw new Error (`HTTP error: Status ${response.status}`);
        }
        let moduleData = await response.json();
        setData(moduleData);
        setError(null);
      } catch (err) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchModules();
  }, []);
  console.log(data);

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
          </ul>
        </div>
      </section>
    );
}