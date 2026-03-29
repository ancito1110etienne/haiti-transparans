import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    '/((?!api|_next|geo|images|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
