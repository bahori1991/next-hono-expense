import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function LinkToLogin() {
  return (
    <Link href="/login" className="flex gap-2 items-center">
      Please login to view this page <ArrowRight />
    </Link>
  );
}
