"use client";

import styles from "./Learning.module.css";
import { useContext, useState, useActionState } from "react";
import { ContentContext } from "@/app/context/contentContext";

export default function Learning({ learning }) {
  const [isEditing, setIsEditing] = useState(false);
  const { updateLearning } = useContext(ContentContext);
  const { id, learning_name: name, learning_notes: notes, rag_status: rag, module_id } = learning;

  const handleEdit = async (prev, formData) => {
    const learningName = formData.get("learningName");
    const notes = formData.get("notes");
    const ragStatus = formData.get("ragStatus");

    if (!learningName)
      return {
        type: "error",
        message: "A learning name is required",
      };
    try {
      await updateLearning(id, learningName, notes, ragStatus);
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
  ) : (
    <>
      <p>{rag}</p>
      <p>{notes}</p>
      <button type="button" onClick={() => setIsEditing(true)}>
        Edit
      </button>
    </>
  );
}
