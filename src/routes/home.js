import * as routes from './mod.js';

export default {
  method: 'GET',
  path: '/',
  async execute(ctx) {
    const isAllowed = await ctx.cookies.get('allowed');
    
    if (isAllowed) {
      const routesPaths = Object.values(routes).filter(route => (route.default.method === 'GET') && !['/', `/${Deno.env.get('SECRET')}`].includes(route.default.path));
      ctx.response.body = `Welcome bek bang admin^^!\n\n${routesPaths.map(route => route.default.path).join(" ")}`
    } else {
      console.log(`[secret request: ${ctx.request.ip}]: ${Deno.env.get('SECRET')}`)
      ctx.response.body = `Kamu admin? kalau iya, silahkan pergi ke ${ctx.request.url.origin}/<secret> untuk akses website ini ^^\n* secret bisa diambil di panel deno deploy`
    }
  }
}
