import { NavigationBar } from "@/components/navigationBar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavigationBar />
      <div className="p-2">{children}</div>
    </>
  );
}
