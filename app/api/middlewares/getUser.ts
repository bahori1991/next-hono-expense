import { createMiddleware } from "hono/factory";
import { auth } from "@/lib/auth";

type Env = {
  Variables: {
    user: typeof auth.$Infer.Session.user;
  };
};

export const getUser = createMiddleware<Env>(async (c, next) => {
  try {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });

    if (!session) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    c.set("user", session.user);
    return next();
  } catch (error) {
    return c.json({ error: "Internal Server Error", details: error }, 500);
  }
});
