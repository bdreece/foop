import type { Principal } from '../types/principal';
import jwt from 'jsonwebtoken';

const AUDIENCE = process.env.AUDIENCE || 'foop';
const ISSUER = process.env.ISSUER || 'foop';
const SECRET = process.env.SECRET || 'secret';

const createToken = (
  principal: Principal,
  expiresIn: number,
): Promise<string> =>
  new Promise((resolve, reject) =>
    jwt.sign(
      { sub: JSON.stringify(principal) },
      SECRET,
      { expiresIn, audience: AUDIENCE, issuer: ISSUER },
      (err, encoded) => {
        if (err) reject(err);
        else resolve(encoded);
      },
    ),
  );

export const decodeToken = (token: string): Promise<Principal> =>
  new Promise((resolve, reject) =>
    jwt.verify(
      token,
      SECRET,
      { audience: AUDIENCE, issuer: ISSUER, complete: true },
      (err, decoded) => {
        if (err) reject(err);
        else
          resolve(
            JSON.parse((decoded.payload as jwt.JwtPayload).sub) as Principal,
          );
      },
    ),
  );

export const createAccessToken = (principal: Principal) =>
  createToken(principal, 60 * 60);

export const createRefreshToken = (principal: Principal) =>
  createToken(principal, 60 * 60 * 24 * 7 * 52 * 10);
