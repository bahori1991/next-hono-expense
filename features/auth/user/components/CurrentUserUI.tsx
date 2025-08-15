"use client";

import Link from "next/link";
import { LogoutButton } from "@/features/auth/logout/components/LogoutButton";
import { useCurrentUser } from "@/features/auth/user/hooks/useCurrentUser";

export function CurrentUserUI() {
  const { user, isPending, isError, error } = useCurrentUser();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!user) return <Link href="/login">Please login to view this page</Link>;

  return (
    <div className="flex flex-col gap-2">
      <p>Hello, {user.name}</p>
      <LogoutButton />
    </div>
  );
}
