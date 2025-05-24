"use client";

import styles from "./ModuleLearning.module.css";
import { useContext, useState, useActionState } from "react";
import { ContentContext } from "@/app/context/contentContext";
import Modal from "../Modal/Modal";
import NewLearningForm from "../FormsSections/NewLearningForm/NewLearningForm";

export default function ModuleLearnings({ moduleId }) {
  const { moduleData, updateModule, learningData, loading } = useContext(ContentContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const currentModule = moduleData.find((module) => module.id === moduleId);
  const moduleLearningsArray = learningData.filter((learning) => learning.module_id === moduleId);
  const learnings = moduleLearningsArray.map((learning) => {
    return <p key={learning.id}>{learning.learning_name}</p>;
  });

  const handleClick = () => {
    setIsOpen(true);
  };

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
      <button type="button" onClick={handleClick}>
        Add a new learning
      </button>
      <Modal open={isOpen} onClose={() => setIsOpen(false)} title="Add a new learning">
        <NewLearningForm />
      </Modal>
      <div>{learnings}</div>
    </section>
  );
}
