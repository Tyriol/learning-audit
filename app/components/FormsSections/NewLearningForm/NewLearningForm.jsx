import { useState } from "react";
import styles from "../NewForm.module.css";

export default function NewLearningForm() {
  const [learningName, setLearningName1] = useState("");
  return (
    <div className={styles.wide}>
      <form className={styles.siteForm} action="" method="post">
        <label htmlFor="learning">What did I learn?</label>
        <input
          type="text"
          name="learning"
          id="learning"
          placeholder="Type here..."
        />
        <select name="linked-course" id="linked-course">
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
  );
}
