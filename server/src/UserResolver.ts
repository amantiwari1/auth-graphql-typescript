import {
  Arg,
  Ctx,
  Field,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "./entity/User";
import { hash, compare } from "bcryptjs";
import { MyContext } from "./MyContext";
import { createAccessToken, createRefreshToken } from "./auth";
import { isAuth } from "./isauth";
import { sendRequestToken } from "./sendRefreshToken";
import { getConnection } from "typeorm";
@ObjectType()
class LoginResponse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: MyContext) {
    return `authed ${payload!.userId}`;
  }

  @Query(() => [User])
  user() {
    return User.find();
  }
  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(@Arg("userId", () => Int) userId: number) {
    await getConnection()
      .getRepository(User)
      .increment({ id: userId }, "tokenVersion", 1);

    return true;
  }
  @Mutation(() => LoginResponse)
  async login(
    @Arg("email") email: string,
    @Arg("password") password: string,
    @Ctx() { res }: MyContext
  ): Promise<LoginResponse> {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("could not find user");
    }

    const valid = await compare(password, user.password);

    if (!valid) {
      throw new Error("wrong password");
    }
    sendRequestToken(res, createRefreshToken(user));
    return {
      accessToken: createAccessToken(user),
    };
  }
  @Mutation(() => Boolean)
  async register(
    @Arg("email") email: string,
    @Arg("password") password: string
  ) {
    try {
      const hashpassword = await hash(password, 12);

      await User.insert({
        email,
        password: hashpassword,
      });
    } catch (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
      return false;
    }
    return true;
  }
}
