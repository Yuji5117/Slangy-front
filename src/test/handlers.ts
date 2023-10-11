import { rest } from "msw";
import { v4 as uuid } from "uuid";

import { db, persistDb, removeFromDb } from "./db";
import { authenticate } from "./utiles";

import { SlangTranslation } from "@/types";

export const handlers = [
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

      if (!existingEmail) {
        throw new Error("このメールアドレスは、既に登録されています。");
      }

      db.user.create({
        id: uuid(),
        email: userObject.email,
        // TODO: パスワードをhash化させる。
        password: userObject.password,
      });

      persistDb("user");

      const result = authenticate({
        email: userObject.email,
        password: userObject.password,
      });
      return res(ctx.json(result));
    } catch (error) {
      return res(
        ctx.status(400),
        ctx.json({ message: error || "Server Error" })
      );
    }
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

  rest.get("/favorite", (req, res, ctx) => {
    const targetWord = req.url.searchParams.get("targetWord");

    if (!targetWord) {
      return res(
        ctx.status(400),
        ctx.text("targetWordパラメーターは必須です。")
      );
    }

    const slangTranslation: SlangTranslation | null =
      db.slangTranslation.findFirst({
        where: {
          targetWord: {
            equals: targetWord,
          },
        },
      });

    return res(ctx.status(200), ctx.json(slangTranslation));
  }),

  rest.get("/favorites", (_, res, ctx) => {
    const slangTranslations: SlangTranslation[] = db.slangTranslation.getAll();
    return res(ctx.status(200), ctx.json(slangTranslations));
  }),

  rest.post("/favorites", async (req, res, ctx) => {
    const { language, targetWord, result } = await req.json();

    const slangTranslation: SlangTranslation = db.slangTranslation.create({
      id: uuid(),
      language,
      targetWord,
      result,
    });

    persistDb("slangTranslation");
    return res(ctx.status(201), ctx.json(slangTranslation));
  }),

  rest.delete("/favorites/:id", async (req, res, ctx) => {
    const id = req.params.id as string;

    const slangTranslation = db.slangTranslation.delete({
      where: {
        id: {
          equals: id,
        },
      },
    });

    persistDb("slangTranslation");
    return res(ctx.status(201), ctx.json(slangTranslation));
  }),

  rest.delete("/favorites", async (_, res, ctx) => {
    const slangTranslation = db.slangTranslation.deleteMany({ where: {} });

    removeFromDb("slangTranslation");
    return res(ctx.status(201), ctx.json(slangTranslation));
  }),
];
