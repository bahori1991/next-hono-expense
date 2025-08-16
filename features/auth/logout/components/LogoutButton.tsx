import { LogOutIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logoutAction } from "@/features/auth/logout/actions/logoutAction";

export function LogoutButton() {
  return (
    <form action={logoutAction}>
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
