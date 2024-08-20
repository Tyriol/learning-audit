import React from "react";
import { useState } from "react";
import styles from "../NewForm.module.css"

export default function NewModuleForm() {

    // function to post a new module
    function gatherModuleData () {

        // const newModuleDescription = document.querySelector("#course-module-description").value;
        return {
            module_name: "newModuleName",
            description: "newModuleDescription"
        };
    };
    
    async function handleNewModuleSubmit (event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        console.log(formData);

        const formJson = Object.fromEntries(formData.entries());
        console.log(formJson);
        

        const response = await fetch("http://localhost:3010/api/modules", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formJson)
          });
          const jsonResponse = await response.json();
          alert(jsonResponse);
    }

    return (
        <div className={styles.wide}>
            <form className={styles.siteForm} onSubmit={handleNewModuleSubmit} method="post">
                <label className ={styles.formLabel} htmlFor="moduleName">Add a new course Module:
                    <input className={styles.formInput} type="text" name="moduleName" id="moduleName" placeholder="Module name..." />
                </label>
                <label className ={styles.formLabel} htmlFor="course-module-description">Module Description:
                    <input className={styles.formInput} type="text" name="description" id="description" placeholder="Description of the module..." />
                </label>
                <button type="submit">ADD</button>
            </form>
        </div>
    );
};