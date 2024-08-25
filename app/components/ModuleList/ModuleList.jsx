import styles from "./ModuleList.module.css";

export default function ModuleList({ moduleList, loading }) {
  // on page load
  // fetch all modules
  // loop through the returned array and create module buttons
  console.log(moduleList);

  return (
    <section className={styles.display}>
      {loading ? (
        <p>Words</p>
      ) : (
        <ul className={styles.uList}>
          {moduleList.map((module) => {
            return (
              <li key={module.id} className={styles.uListItem}>
                <button className={styles.button} type="button">
                  <h3>{module.module_name}</h3>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
