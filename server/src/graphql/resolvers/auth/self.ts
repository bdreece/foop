import type { Context } from 'types/context';
import { User } from '@generated/type-graphql';
import { Ctx, Resolver, Query } from 'type-graphql';

@Resolver()
class SelfResolver {
  @Query(_ => User)
  async self(@Ctx() { prisma: db, user: { id } }: Context) {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });

    return user;
  }
}

export default SelfResolver;
