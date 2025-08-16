"use client";

import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useExpenseToDelete } from "@/features/expenses/table/hooks/useExpenseToDelete";

export function DeleteExpenseButton({ id }: { id: number }) {
  const { mutate, isPending } = useExpenseToDelete(id);

  return (
    <Button
      onClick={() => mutate({ id })}
      disabled={isPending}
      variant="ghost"
      size="icon"
    >
      {isPending ? "..." : <Trash2 className="h-4 w-4" />}
    </Button>
  );
}
