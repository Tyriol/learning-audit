import { useState } from "react";
import styles from "../NewForm.module.css";

export default function NewLearningForm({ moduleList, loading }) {
  const [formData, setFormData] = useState({
    learningName: "",
    module_id: "",
    rag_status: "",
    learning_notes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  console.log(formData);

  function handleSubmit(event) {
    event.preventDefault();
    alert(
      `Name: ${formData.learningName}, Module: ${formData.module_id}, RAG: ${formData.rag_status}, Notes: ${formData.learning_notes}`
    );
  }

  return (
    <div className={styles.wide}>
      <form className={styles.siteForm} onSubmit={handleSubmit} method="post">
        <label className={styles.formLabel} htmlFor="learningName">
          What did I learn?
          <input
            type="text"
            name="learningName"
            id="learningName"
            onChange={handleChange}
            placeholder="Concept, skill or language"
            value={formData.learningName}
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel} htmlFor="module_id">
          For which module?S
          <select
            name="module_id"
            id="module_id"
            onChange={handleChange}
            value={formData.module_id}
            className={styles.formInput}
          >
            {loading ? (
              <option value="loading">Loading list...</option>
            ) : (
              moduleList.map((module) => {
                return (
                  <option key={module.id} value={module.id}>
                    {module.module_name}
                  </option>
                );
              })
            )}
          </select>
        </label>
        <label className={styles.formLabel} htmlFor="rag_status">
          <select
            name="rag_status"
            id="rag_status"
            onChange={handleChange}
            value={formData.rag_status}
            className={styles.formInput}
          >
            <option value="red">Red 🔴</option>
            <option value="amber">Amber 🟠</option>
            <option value="green">Green 🟢</option>
          </select>
        </label>
        <label className={styles.formLabel} htmlFor="learning_notes">
          <textarea
            rows="3"
            name="learning_notes"
            id="learning_notes"
            placeholder="Thoughts worthy of noting in terms of my learning..."
            onChange={handleChange}
            value={formData.learning_notes}
            className={styles.formInput}
          ></textarea>
        </label>
        <button type="submit">ADD</button>
      </form>
    </div>
  );
}
