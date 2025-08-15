import z from "zod";

export const registerSchema = z.object({
  name: z.string({ error: "Name is required" }).min(1),
  email: z.email({ error: "Email is required" }),
  password: z.string({ error: "Password is required" }).min(1),
});
