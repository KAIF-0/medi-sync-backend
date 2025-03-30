import type { Context } from "hono";
import { HTTPException } from "hono/http-exception";
import { decode, verify } from "hono/jwt";
import { decryptKey } from "../utils/decryptKey";

export const verifyAuth = async (c: Context, next: () => Promise<void>) => {
  let token;
  try {
    if (
      c.req.header("authorization") &&
      c.req.header("authorization")?.startsWith("Bearer")
    ) {
      token =
        c.req.header("authorization")?.split(" ")[1] ||
        c.req.header("authorization")?.slice(6);
    }

    if (!token) {
      throw new Error("Token not found!");
    }

    const decoded = await decryptKey(token);

    console.log(decoded);
    c.set("user", decoded);

    await next();
  } catch (err: any) {
    // console.error(err);
    throw new HTTPException(401, {
      message: err.message,
    });
  }
};
