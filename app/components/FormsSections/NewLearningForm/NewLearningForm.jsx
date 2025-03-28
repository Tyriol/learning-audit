import { useState } from "react";
import styles from "../NewForm.module.css";

export default function NewLearningForm({ moduleList, loading }) {
  const [formData, setFormData] = useState({
    learningName: "",
    moduleId: "",
    ragStatus: "",
    learningNotes: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const response = await fetch(
      process.env.NODE_ENV === "production"
        ? "https://learning-audit.onrender.com/api/learnings"
        : "http://localhost:3010/api/learnings",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    const jsonResponse = await response.json();
    const newLearning = jsonResponse.payload;
    console.log(newLearning);

    alert(
      `Name: ${formData.learningName}, Module: ${formData.moduleId}, RAG: ${formData.ragStatus}, Notes: ${formData.learningNotes}`
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
        <label className={styles.formLabel} htmlFor="moduleId">
          For which module?S
          <select
            name="moduleId"
            id="moduleId"
            onChange={handleChange}
            value={formData.moduleId}
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
        <label className={styles.formLabel} htmlFor="ragStatus">
          <select
            name="ragStatus"
            id="ragStatus"
            onChange={handleChange}
            value={formData.ragStatus}
            className={styles.formInput}
          >
            <option value="red">Red 🔴</option>
            <option value="amber">Amber 🟠</option>
            <option value="green">Green 🟢</option>
          </select>
        </label>
        <label className={styles.formLabel} htmlFor="learningNotes">
          <textarea
            rows="3"
            name="learningNotes"
            id="learningNotes"
            placeholder="Thoughts worthy of noting in terms of my learning..."
            onChange={handleChange}
            value={formData.learningNotes}
            className={styles.formInput}
          ></textarea>
        </label>
        <button className={styles.button} type="submit">
          ADD
        </button>
      </form>
    </div>
  );
}
