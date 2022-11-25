import crypto from 'crypto';

export type Hash = {
  hash: string;
  salt: string;
};

const DIGEST = 'sha512';
const ENCODING = 'base64';
const ITERATIONS = 10000;
const KEY_LENGTH = 128;

export const hashPassword = (password: string): Promise<Hash> =>
  new Promise((resolve, reject) => {
    const salt = crypto.randomBytes(KEY_LENGTH).toString(ENCODING);
    crypto.pbkdf2(
      password,
      salt,
      ITERATIONS,
      KEY_LENGTH,
      DIGEST,
      (err, hash) => {
        if (err) reject(err);
        else
          resolve({
            hash: hash.toString(ENCODING),
            salt,
          });
      },
    );
  });

export const verifyPassword = (
  password: string,
  { hash, salt }: Hash,
): Promise<boolean> =>
  new Promise((resolve, reject) =>
    crypto.pbkdf2(
      password,
      salt,
      ITERATIONS,
      KEY_LENGTH,
      DIGEST,
      (err, hashAttempt) => {
        if (err) reject(err);
        else resolve(hashAttempt.toString(ENCODING) === hash);
      },
    ),
  );
