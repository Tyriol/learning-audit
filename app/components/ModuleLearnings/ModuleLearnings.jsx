"use client";

import styles from "./ModuleLearning.module.css";
import { useContext, useState, useActionState } from "react";
import { useRouter } from "next/navigation";
import { ContentContext } from "@/app/context/contentContext";
import Modal from "../Modal/Modal";
import NewLearningForm from "../FormsSections/NewLearningForm/NewLearningForm";
import LearningList from "../LearningList/LearningList";

export default function ModuleLearnings({ moduleId }) {
  const router = useRouter();
  const { moduleData, updateModule, deleteModule, learningData, loading } =
    useContext(ContentContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const deleteButtonStyle = {
    backgroundColor: "#c23333",
    color: "#fff",
    fontWeight: "400",
    border: "1px solid #000",
  };

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

  const handleDelete = async () => {
    try {
      await deleteModule(moduleId);
      setIsDeleting(false);
      router.push("/routes/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const [editState, editAction, editPending] = useActionState(handleEdit, null);

  return (
    <section className={styles.container}>
      {loading || !currentModule ? (
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
      ) : isDeleting ? (
        <>
          <p>Are you sure you want to delete this Module?</p>
          <p>Once it&apos;s gone...it&apos;s gone</p>
          <p>And so are all it&apos;s learnings</p>
          <div className={styles.formButtons}>
            <button style={deleteButtonStyle} onClick={handleDelete}>
              Delete
            </button>
            <button onClick={() => setIsDeleting(false)}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h2>{currentModule.module_name}</h2>
          <p>{currentModule.description}</p>
          <button onClick={() => setIsEditing(true)}>Edit</button>
          <button onClick={() => setIsDeleting(true)}>Delete</button>
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
