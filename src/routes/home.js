import * as routes from './mod.js';

export const method = "GET";
export const path = "/";

export async function execute(ctx) {
  const isAllowed = await ctx.cookies.get('allowed');
    
  if (isAllowed) {
    const routesPaths = Object.entries(routes).filter([route, data] => (data.method === 'GET') && !['/', `/${Deno.env.get('SECRET')}`].includes(data.path));
    ctx.response.body = JSON.stringify(Object.fromEntries(routesPaths.map([route, data] => [route, data.path])), null, '  ');
  } else {
    console.log(`[secret request: ${ctx.request.ip}]: ${Deno.env.get('SECRET')}`)
    ctx.response.body = { message: `Kamu tidak terautentikasi nih, masukkan kode secret pada url ini (${ctx.request.url.origin + "/<secret>"})` };
  }
};
