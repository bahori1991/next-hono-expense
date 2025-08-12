import { ExpensesTableContainer } from "@/features/expenses/containers/expensesTableContainer";

export default function ExpensesPage() {
  return (
    <>
      <h1 className="text-2xl font-bold">Expenses</h1>
      <ExpensesTableContainer />
    </>
  );
}
