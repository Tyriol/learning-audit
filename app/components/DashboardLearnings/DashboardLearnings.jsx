"use client";

import { useContext } from "react";
import { ContentContext } from "@/app/context/contentContext";
import LearningList from "../LearningList/LearningList";

export default function DashBoardLearnings() {
  const { learningData, loading } = useContext(ContentContext);

  return (
    <>
      <p>Filter by:</p>
      <div className="button-container">
        <button>Focused</button>
        <button>RAG</button>
        <button>Module</button>
      </div>
      <LearningList learningData={learningData} loading={loading} />
    </>
  );
}
