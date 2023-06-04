import { discord ) from '../deps.js';
import * as commands from '../commands/mod.js';

export default {
  method: 'GET',
  path: '/deploy',
  async execute(ctx) {
    const isAllowed = await ctx.cookies.has('allowed');
    
  }
}
