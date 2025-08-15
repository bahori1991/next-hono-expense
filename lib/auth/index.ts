import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { db } from "@/db";
import * as authSchema from "@/lib/db/schemas/auth";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema: authSchema,
    usePlural: true,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
});
