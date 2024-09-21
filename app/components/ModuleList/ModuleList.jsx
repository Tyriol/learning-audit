import styles from "./ModuleList.module.css";

export default function ModuleList({ moduleList, loading }) {
  // on button click
  // it takes module id
  // and makes a get request to get all learnings associated with that module id
  // opens a modal***
  // displays the module title and a list of learnings in

  async function handleClick(e) {
    console.log(e.target.id);
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
                  id={module.id}
                >
                  {module.module_name}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
