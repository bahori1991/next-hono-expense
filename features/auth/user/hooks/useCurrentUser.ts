import { useQuery } from "@tanstack/react-query";
import { createHonoClient } from "@/lib/honoClient";
import { queryKeys } from "@/lib/queryKeys";

export function useCurrentUser() {
  const {
    data: user,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: async () => {
      const client = await createHonoClient();
      const res = await client.api.auth.me.$get();

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("401 Unauthorized");
        }
        throw new Error(`500 Internal Server Error`);
      }

      const user = await res.json();
      return user;
    },
  });

  return { user, isPending, isError, error };
}
