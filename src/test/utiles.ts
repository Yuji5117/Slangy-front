import * as jose from "jose";
import { RestRequest } from "msw";

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

export const requireAuth = async (req: RestRequest) => {
  try {
    const encodedToken = req.headers.get("authorization");

    if (!encodedToken) {
      throw new Error("認証トークンが付与されていません。");
    }

    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jose.jwtVerify(encodedToken, secret, {
      issuer: "urn:example:issuer",
      audience: "urn:example:audience",
    });

    const tokenUserId = payload.id as string;

    const user = db.user.findFirst({
      where: {
        id: {
          equals: tokenUserId,
        },
      },
    });

    if (!user) {
      throw new Error("Unauthorized");
    }

    const sanitizedUser = { id: user.id, email: user.email };

    return sanitizedUser;
  } catch (error) {
    throw new Error("認証エラー");
  }
};
