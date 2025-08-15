import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function LoginLink() {
  return (
    <Link href="/login" className="flex gap-2 items-center">
      Please login to view this page <ArrowRight />
    </Link>
  );
}
