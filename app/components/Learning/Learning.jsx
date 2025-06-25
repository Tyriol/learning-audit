"use client";

import styles from "./Learning.module.css";
import { useContext, useState, useActionState } from "react";
import { ContentContext } from "@/app/context/contentContext";

export default function Learning({ learning }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateLearning, deleteLearning } = useContext(ContentContext);
  const {
    id,
    learning_name: name,
    learning_notes: notes,
    rag_status: rag,
    module_id,
    focused,
  } = learning;

  const deleteButtonStyle = {
    backgroundColor: "#c23333",
    color: "#fff",
    fontWeight: "400",
    border: "1px solid #000",
  };

  const focusToggle = async () => {
    const newFocusedState = !focused;
    await updateLearning(id, name, notes, rag, newFocusedState);
  };

  const handleEdit = async (prev, formData) => {
    const updatedLearningName = formData.get("learningName");
    const updatedNotes = formData.get("notes");
    const updatedRagStatus = formData.get("ragStatus");

    if (!updatedLearningName)
      return {
        type: "error",
        message: "A learning name is required",
      };
    try {
      await updateLearning(id, updatedLearningName, updatedNotes, updatedRagStatus);
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
      await deleteLearning(id);
      setIsDeleting(false);
    } catch (error) {
      console.error(error);
    }
  };

  const [editState, editAction, editPending] = useActionState(handleEdit, null);

  const editingForm = (
    <form className={styles.editForm} action={editAction}>
      <input className={styles.formInput} name="learningName" defaultValue={name} />
      <textarea className={styles.formInput} rows={3} name="notes" defaultValue={notes}></textarea>
      <select name="ragStatus" id="ragStatus" defaultValue={rag} className={styles.formInput}>
        <option value="red">Red 🔴</option>
        <option value="amber">Amber 🟠</option>
        <option value="green">Green 🟢</option>
      </select>
      <div className={styles.formButtons}>
        <button type="submit" disabled={editPending}>
          {editPending ? "Saving..." : "Save"}
        </button>
        <button type="button" onClick={() => setIsEditing(false)}>
          Cancel
        </button>
      </div>
    </form>
  );

  return isEditing ? (
    editingForm
  ) : isDeleting ? (
    <>
      <p>Are you sure you want to delete this learning?</p>
      <p>Once it&apos;s gone...it&apos;s gone</p>
      <div className={styles.formButtons}>
        <button style={deleteButtonStyle} onClick={handleDelete}>
          Delete
        </button>
        <button onClick={() => setIsDeleting(false)}>Cancel</button>
      </div>
    </>
  ) : (
    <>
      <p>RAG Status: {rag}</p>
      <button onClick={focusToggle} className={focused ? styles.focused : ""}>
        Focus
      </button>
      <p>{notes}</p>
      <div className={styles.formButtons}>
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button style={deleteButtonStyle} type="button" onClick={() => setIsDeleting(true)}>
          Delete
        </button>
      </div>
    </>
  );
}
