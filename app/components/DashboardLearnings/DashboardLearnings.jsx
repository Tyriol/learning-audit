"use client";

import { useContext } from "react";
import { ContentContext } from "@/app/context/contentContext";
import LearningList from "../LearningList/LearningList";

export default function DashBoardLearnings() {
  const { learningData, loading } = useContext(ContentContext);

  return <LearningList learningData={learningData} loading={loading} />;
}
