import { headers } from "next/headers";
import { LinkToLogin } from "@/features/auth/login/components/LinkToLogin";
import { auth } from "@/lib/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <LinkToLogin />;
  }

  return <>{children}</>;
}
