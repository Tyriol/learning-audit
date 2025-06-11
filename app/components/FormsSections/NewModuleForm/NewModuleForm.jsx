import { useContext, useActionState, useState } from "react";
import styles from "../NewForm.module.css";
import { AuthContext } from "@/app/context/authContext";
import { ContentContext } from "@/app/context/contentContext";

export default function NewModuleForm() {
  const { user } = useContext(AuthContext);
  const { setModuleData } = useContext(ContentContext);
  const [isModuleAdded, setIsModuleAdded] = useState(false);

  const [state, submitNewModule, isPending] = useActionState(async (prev, formData) => {
    const moduleName = formData.get("moduleName");
    const description = formData.get("description");
    if (!moduleName)
      return {
        type: "error",
        message: "A module name is required",
      };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/modules`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ moduleName, description, userId: user.id }),
      });
      if (!response.ok) {
        console.error(response);
        return {
          type: "error",
          message: "There was an error while creating your new module entry",
        };
      }
      const jsonResponse = await response.json();
      const newModule = jsonResponse.payload;
      setModuleData((prevModuleData) => [...prevModuleData, newModule]);

      setIsModuleAdded(true);
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
      {isModuleAdded ? (
        <div className={styles.successMessage}>
          <p>Your new module was added</p>
          <button className={styles.button} onClick={() => setIsModuleAdded(false)}>
            Add another
          </button>
        </div>
      ) : (
        <form className={styles.siteForm} action={submitNewModule}>
          <label className={styles.formLabel} htmlFor="moduleName">
            Add a new course Module:
            <input
              className={styles.formInput}
              type="text"
              name="moduleName"
              id="moduleName"
              placeholder="Module name..."
            />
          </label>
          <label className={styles.formLabel} htmlFor="course-module-description">
            Module Description:
          </label>
          <input
            className={styles.formInput}
            type="text"
            name="description"
            id="description"
            placeholder="Description of the module..."
          />
          {state && state.type === "error" ? <p className="error">{state.message}</p> : null}
          <button className={styles.button} type="submit">
            {isPending ? "Adding your new module" : "ADD"}
          </button>
        </form>
      )}
    </div>
  );
}
