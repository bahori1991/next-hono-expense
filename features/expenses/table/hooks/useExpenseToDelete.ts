import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { Expense } from "@/lib/db/schemas/expenses";
import { createHonoClient } from "@/lib/honoClient";
import { queryKeys } from "@/lib/queryKeys";

export function useExpenseToDelete(id: number) {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ id }: { id: number }) => {
      const client = await createHonoClient();
      const res = await client.api.expenses[":id{[0-9]+}"].$delete({
        param: {
          id: id.toString(),
        },
      });
      if (!res.ok) {
        throw new Error("Server error has occurred while deleting expenses");
      }
    },
    onSuccess: () => {
      toast(`Expense: ${id} has been deleted`);

      queryClient.setQueryData(
        queryKeys.expenses.lists(),
        (existingExpenses: Expense[]) => {
          return existingExpenses.filter((expense) => expense.id !== id);
        },
      );
    },
    onError: () => {
      toast(`Failed to delete expense: ${id}`);
    },
  });

  return mutation;
}
