"use client";

import { useState, useContext } from "react";

import { ContentContext } from "@/app/context/contentContext";
import ProtectedRoute from "../ProtectedRoute";
import ModuleList from "../../components/ModuleList/ModuleList";

export default function Modules() {
  const { moduleData, loading } = useContext(ContentContext);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ProtectedRoute>
      <ModuleList moduleList={moduleData} loading={loading} isOpen={isOpen} setIsOpen={setIsOpen} />
    </ProtectedRoute>
  );
}
