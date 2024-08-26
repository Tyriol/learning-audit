import { useState } from "react";
import styles from "../NewForm.module.css";

export default function NewLearningForm() {
  const [formData, setFormData] = useState({
    learning_name: "",
    module_id: "",
    rag_status: "",
    learning_notes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    alert(
      `Name: ${formData.learning_name}, Module: ${formData.module_id}, RAG: ${formData.rag_status}, Notes: ${formData.learning_notes}`
    );
  }

  return (
    <div className={styles.wide}>
      <form className={styles.siteForm} onSubmit={handleSubmit} method="post">
        <label htmlFor="learning">What did I learn?</label>
        <input
          type="text"
          name="learning"
          id="learning"
          onChange={handleChange}
          value={formData.learning_name}
        />
        <label htmlFor="linked-course">
          <select
            name="linked-course"
            id="linked-course"
            onChange={handleChange}
            value={formData.module_id}
          >
            <option value="default" disabled>
              In which course?
            </option>
            <option value="dummy">dummy</option>
          </select>
        </label>
        <label htmlFor="rag">
          <select
            name="rag"
            id="rag"
            onChange={handleChange}
            value={formData.rag_status}
          >
            <option value="red">Red 🔴</option>
            <option value="amber">Amber 🟠</option>
            <option value="green">Green 🟢</option>
          </select>
        </label>
        <textarea
          rows="3"
          name="learning-notes"
          id="learning-notes"
          placeholder="Thoughts worthy of noting in terms of my learning..."
          onChange={handleChange}
          value={formData.learning_notes}
        ></textarea>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
}
