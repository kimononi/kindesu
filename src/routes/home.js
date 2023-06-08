import * as routes from './mod.js';

export const method = "GET";
export const path = "/";

export async function execute(ctx) {
  const isAllowed = await ctx.cookies.get('allowed');
    
  if (isAllowed) {
    const routesPaths = Object.entries(routes).filter([route, data] => (data.method === 'GET') && !['/', `/${Deno.env.get('SECRET')}`].includes(data.path));
    ctx.response.body = JSON.stringify({});
  } else {
    console.log(`[secret request: ${ctx.request.ip}]: ${Deno.env.get('SECRET')}`)
    ctx.response.body = `Kamu admin? kalau iya, silahkan pergi ke ${ctx.request.url.origin}/<secret> untuk akses website ini ^^\n* secret bisa diambil di panel deno deploy`
  }
};
