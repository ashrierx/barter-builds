export default function BusinessesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      <h1>Businesses</h1>
      {children}
    </section>
  );
}