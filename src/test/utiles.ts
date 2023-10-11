import jwt from "jsonwebtoken";

import { db } from "./db";

import { JWT_SECRET } from "@/config";

export const authenticate = ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const user = db.user.findFirst({
    where: {
      email: { equals: email },
    },
  });

  if (user?.password === password) {
    const snitizedUser = { id: user?.id, email: user?.email };
    const encodedToken = jwt.sign(snitizedUser, JWT_SECRET);
    return { user: snitizedUser, jwt: encodedToken };
  }

  const error = new Error("無効なユーザー名とパスワードです。");
  throw error;
};
