import {
  InteractionType,
  InteractionResponseType
} from 'discord_api_types/v10.ts';

export const type = InteractionType.Ping;

export async function execute({ ctx }) {
  ctx.response.body = {
    type: InteractionResponseType.Pong,
  };
};
