import { createMiddleware } from "hono/factory";
import { auth } from "@/server/auth";

type Env = {
  Variables: {
    user: {
      email: string;
      name: string;
      image: string | null | undefined;
    };
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

    const user = {
      email: session.user.email,
      name: session.user.name,
      image: session.user.image,
    };

    c.set("user", user);
    return next();
  } catch (error) {
    return c.json({ error: "Internal Server Error", details: error }, 500);
  }
});
