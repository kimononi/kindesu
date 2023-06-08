import {
  InteractionType,
  InteractionResponseType
} from 'discord_api_types/v10.ts';

export default {
  type: InteractionType.Ping,
  async execute({ ctx }) {
    ctx.response.body = {
      type: InteractionResponseType.Pong,
    };
  }
};
