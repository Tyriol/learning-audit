import ConfirmEmail from "@/app/components/ConfirmEmail/ConfirmEmail";

export default async function ConfirmEmailPage({ params }) {
  const { slug } = await params;
  const [id, token] = slug;

  return <ConfirmEmail id={id} token={token} />;
}
