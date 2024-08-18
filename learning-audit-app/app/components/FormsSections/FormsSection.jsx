import React from "react";
import styles from "./FormsSection.module.css"

export default function FormsSection() {
    return(
        <section className={styles.contentInput}>
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
        <div className={styles.wide}>
          <form className={styles.siteForm} action="" method="post">
            <label htmlFor="learning">What did I learn?</label>
            <input
              type="text"
              name="learning"
              id="learning"
              placeholder="Type here..."
            />
            <select name="linked-course" id="linked-course" defaultValue={0}>
              <option value="default" disabled>
                In which course?
              </option>
              <option value="dummy">dummy</option>
            </select>
            <select name="rag" id="rag">
              <option value="red">Red 🔴</option>
              <option value="amber">Amber 🟠</option>
              <option value="green">Green 🟢</option>
            </select>
            <textarea
              rows="3"
              name="learning-notes"
              id="learning-notes"
              placeholder="Thoughts worthy of noting in terms of my learning..."
            ></textarea>
            <button type="submit">ADD</button>
          </form>
        </div>
      </section>
    )
}