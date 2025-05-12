import { useContext, useActionState } from "react";
import styles from "../NewForm.module.css";
import { AuthContext } from "@/app/context/authContext";
import { ContentContext } from "@/app/context/contentContext";

export default function NewLearningForm() {
  const { user } = useContext(AuthContext);
  const { moduleData, setModuleData, loading } = useContext(ContentContext);
  const [state, submitNewLearning, isPending] = useActionState(async (prev, formData) => {
    const learningName = formData.get("learningName");
    const moduleId = formData.get("moduleId");
    const ragStatus = formData.get("ragStatus");
    const learningNotes = formData.get("learningNotes");
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/learnings`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ learningName, moduleId, ragStatus, learningNotes, userId: user.id }),
      });

      if (!response.ok)
        return {
          type: "error",
          message: "there was an error while creating your new learning entry",
        };

      const jsonResponse = await response.json();
      const newLearning = jsonResponse.payload;
      alert(`New Learning ${learningName} added ... this message will be improved soon!`);
    } catch (err) {
      console.error(err);
      return {
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      };
    }
  });

  return (
    <div className={styles.wide}>
      <form className={styles.siteForm} action={submitNewLearning}>
        <label className={styles.formLabel} htmlFor="learningName">
          What did I learn?
          <input
            type="text"
            name="learningName"
            id="learningName"
            placeholder="Concept, skill or language"
            className={styles.formInput}
          />
        </label>
        <label className={styles.formLabel} htmlFor="moduleId">
          For which module?
          <select name="moduleId" id="moduleId" className={styles.formInput} defaultValue="">
            {loading ? (
              <option value="loading">Loading list...</option>
            ) : (
              <>
                <option disabled value="">
                  Select a module...
                </option>
                {moduleData.map((module) => {
                  return (
                    <option key={module.id} value={module.id}>
                      {module.module_name}
                    </option>
                  );
                })}
              </>
            )}
          </select>
        </label>
        <label className={styles.formLabel} htmlFor="ragStatus">
          <select name="ragStatus" id="ragStatus" className={styles.formInput}>
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
            className={styles.formInput}
          ></textarea>
        </label>
        {state ? <p className="error">There was an error adding your new learning</p> : null}
        <button className={styles.button} type="submit">
          {isPending ? "Adding your learning" : "ADD"}
        </button>
      </form>
    </div>
  );
}
