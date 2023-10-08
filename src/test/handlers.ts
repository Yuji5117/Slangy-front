import { rest } from "msw";

type User = {
  id: number;
  email: string;
  password: string;
};

const users: User[] = [
  { id: 1, email: "abc123@gmail.com", password: "12345678" },
  { id: 2, email: "abf127@gmail.com", password: "12345678nt" },
];

export const handlers = [
  rest.get("/auth/register", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ users }));
  }),

  rest.post("/auth/register", async (req, res, ctx) => {
    const { email, password } = await req.json();
    const usersCount = users.length + 1;
    users.push({ id: usersCount, email, password });
    return res(ctx.status(200), ctx.json({ email, password }));
  }),

  rest.post("/auth/login", async (req, res, ctx) => {
    const { email, password } = await req.json();

    const targetUser = users.find((user) => user.email === email);

    if (targetUser?.password === password) {
      return res(ctx.status(200), ctx.json({ token: `token_${password}` }));
    }
    return res(
      ctx.status(403),
      ctx.json({ message: "メールアドレスかパスワードが間違っております。" })
    );
  }),
];
