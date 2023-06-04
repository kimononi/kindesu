import { nacl, oak } from '../deps.js';

export default {
  path: "/interaction",
  method: "POST",
  async execute({ ctx, branch }) {
    const body = await ctx.request.body({ type: 'text' }).value;
    const timestamp = ctx.request.headers.get('x-signature-timestamp');
    const signature = ctx.request.headers.get('x-signature-ed25519');
    
    const valid = await nacl.sign.detached.verify(
      new TextEncoder().encode(timestamp + body),
      hexEncode(signature),
      hexEncode(Deno.env.get(`${branch}_PUBLIC_KEY`));
    );
    
    if (!valid) {
      ctx.response.body = 'Invalid Request!';
      ctx.response.status = oak.Status.Unauthorized;
    } else {
      
    }
  }
};

function hexEncode(hex) {
  return new Uint8Array(
    hex.match(/.{1,2}/g)
      .map(ctx => parseInt(ctx, 16))
  )
}
