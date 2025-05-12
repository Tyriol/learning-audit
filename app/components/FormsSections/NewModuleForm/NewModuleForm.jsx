import { useContext, useActionState } from "react";
import styles from "../NewForm.module.css";
import { AuthContext } from "@/app/context/authContext";
import { ContentContext } from "@/app/context/contentContext";

export default function NewModuleForm() {
  const { user } = useContext(AuthContext);
  const { setModuleData } = useContext(ContentContext);

  const [state, submitNewModule, isPending] = useActionState(async (prev, formData) => {
    const moduleName = formData.get("moduleName");
    const description = formData.get("description");
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
        return {
          type: "error",
          message: "there was an error while creating your new module entry",
        };
      }
      const jsonResponse = await response.json();
      const newModule = jsonResponse.payload;
      setModuleData((prevModuleData) => [...prevModuleData, newModule]);

      alert(`New module added: ${JSON.stringify(newModule.module_name)}`);
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
          <input
            className={styles.formInput}
            type="text"
            name="description"
            id="description"
            placeholder="Description of the module..."
          />
        </label>
        {state ? <p className="error">There was an error adding your new module</p> : null}
        <button className={styles.button} type="submit">
          {isPending ? "Adding your new module" : "ADD"}
        </button>
      </form>
    </div>
  );
}
