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
        throw new Error(`${res.status} Server error`);
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
