import { headers } from "next/headers";
import { LoginLink } from "@/features/auth/login/components/LoginLink";
import { auth } from "@/server/auth";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <LoginLink />;
  }

  return <>{children}</>;
}
