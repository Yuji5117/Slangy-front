import { rest } from "msw";
import { v4 as uuid } from "uuid";

import { db, persistDb } from "../db";
import { authenticate } from "../utiles";

export const authHandlers = [
  rest.get("/auth/me", (req, res, ctx) => {
    console.log("req.headers", req.headers.get("Authorization"));
    // const user: AuthUser = db.user.findFirst({
    //   where: {
    //     email: req.headers.get("Authorization"),
    //   },
    // });
    return res(ctx.status(200), ctx.json({ user: "test" }));
  }),

  rest.post("/auth/register", async (req, res, ctx) => {
    try {
      const userObject = await req.json();
      const existingEmail = db.user.findFirst({
        where: {
          email: {
            equals: userObject.email,
          },
        },
      });

      if (existingEmail) {
        throw new Error("このメールアドレスは、既に登録されています。");
      }

      db.user.create({
        id: uuid(),
        email: userObject.email,
        // TODO: パスワードをhash化させる。
        password: userObject.password,
      });

      persistDb("user");

      const result = await authenticate({
        email: userObject.email,
        password: userObject.password,
      });
      return res(ctx.status(201), ctx.json(result));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server Error";
      return res(ctx.status(400), ctx.json({ message }));
    }
  }),

  rest.post("/auth/login", async (req, res, ctx) => {
    try {
      const credentials = await req.json();

      const result = await authenticate(credentials);

      return res(ctx.status(200), ctx.json(result));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unauthorized";
      return res(ctx.status(401), ctx.json({ message }));
    }
  }),
];