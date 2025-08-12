import { NavLink } from "@/components/navLink";

export function NavigationBar() {
  return (
    <>
      <nav className="flex gap-3 p-2">
        <NavLink href="/">Home</NavLink>
        <NavLink href="/about">About</NavLink>
        <NavLink href="/expenses">Expenses</NavLink>
        <NavLink href="/create-expense">Create</NavLink>
      </nav>
      <hr />
    </>
  );
}
