"use client";

import { useState, useContext, useEffect } from "react";
import { ContentContext } from "@/app/context/contentContext";
import LearningList from "../LearningList/LearningList";

export default function DashBoardLearnings() {
  const { learningData, loading } = useContext(ContentContext);
  const [displayedLearnings, setDisplayedLearnings] = useState([]);
  const [filter, setFilter] = useState("rag");

  const statusOrder = { red: 1, amber: 2, green: 3 };

  useEffect(() => {
    if (!learningData) {
      setDisplayedLearnings([]);
      return;
    }
    switch (filter) {
      case "rag":
        setDisplayedLearnings(
          [...learningData].sort((a, b) => statusOrder[a.rag_status] - statusOrder[b.rag_status])
        );
        break;
      case "module":
        setDisplayedLearnings([...learningData].sort((a, b) => a.module_id - b.module_id));
        break;
      case "focused":
        setDisplayedLearnings([...learningData].filter((learning) => learning.focused));
        break;
      default:
        setDisplayedLearnings([...learningData]);
    }
  }, [filter, learningData]);

  return (
    <div className="container">
      <p>Filter by: {filter}</p>
      <div className="button-container">
        <button onClick={() => setFilter("focused")}>Focused</button>
        <button onClick={() => setFilter("rag")}>RAG</button>
        <button onClick={() => setFilter("module")}>Module</button>
      </div>
      <LearningList learningData={displayedLearnings} loading={loading} />
    </div>
  );
}
