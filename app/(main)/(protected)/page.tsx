import { TotalExpenseContainer } from "@/features/expenses/total/components/TotalExpenseContainer";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Home</h1>
      <TotalExpenseContainer />
    </div>
  );
}
