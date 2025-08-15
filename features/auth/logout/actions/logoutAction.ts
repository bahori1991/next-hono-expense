"use server";

import { headers } from "next/headers";
import { auth } from "@/server/auth";

export async function logoutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
}
