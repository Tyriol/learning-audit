import PasswordResetForm from "@/app/components/FormsSections/PasswordResetForm/PasswordResetForm";

export default async function ResetPassword({ params }) {
  const { slug } = await params;
  const [id, token] = slug;

  return <PasswordResetForm id={id} token={token} />;
}
