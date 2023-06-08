import {
  sign
} from 'tweetnacl';
import {
  Status
} from 'oak/mod.ts';
import * as events from '../events/mod.js';

export const path = "/interaction";
export const method = "POST";
  
export async function execute(ctx) {
  const branch = ctx.request.url.host.includes('--') ? ctx.request.url.host.split('--')[1].split('.deno.dev')[0].toUpperCase() : 'PROD';
    
  const body = await ctx.request.body({ type: 'text' }).value;
  const timestamp = ctx.request.headers.get('x-signature-timestamp');
  const signature = ctx.request.headers.get('x-signature-ed25519');
    
  const valid = await sign.detached.verify(
    new TextEncoder().encode(timestamp + body),
    hexEncode(signature),
    hexEncode(Deno.env.get(`${branch}_PUBLIC_KEY`))
  );
  if (!valid) {
    ctx.response.body = 'Invalid Request!';
    ctx.response.status = Status.Unauthorized;
  } else {
    const interaction = JSON.parse(body);
    const event = Object.values(events).find(evt => evt.type === interaction.type);
    if (event) return await event.execute({ ctx, branch, interaction });
  }
};

function hexEncode(hex) {
  return new Uint8Array(
    hex.match(/.{1,2}/g)
      .map(ctx => parseInt(ctx, 16))
  )
}
