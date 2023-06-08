import { InteractionType } from 'discord_api_types/v10.ts';
import * as commands from '../commands/mod.js';

export const type = InteractionType.ApplicationCommand;
  
export async function execute({ ctx, interaction, branch }) {
  const command = Object.values(commands).find(cmd => cmd.data.name === interaction.data.name && cmd.data.type === interaction.data.type);
  if (command) return await command.execute({ ctx, interaction, branch });
};
