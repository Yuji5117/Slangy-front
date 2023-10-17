import { rest } from "msw";
import { v4 as uuid } from "uuid";

import { db, persistDb, removeFromDb } from "../db";
import { requireAuth } from "../utiles";

export const favoritesHandlers = [
  rest.get("/favorite", async (req, res, ctx) => {
    const targetWord = req.url.searchParams.get("targetWord");
    const { id: userId } = await requireAuth(req);

    if (!targetWord) {
      return res(
        ctx.status(400),
        ctx.text("targetWordパラメーターは必須です。")
      );
    }

    const slangTranslation = db.slangTranslation.findFirst({
      where: {
        targetWord: {
          equals: targetWord,
        },
        userId: { equals: userId },
      },
    });

    return res(ctx.status(200), ctx.json(slangTranslation));
  }),

  rest.get("/favorites", async (req, res, ctx) => {
    const { id: userId } = await requireAuth(req);

    const slangTranslations = db.slangTranslation.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    });

    return res(ctx.status(200), ctx.json(slangTranslations));
  }),

  rest.post("/favorites", async (req, res, ctx) => {
    try {
      const { language, targetWord, result } = await req.json();
      const { id: userId } = await requireAuth(req);

      if (!userId) {
        throw new Error("認証されていません");
      }

      const slangTranslation = db.slangTranslation.create({
        id: uuid(),
        language,
        targetWord,
        result,
        userId,
      });

      persistDb("slangTranslation");
      return res(ctx.status(201), ctx.json(slangTranslation));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Server Error";
      return res(ctx.delay(1000), ctx.json({ message }));
    }
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
