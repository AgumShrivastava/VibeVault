
// This layout can be minimal, as auth pages often don't have the main header/footer.
// However, for consistency in this example, we'll just pass children through.
// The pages themselves will define the centered layout.

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
