import { discord ) from '../deps.js';
import * as commands from '../commands/mod.js';

export default {
  method: 'GET',
  path: '/deploy',
  async execute(ctx) {
    const isAllowed = await ctx.cookies.has('allowed');
    if (!isAllowed) {
      return ctx.response.redirect('/');
    } else {
      const { branch } = ctx.app.state;
      const body = Object.values(commands).map(cmd => cmd.default.data);
      
      const deployRequest = await fetch(discord.RouteBases.api + discord.Routes.applicationCommands(Deno.env.get(`${branch}_ID`)), {
        method: 'PUT',
        headers: { Authorization: `Bot ${Deno.env.get(`${branch}_TOKEN`)}` },
        body
      });
      const deployResult = await deployRequest.body();
      
      ctx.response.body = JSON.stringify(deployResult, null, ' ');
    }
  }
}
