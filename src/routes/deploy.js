import {
  RouteBases,
  Routes
} from 'discord_api_types/v10.ts';
import * as commands from '../commands/mod.js';

export const method = 'GET';
export const path = '/deploy';
  
export async function execute(ctx) {
  const isAllowed = await ctx.cookies.has('allowed');
    
  if (!isAllowed) {
    return ctx.response.redirect('/');
  } else {
    const branch = ctx.request.url.host.includes('--') ? ctx.request.url.host.split('--')[1].split('.deno.dev')[0].toUpperCase() : 'PROD';
    const body = JSON.stringify(Object.values(commands).map(cmd => cmd.data));
    console.log(body);
      
    const deployRequest = await fetch(RouteBases.api + Routes.applicationCommands(Deno.env.get(`${branch}_ID`)), {
      method: 'PUT',
      headers: {
        Authorization: `Bot ${Deno.env.get(`${branch}_TOKEN`)}`,
        'content-type': 'application/json'
      },
      body
    });
    const deployResult = await deployRequest.json();
      
    ctx.response.body = JSON.stringify(deployResult, null, '  ');
  }
};
