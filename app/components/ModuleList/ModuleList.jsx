import styles from "./ModuleList.module.css";

export default function ModuleList({ moduleList, loading }) {
  // on button click
  // it take module id
  // and makes a get request to get all learnings associated with that module id
  // opens a modal***
  // displays the module title and a list of learnings in

  function handleClick(e) {
    console.log(e);
  }

  return (
    <section className={styles.display}>
      {loading ? (
        <p>Words</p>
      ) : (
        <ul className={styles.uList}>
          {moduleList.map((module) => {
            return (
              <li key={module.id} className={styles.uListItem}>
                <button
                  onClick={(e) => handleClick(e)}
                  className={styles.button}
                  type="button"
                  id={"module" + module.id}
                >
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
