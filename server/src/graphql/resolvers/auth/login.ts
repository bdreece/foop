import type { Context } from 'types/context';

import { Arg, Ctx, Field, InputType, Mutation, Resolver } from 'type-graphql';
import { AccessToken } from '../../types/token';
import { verifyPassword } from '../../../utils/password';
import { createAccessToken, createRefreshToken } from '../../../utils/token';

@InputType()
export class LoginUserInput {
  @Field()
  phone: string;
  @Field()
  password: string;
}

@Resolver()
class LoginResolver {
  @Mutation(_ => AccessToken)
  async loginUser(
    @Arg('input') { phone, password }: LoginUserInput,
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
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user || !(await verifyPassword(password, { ...user })))
      throw 'Bad credentials!';

    const { id } = user;
    const roles = user.roles.map(({ role: { name } }) => name);
    const [accessToken, refreshToken] = await Promise.all([
      createAccessToken({ id, phone, roles }),
      createRefreshToken({ id, phone, roles }),
    ]);

    res.setHeader(
      'Set-Cookie',
      `RefreshToken=${refreshToken}; Path=/; SameSite=Lax; HttpOnly`,
    );

    return new AccessToken(accessToken, 60 * 60);
  }

  @Mutation(_ => AccessToken)
  async loginDev(
    @Arg('input') { phone, password }: LoginUserInput,
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
            role: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    if (!user || !(await verifyPassword(password, { ...user })))
      throw 'Bad credentials!';

    const { id } = user;
    const roles = user.roles.map(({ role: { name } }) => name);
    const refreshToken = await createRefreshToken({ id, phone, roles });
    const accessToken = refreshToken;
    res.setHeader(
      'Set-Cookie',
      `RefreshToken=${refreshToken}; Path=/; SameSite=None; HttpOnly`,
    );

    return new AccessToken(accessToken, 60 * 60 * 24 * 7 * 52 * 10);
  }
}

export default LoginResolver;
