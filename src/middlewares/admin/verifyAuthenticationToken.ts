import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
  iat: number;
  exp: number;
  admin_secret;
}

export function verifyAuthenticationToken(
  request: Request,
  response: Response,
  next: NextFunction,
): void | Response<any, Record<string, any>> {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({ message: 'Token is missing' });
  }

  const tokenKey = process.env.TOKEN_KEY || '';
  const tokenCripto = token.split(' ');

  try {
    const { admin_secret } = verify(tokenCripto[1], tokenKey) as Payload;
    request.admin_secret = admin_secret;

    if (!(admin_secret === process.env.ADMIN_SECRET))
      return response.status(401).json({ message: 'Token is not valid' });
    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Token is not valid' });
  }
}
