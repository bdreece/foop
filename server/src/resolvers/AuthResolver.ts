import { User } from '@generated/type-graphql';
import type { Context } from '../api/graphql';
import {
  Ctx,
  Resolver,
  Mutation,
  Query,
  InputType,
  Field,
  Arg,
  ObjectType,
} from 'type-graphql';

import { hashPassword, verifyPassword } from '../utils/password';
import {
  createAccessToken,
  createRefreshToken,
  decodeToken,
} from '../utils/token';

@InputType()
class AuthenticateUserInput {
  @Field()
  phone: string;

  @Field()
  password: string;
}

@ObjectType()
class AccessToken {
  @Field()
  accessToken: string;

  @Field()
  expiresIn: number;

  constructor(accessToken: string, expiresIn: number) {
    this.accessToken = accessToken;
    this.expiresIn = expiresIn;
  }
}

@Resolver()
class AuthResolver {
  @Mutation(returns => User)
  async registerUser(
    @Arg('input') { phone, password }: AuthenticateUserInput,
    @Ctx() { prisma: db }: Context,
  ) {
    const userExists =
      (await db.user.findUnique({
        where: {
          phone,
        },
        select: {
          id: true,
        },
      })) !== null;

    if (userExists) throw 'User already exists!';

    const { hash, salt } = await hashPassword(password);
    const user = await db.user.create({
      data: {
        phone,
        hash,
        salt,
        roles: {
          connectOrCreate: {
            where: {
              name: 'user',
            },
            create: {
              name: 'user',
            },
          },
        },
      },
    });

    return user;
  }

  @Mutation(returns => AccessToken)
  async loginUser(
    @Arg('input') { phone, password }: AuthenticateUserInput,
    @Ctx() { prisma: db, res }: Context,
  ) {
    const user = await db.user.findUnique({
      where: {
        phone,
      },
      select: {
        id: true,
        hash: true,
        salt: true,
        roles: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!user || !(await verifyPassword(password, { ...user })))
      throw 'Bad credentials!';

    const { id } = user;
    const roles = user.roles.map(role => role.name);
    const [accessToken, refreshToken] = await Promise.all([
      createAccessToken({ id, phone, roles }),
      createRefreshToken({ id, phone, roles }),
    ]);

    res.setHeader(
      'Set-Cookie',
      `RefreshToken=${refreshToken}; Path=/; SameSite=None; HttpOnly`,
    );

    return new AccessToken(accessToken, 60 * 60);
  }

  @Query(returns => AccessToken)
  async refreshUser(@Ctx() { prisma: db, req }: Context) {
    const refreshToken = req.cookies['RefreshToken'] as string;
    const principal = await decodeToken(refreshToken);
    const accessToken = await createAccessToken(principal);
    return new AccessToken(accessToken, 60 * 60);
  }
}

export default AuthResolver;
