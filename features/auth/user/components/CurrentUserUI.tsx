"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LogoutButton } from "@/features/auth/logout/components/LogoutButton";
import { useCurrentUser } from "@/features/auth/user/hooks/useCurrentUser";

export function CurrentUserUI() {
  const { user, isPending, isError, error } = useCurrentUser();

  if (isPending) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!user) return <Link href="/login">Please login to view this page</Link>;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src={user.image ?? ""} alt={user.name} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <p>Hello, {user.name}</p>
      </div>
      <LogoutButton />
    </div>
  );
}
