import { nacl, oak } from '../deps.js';
import * as events from '../events/mod.js';

export default {
  path: "/interaction",
  method: "POST",
  async execute(ctx) {
    console.log(nacl);
    const branch = ctx.request.url.host.includes('--') ? ctx.request.url.host.split('--')[1].split('.deno.dev')[0].toUpperCase() : 'PROD';
    
    const body = await ctx.request.body({ type: 'text' }).value;
    const timestamp = ctx.request.headers.get('x-signature-timestamp');
    const signature = ctx.request.headers.get('x-signature-ed25519');
    
    const valid = await nacl.sign.detached.verify(
      new TextEncoder().encode(timestamp + body),
      hexEncode(signature),
      hexEncode(Deno.env.get(`${branch}_PUBLIC_KEY`))
    );
    console.log(valid);
    if (!valid) {
      ctx.response.body = 'Invalid Request!';
      ctx.response.status = oak.Status.Unauthorized;
    } else {
      const interaction = JSON.parse(body);
      const event = Object.values(events).find(evt => evt.default.type === interaction.type);
      console.log(event);
      if (event) return await event.default.execute({ ctx, branch, interaction });
    }
  }
};

function hexEncode(hex) {
  return new Uint8Array(
    hex.match(/.{1,2}/g)
      .map(ctx => parseInt(ctx, 16))
  )
}
