import type { BaseContext } from '@apollo/server';
import type { Response } from 'express';
import type { AuthRequest } from './request';
import type { Principal } from './principal';
import type { PrismaClient } from '@prisma/client';

export type Context = BaseContext & {
  req: AuthRequest;
  res: Response;
  user?: Principal;
  prisma: PrismaClient;
};
