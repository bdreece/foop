import type { Context } from 'types/context';
import { Ctx, Query, Resolver } from 'type-graphql';
import { AccessToken } from '../../types/token';
import { createAccessToken, decodeToken } from '../../../utils/token';

@Resolver()
class RefreshResolver {
  @Query(_ => AccessToken)
  async refreshUser(@Ctx() { req }: Context) {
    const refreshToken = req.cookies['RefreshToken'] as string;
    const principal = await decodeToken(refreshToken);
    const accessToken = await createAccessToken(principal);
    return new AccessToken(accessToken, 60 * 60);
  }
}

export default RefreshResolver;
