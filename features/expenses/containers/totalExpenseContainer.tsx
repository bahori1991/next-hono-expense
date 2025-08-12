import { TotalExpenseCard } from "@/features/expenses/ui/totalExpenseCard";
import { createHonoClient } from "@/lib/client";

async function TotalExpenseValue() {
  const client = await createHonoClient();
  const res = await client.api.expenses["total-spent"].$get();
  const { total } = await res.json();

  return <p>{total}</p>;
}

export async function TotalExpenseContainer() {
  return (
    <TotalExpenseCard>
      <TotalExpenseValue />
    </TotalExpenseCard>
  );
}
