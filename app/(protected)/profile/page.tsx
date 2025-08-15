import { CurrentUserUI } from "@/features/auth/user/components/CurrentUserUI";

export default function ProfilePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Profile</h1>
      <CurrentUserUI />
    </div>
  );
}
