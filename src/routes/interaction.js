import { nacl, oak } from '../deps.js';

export default {
  path: "/interaction/:publicKey/:token",
  method: "POST",
  async execute(ctx) {
    const body = await ctx.request.body({ type: 'text' }).value;
    const timestamp = ctx.request.headers.get('x-signature-timestamp');
    const signature = ctx.request.headers.get('x-signature-ed25519');
    
    const valid = await nacl.sign.detached.verify(
      new TextEncoder().encode(timestamp + body),
      hexEncode(signature),
      hexEncode(ctx.params.publicKey);
    );
    
    if (!valid) {
      ctx.response.body = 'Invalid Request!';
      ctx.response.status = oak.Status.Unauthorized;
    } else {
      for await (const file of Deno.readDir(Deno.cwd() + '/src/events')) {
        const event = await import('../events/${file.name}`);
        const interaction = JSON.parse(body);
        
        if (event.type === interaction.type) return await event.execute(ctx);
      }
    }
  }
};

function hexEncode(hex) {
  return new Uint8Array(
    hex.match(/.{1,2}/g)
      .map(ctx => parseInt(ctx, 16))
  )
}
