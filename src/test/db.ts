import { factory, primaryKey } from "@mswjs/data";

const models = {
  slangWord: {
    id: primaryKey(Number),
    sourceWord: String,
    result: String,
  },
};

export const db = factory(models);
