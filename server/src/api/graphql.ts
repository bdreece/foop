import type { Request, Response } from 'express';
import type { ContextFunction, BaseContext } from '@apollo/server';
import type { AuthRequest } from '../types/request';
import type { Principal } from '../types/principal';

import * as _ from 'lodash';
import { AuthChecker, buildTypeDefsAndResolvers } from 'type-graphql';
import { ApolloServer } from '@apollo/server';
import type { Context } from 'types/context';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { PrismaClient } from '@prisma/client';

import { resolvers as prismaResolvers } from '@generated/type-graphql';
import customResolvers from '../graphql/resolvers';
import '../../prisma/decorate';

const prisma = new PrismaClient();

const context: ContextFunction<any[], Context> = async ({ req, res }) => ({
  req: req as AuthRequest,
  user: (req as AuthRequest).user,
  res,
  prisma,
});

const authChecker: AuthChecker<Context> = ({ context }, roles) =>
  _.intersection(roles ?? [], context.user?.roles ?? []).length > 0;

export const createGraphQLMiddleware = async () => {
  const { typeDefs, resolvers } = await buildTypeDefsAndResolvers({
    resolvers: [...prismaResolvers, ...customResolvers],
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
