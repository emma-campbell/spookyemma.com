import { makeRouteHandler } from '@keystatic/next/route-handler';
import config, { showAdminUI } from '../../../../keystatic.config';

export const { POST, GET } = (() => {
  if (showAdminUI === false) {
    return { 
      GET: () => new Response(null, { status: 404 }), 
      POST: () => new Response(null, { status: 404 }) 
    };
  }
  return makeRouteHandler({ config });
})();