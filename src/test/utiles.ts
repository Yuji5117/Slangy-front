import * as jose from "jose";

import { db } from "./db";

import { JWT_SECRET } from "@/config";

export const authenticate = async ({
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
    const sanitizedUser = { id: user?.id, email: user?.email };
    const alg = "HS256";
    const secret = new TextEncoder().encode(JWT_SECRET);
    const encodedToken = await new jose.SignJWT(sanitizedUser)
      .setProtectedHeader({ alg })
      .setIssuedAt()
      .setIssuer("urn:example:issuer")
      .setAudience("urn:example:audience")
      .setExpirationTime("2h")
      .sign(secret);
    return { user: sanitizedUser, jwt: encodedToken };
  }

  const error = new Error("無効なユーザー名とパスワードです。");
  throw error;
};
