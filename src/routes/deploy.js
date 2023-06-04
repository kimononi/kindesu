import { discord } from '../deps.js';
import * as commands from '../commands/mod.js';

export default {
  method: 'GET',
  path: '/deploy',
  async execute(ctx) {
    const isAllowed = await ctx.cookies.has('allowed');
    
    if (!isAllowed) {
      return ctx.response.redirect('/');
    } else {
      console.log('executing deploy');
      const branch = ctx.request.url.host.includes('--') ? ctx.request.url.host.split('--')[1].split('.deno.dev')[0].toUpperCase() : 'PROD';
      const body = Object.values(commands).map(cmd => cmd.default.data);
      
      const deployRequest = await fetch(discord.RouteBases.api + discord.Routes.applicationCommands(Deno.env.get(`${branch}_ID`)), {
        method: 'PUT',
        headers: { Authorization: `Bot ${Deno.env.get(`${branch}_TOKEN`)}` },
        body
      });
      const deployResult = await deployRequest.json();
      
      ctx.response.body = JSON.stringify(deployResult, null, ' ');
    }
  }
}
