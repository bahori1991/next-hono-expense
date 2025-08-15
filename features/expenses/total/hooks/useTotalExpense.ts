import { useQuery } from "@tanstack/react-query";
import { createHonoClient } from "@/lib/honoClient";
import { queryKeys } from "@/lib/queryKeys";

export function useTotalExpense() {
  const {
    data: total,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.expenses.total(),
    queryFn: async () => {
      const client = await createHonoClient();
      const res = await client.api.expenses["total-spent"].$get();

      if (!res.ok) {
        if (res.status === 401) {
          throw new Error("401 Unauthorized");
        }
        throw new Error(`500 Internal Server Error`);
      }

      const { total } = await res.json();
      return total;
    },
  });

  return {
    total,
    isPending,
    isError,
    error,
  };
}
