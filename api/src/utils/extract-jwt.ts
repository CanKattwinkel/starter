import {Request} from 'express';
import {cookieNameJwt} from '@core/auth/xsrf-token';

export function extractJwt(req: Request): string | null {
  return req.cookies ? req.cookies[cookieNameJwt] : null;
}
