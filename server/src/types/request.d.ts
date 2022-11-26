import type { Request as ExpressRequest } from 'express';
import type { Principal } from './principal';

export type AuthRequest = ExpressRequest & {
  user?: Principal;
};
