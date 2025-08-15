import { type ClientRequestOptions, hc } from "hono/client";
import type { AppType } from "@/app/api/[[...route]]/route";
import { env } from "@/lib/env";

let clientCachedOptions: ClientRequestOptions | null = null;

async function getClientRequestOptions(): Promise<ClientRequestOptions> {
  if (typeof window === "undefined") {
    const { cookies } = await import("next/headers");
    const { headers: nextHeaders } = await import("next/headers");

    const cookieHeader = (await cookies())
      .getAll()
      .map((c) => `${c.name}=${c.value}`)
      .join("; ");
    const incomingHeaders = new Headers(await nextHeaders());

    return {
      fetch: (input: RequestInfo | URL, init?: RequestInit) =>
        fetch(input, {
          ...init,
          headers: {
            ...Object.fromEntries(incomingHeaders),
            ...init?.headers,
            Cookie: cookieHeader,
          },
        }),
    };
  } else {
    if (!clientCachedOptions) {
      clientCachedOptions = {
        fetch: (input: RequestInfo | URL, init?: RequestInit) =>
          fetch(input, {
            ...init,
            credentials: "include",
          }),
      };
    }
    return clientCachedOptions;
  }
}

export async function createHonoClient(): Promise<
  ReturnType<typeof hc<AppType>>
> {
  const options = await getClientRequestOptions();
  return hc<AppType>(env.NEXT_PUBLIC_APP_URL, options);
}
