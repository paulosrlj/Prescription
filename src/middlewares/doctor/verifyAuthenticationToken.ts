import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface Payload {
  sub: string;
  iat: number;
  exp: number;
  crm: string;
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
    const { sub, crm } = verify(tokenCripto[1], tokenKey) as Payload;
    request.doctor_id = sub;
    request.doctor_crm = crm;
    return next();
  } catch (error) {
    return response.status(401).json({ message: 'Token is not valid' });
  }
}
