export default function BusinessesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-white">
      {children}
    </section>
  );
}