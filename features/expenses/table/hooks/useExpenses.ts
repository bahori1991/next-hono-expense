import { useQuery } from "@tanstack/react-query";
import { createHonoClient } from "@/lib/honoClient";
import { queryKeys } from "@/lib/queryKeys";

export function useExpenses() {
  const {
    data: expenses,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: queryKeys.expenses.lists(),
    queryFn: async () => {
      const client = await createHonoClient();
      const res = await client.api.expenses.$get();
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const { expenses } = await res.json();
      return expenses;
    },
    select: (data) =>
      data.map((expense) => ({
        ...expense,
        date: new Date(expense.date),
      })),
  });

  return { expenses, isPending, isError, error };
}
