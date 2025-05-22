import ModuleLearnings from "@/app/components/ModuleLearnings/ModuleLearnings";
import ProtectedRoute from "../../ProtectedRoute";

export default async function Modules({ params }) {
  const { slug } = await params;
  const [id] = slug;

  return (
    <ProtectedRoute>
      <ModuleLearnings moduleId={Number(id)} />
    </ProtectedRoute>
  );
}
