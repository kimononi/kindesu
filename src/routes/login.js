export default {
  method: "GET",
  path: Deno.env.get('SECRET'),
  async execute(ctx) {
    ctx.cookies.set('allowed', true);
    ctx.response.redirect('/');
  }
}
