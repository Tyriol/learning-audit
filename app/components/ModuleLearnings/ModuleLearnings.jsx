"use client";

import styles from "./ModuleLearning.module.css";
import { useContext, useState, useActionState } from "react";
import { ContentContext } from "@/app/context/contentContext";
import Modal from "../Modal/Modal";
import NewLearningForm from "../FormsSections/NewLearningForm/NewLearningForm";
import LearningList from "../LearningList/LearningList";

export default function ModuleLearnings({ moduleId }) {
  const { moduleData, updateModule, learningData, loading } = useContext(ContentContext);
  const [isEditing, setIsEditing] = useState(false);

  const currentModule = moduleData.find((module) => module.id === moduleId);
  const moduleLearningsArray = learningData.filter((learning) => learning.module_id === moduleId);

  const handleEdit = async (prev, formData) => {
    const moduleName = formData.get("moduleName");
    const description = formData.get("description");

    if (!moduleName)
      return {
        type: "error",
        message: "A module name is required",
      };
    try {
      await updateModule(currentModule.id, moduleName, description);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      return {
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      };
    }
  };

  const [editState, editAction, editPending] = useActionState(handleEdit, null);

  return (
    <section className={styles.container}>
      {loading ? (
        <p>Loading</p>
      ) : isEditing ? (
        <form className={styles.editForm} action={editAction}>
          <input
            className={styles.formInput}
            name="moduleName"
            defaultValue={currentModule.module_name}
          />
          <textarea
            className={styles.formInput}
            rows={3}
            name="description"
            defaultValue={currentModule.description}
          ></textarea>
          <input name="moduleId" type="hidden" value={currentModule.id} />
          <div className={styles.formButtons}>
            <button type="submit" disabled={editPending}>
              {editPending ? "Saving..." : "Save"}
            </button>
            <button type="button" onClick={() => setIsEditing(false)}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <h2>{currentModule.module_name}</h2>
          <p>{currentModule.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
      <Modal title="Add a learning" openButtonText="Add a new learning" closeButtonText="Finished">
        <NewLearningForm />
      </Modal>
      <div>
        <LearningList learningData={moduleLearningsArray} loading={loading} />
      </div>
    </section>
  );
}
