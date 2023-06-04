import { discord } from './deps.js';

export default {
  type: discord.InteractionType.Ping,
  async execute({ ctx }) {
    ctx.response.body = {
      type: discord.InteractionResponseType.Pong,
    };
  }
};
