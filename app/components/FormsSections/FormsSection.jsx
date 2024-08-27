import React from "react";
import styles from "./FormsSection.module.css";
import NewModuleForm from "./NewModuleForm/NewModuleForm";
import NewLearningForm from "./NewLearningForm/NewLearningForm";

export default function FormsSection({ moduleList, setModuleList, loading }) {
  return (
    <section className={styles.contentInput}>
      <NewModuleForm moduleList={moduleList} setModuleList={setModuleList} />
      <NewLearningForm moduleList={moduleList} loading={loading} />
    </section>
  );
}
