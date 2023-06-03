import { nacl, oak } from '../deps.js';

export default {
  path: "/interaction",
  method: "POST",
  async execute(ctx) {
    const valid = await nacl.sign.detached.verify(
      
    );
  }
};

function hexEncode(hex) {
  return new Uint8Array(
    hex.match(/.{1,2}/g)
      .map(ctx => parseInt(ctx, 16))
  )
}
