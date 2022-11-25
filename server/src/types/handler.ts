import type { RequestHandler as ExpressHandler } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { Response } from './response';

export type Handler<TData = undefined, TError = any> = ExpressHandler<
  ParamsDictionary,
  Response<TData, TError>
>;
