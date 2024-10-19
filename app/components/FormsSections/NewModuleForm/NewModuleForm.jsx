import React from "react";
import styles from "../NewForm.module.css";

export default function NewModuleForm({ setModuleList }) {
  // handle submit of new module data to update db and re-render module list
  async function handleNewModuleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    // post new module
    const response = await fetch("http://localhost:3010/api/modules", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formJson),
    });
    const jsonResponse = await response.json();
    const newModule = jsonResponse.payload;
    setModuleList((moduleList) => [...moduleList, newModule]);

    alert(`New module added: ${JSON.stringify(newModule.module_name)}`);
  }

  return (
    <div className={styles.wide}>
      <form
        className={styles.siteForm}
        onSubmit={handleNewModuleSubmit}
        method="post"
      >
        <label className={styles.formLabel} htmlFor="moduleName">
          Add a new course Module:
          <input
            className={styles.formInput}
            type="text"
            name="moduleName"
            id="moduleName"
            placeholder="Module name..."
          />
        </label>
        <label className={styles.formLabel} htmlFor="course-module-description">
          Module Description:
          <input
            className={styles.formInput}
            type="text"
            name="description"
            id="description"
            placeholder="Description of the module..."
          />
        </label>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
}
