import ProtectedRoute from "../../ProtectedRoute";

export default async function Modules({ params }) {
  const { slug } = await params;
  const [id] = slug;

  return (
    <ProtectedRoute>
      <h2>{id}</h2>
    </ProtectedRoute>
  );
}
