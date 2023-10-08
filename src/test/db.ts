import { factory, primaryKey } from "@mswjs/data";

const models = {
  user: {
    id: primaryKey(Number),
    email: String,
    password: String,
  },
};

export const db = factory(models);

export type Model = keyof typeof db;

// localStorageからデータ取得
export const loadDb = () =>
  Object.assign(JSON.parse(window.localStorage.getItem("msw-db") || "{}"));

// localStorageへデータ保存
export const persistDb = (model: Model) => {
  if (process.env.NODE_ENV === "test") return;
  const data = loadDb();
  // eslint-disable-next-line
  console.log("model", model);
  console.log("dbのmodel", db);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  data[model] = db[model].getAll();
  window.localStorage.setItem("msw-db", JSON.stringify(data));
};

export const initializeDb = () => {
  const database = loadDb();
  console.log({ database });
  Object.entries(db).forEach(([key, model]) => {
    const dataEntres = database[key];
    if (dataEntres) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      dataEntres?.forEach((entry: Record<string, any>) => {
        model.create(entry);
      });
    }
  });
};

// // localStorageをリセット
export const resetDb = () => {
  window.localStorage.clear();
};

initializeDb();
