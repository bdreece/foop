import type { Context } from 'types/context';
import { User } from '@generated/type-graphql';
import { Ctx, Resolver, Mutation } from 'type-graphql';

@Resolver()
class LogoutResolver {
  @Mutation(_ => User)
  logout(@Ctx() { res, user }: Context) {
    res.setHeader(
      'Set-Cookie',
      'RefreshToken=undefined; Max-Age=0; Path=/; SameSite=Lax; HttpOnly',
    );

    return user;
  }
}

export default LogoutResolver;
