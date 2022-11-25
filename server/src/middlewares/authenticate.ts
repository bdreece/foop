import type { Handler } from '../types/handler';
import type { AuthRequest } from 'types/request';

import { decodeToken } from '../utils/token';

const authenticate: Handler = async (req: AuthRequest, res, next) => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.substring('Bearer '.length);
    const principal = await decodeToken(token);
    req.user = principal;
  } catch (error: any) {
    console.error(error);
  } finally {
    next();
  }
};

export default authenticate;
