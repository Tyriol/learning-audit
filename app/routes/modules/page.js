import ProtectedRoute from "../ProtectedRoute";
import ModuleList from "../../components/ModuleList/ModuleList";

export default function Modules() {
  return (
    <ProtectedRoute>
      <ModuleList />
    </ProtectedRoute>
  );
}
