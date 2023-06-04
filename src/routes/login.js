export default {
  method: "GET",
  path: `/${Deno.env.get('SECRET')}`,
  async execute(ctx) {
    await ctx.cookies.set('allowed', 'true');
    ctx.response.redirect('/');
  }
}
