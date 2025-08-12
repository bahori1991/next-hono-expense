import { CreateExpenseContainer } from "@/features/expenses/containers/createExpenseContainer";

export default function CreateExpensePage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Create Expense</h1>
      <CreateExpenseContainer />
    </>
  );
}
