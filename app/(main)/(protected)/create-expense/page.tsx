import { CreateExpenseForm } from "@/features/expenses/create/components/createExpenseForm";

export default function CreateExpensePage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Create Expense</h1>
      <CreateExpenseForm />
    </>
  );
}
