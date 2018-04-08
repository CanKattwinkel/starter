import {Request} from 'express';
import {cookieNameJwt} from '@core/auth/xsrf-token';

export function extractJwt(req: Request): string | null {
  console.log(`TOKEN IS: '${req.cookies ? req.cookies[cookieNameJwt] : null}'`);
  return req.cookies ? req.cookies[cookieNameJwt] : null;
}
