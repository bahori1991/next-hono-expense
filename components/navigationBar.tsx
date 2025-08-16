import Link from "next/link";
import { NavLink } from "@/components/navLink";

export function NavigationBar() {
  return (
    <>
      <nav className="flex justify-between items-baseline p-2 max-w-2xl m-auto">
        <Link href="/">
          <h1 className="text-2xl font-extrabold">Expense Tracker</h1>
        </Link>
        <div className="flex gap-2 items-center">
          <NavLink href="/about">About</NavLink>
          <NavLink href="/expenses">Expenses</NavLink>
          <NavLink href="/create-expense">Create</NavLink>
          <NavLink href="/profile">Profile</NavLink>
        </div>
      </nav>
      <hr className="border-1" />
    </>
  );
}
