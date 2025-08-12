import { hc } from "hono/client";
import { cookies, headers as nextHeaders } from "next/headers";
import type { AppType } from "@/app/api/[[...route]]/route";
import { env } from "@/lib/env";

export async function createHonoClient() {
  const isServer = typeof window === "undefined";

  if (isServer) {
    const cookieHeader = (await cookies())
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    const incomingHeaders = new Headers(await nextHeaders());

    return hc<AppType>(env.NEXT_PUBLIC_APP_URL, {
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, {
          ...init,
          headers: {
            ...Object.fromEntries(incomingHeaders),
            ...init?.headers,
            Cookie: cookieHeader,
          },
        }),
    });
  } else {
    return hc<AppType>(env.NEXT_PUBLIC_APP_URL, {
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, {
          ...init,
          credentials: "include",
        }),
    });
  }
}
