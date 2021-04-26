import { verify } from "jsonwebtoken";
import { MiddlewareFn, NextFn, ResolverData } from "type-graphql";
import { MyContext } from "./MyContext";

export const isAuth: MiddlewareFn<MyContext> = async (
  { context }: ResolverData<MyContext>,
  next: NextFn
) => {
  const authorization = context.req.headers["authorization"];
  if (!authorization) {
    throw new Error("not authorization");
  }
  try {
    const token = authorization?.split(" ")[1];

    const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);

    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Not authorized");
  }
  return next();
};
