"use client";

import styles from "./ModuleLearning.module.css";
import { useContext, useState, useActionState } from "react";
import { ContentContext } from "@/app/context/contentContext";
import Modal from "../Modal/Modal";
import NewLearningForm from "../FormsSections/NewLearningForm/NewLearningForm";

export default function ModuleLearnings({ moduleId }) {
  const { moduleData, learningData } = useContext(ContentContext);
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

  const handleEdit = () => {
    console.log("edit!");
  };

  const [editState, editAction, editPending] = useActionState(handleEdit, null);

  // to edit the module
  // click an edit button ✅
  // set isEditing to true ✅
  // Update edit button to say update ✅
  // when isEditing is true, replace h2 and p with inputs pre-populated with current info ✅
  // cancel button should revert to normal state ✅
  // save button should fire off a PATCH request to the server

  return (
    <section className={styles.container}>
      {isEditing ? (
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
