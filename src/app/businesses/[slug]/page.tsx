export default async function BusinessPage({
  params, 
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <div>Individual Business Page {slug}</div>;
}