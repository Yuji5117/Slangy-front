import { rest } from "msw";
import { v4 as uuid } from "uuid";

import { db, persistDb, removeFromDb } from "../db";

import { SlangTranslation } from "@/types";

export const favoritesHandlers = [
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
