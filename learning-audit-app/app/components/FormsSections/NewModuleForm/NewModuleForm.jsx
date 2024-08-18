import React from "react";
import styles from "./NewModuleForm.module.css"

export default function NewModuleForm() {
    return (
        <div className={styles.wide}>
            <form className={styles.siteForm} action="" method="post">
                <label htmlFor="course-module">Add a new course Module:</label>
                <input
                type="text"
                name="course-module"
                id="course-module"
                placeholder="Module name..."
                />
                <button type="submit">ADD</button>
            </form>
        </div>
    );
};