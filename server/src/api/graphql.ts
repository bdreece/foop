import type { Request, Response } from 'express';
import type { ContextFunction, BaseContext } from '@apollo/server';
import type { AuthRequest } from '../types/request';
import type { Principal } from '../types/principal';

import * as _ from 'lodash';
import { AuthChecker, buildTypeDefsAndResolvers } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PrismaClient } from '@prisma/client';

import { resolvers as prismaResolvers } from '@generated/type-graphql';
import AuthResolver from '../resolvers/AuthResolver';
import '../../prisma/decorate';

export type Context = BaseContext & {
  req: AuthRequest;
  res: Response;
  user: Principal;
  prisma: PrismaClient;
};

const context: ContextFunction<any[], Context> = async ({ req, res }) => ({
  req: req as AuthRequest,
  res,
  user: (req as AuthRequest).user,
  prisma: new PrismaClient(),
});

const authChecker: AuthChecker<Context> = ({ context: { user } }, roles) =>
  _.intersection(roles, user?.roles ?? []).length > 0;

export const createGraphQLMiddleware = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [...prismaResolvers, AuthResolver],
    authChecker,
  });

  const schema = makeExecutableSchema({ typeDefs, resolvers });
  const server = new ApolloServer({
    schema,
  });

  await server.start();
  return expressMiddleware(server, {
    context,
  });
};
