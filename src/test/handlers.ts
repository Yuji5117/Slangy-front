import { rest } from "msw";

import { db, persistDb } from "./db";

type User = {
  id: number;
  email: string;
  password: string;
};

export const handlers = [
  rest.get("/auth/register", (_, res, ctx) => {
    const users: User[] = db.user.getAll();
    return res(ctx.status(200), ctx.json({ users }));
  }),

  rest.post("/auth/register", async (req, res, ctx) => {
    const { email, password } = await req.json();
    const usersCount = db.user.count() + 1;
    const user = db.user.create({ id: usersCount, email, password });

    persistDb("user");
    return res(ctx.status(200), ctx.json(user));
  }),

  rest.post("/auth/login", async (req, res, ctx) => {
    const { email, password } = await req.json();

    const targetUser = db.user.findFirst({
      where: { email: { equals: email } },
    });

    if (targetUser?.password !== password) {
      return res(
        ctx.status(403),
        ctx.json({ message: "メールアドレスかパスワードが間違っております。" })
      );
    }

    return res(ctx.status(200), ctx.json({ token: `token_${password}` }));
  }),
];
