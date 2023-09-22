import { rest } from "msw";

export const handlers = [
  rest.post("/favorite", (_, res, ctx) => {
    return res(ctx.status(200), ctx.json({ message: "success!" }));
  }),
];
