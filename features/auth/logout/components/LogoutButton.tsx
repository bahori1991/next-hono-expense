import { LogOutIcon } from "lucide-react";
import { headers } from "next/headers";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";

export function LogoutButton() {
  return (
    <form
      action={async () => {
        await auth.api.signOut({
          headers: await headers(),
        });
      }}
    >
      <Button
        variant="outline"
        type="submit"
        className="flex gap-2 items-center"
      >
        <LogOutIcon />
        <span>Logout</span>
      </Button>
    </form>
  );
}
