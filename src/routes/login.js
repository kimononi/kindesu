export const method = "GET";
export const path = `/${Deno.env.get('SECRET')}`;
  
export async function execute(ctx) {
  await ctx.cookies.set('allowed', 'true');
  ctx.response.redirect('/');
};
