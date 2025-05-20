import { useContext } from "react";

import { ContentContext } from "@/app/context/contentContext";

export default function LearningList() {
  const { learningData } = useContext(ContentContext);
  const learningList = learningData.map((learning) => {
    return <li key={learning.id}>{learning.learning_name}</li>;
  });
  return <ul>{learningList}</ul>;
}
