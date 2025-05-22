"use client";

import { useContext } from "react";
import { ContentContext } from "@/app/context/contentContext";

export default function ModuleLearnings({ moduleId }) {
  const { learningData } = useContext(ContentContext);
  const moduleLearningsArray = learningData.filter((learning) => learning.module_id === moduleId);
  const learnings = moduleLearningsArray.map((learning) => {
    return <p key={learning.id}>{learning.learning_name}</p>;
  });

  return (
    <section>
      <h2>Some Learnings</h2>
      <p>this will be replaced by learniings for module {moduleId}</p>
      {learnings}
    </section>
  );
}
