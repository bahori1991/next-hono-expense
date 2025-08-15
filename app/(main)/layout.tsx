import { NavigationBar } from "@/components/navigationBar";

export default function MainLayout({
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
