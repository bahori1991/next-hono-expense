import { drizzle } from "drizzle-orm/libsql";
import * as authSchema from "@/lib/db/schemas/auth";
import * as expensesSchema from "@/lib/db/schemas/expenses";
import { env } from "@/lib/env";

const schema = { ...authSchema, ...expensesSchema };

export const db = drizzle({
  connection: {
    url: env.TURSO_CONNECTION_URL,
    authToken: env.TURSO_AUTH_TOKEN,
  },
  schema,
});
