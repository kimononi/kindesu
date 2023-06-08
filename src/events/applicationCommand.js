import { InteractionType } from 'discord_api_types/v10.ts';
import * as commands from '../commands/mod.js';

export default {
  type: InteractionType.ApplicationCommand,
  async execute({ ctx, interaction, branch }) {
    const command = Object.values(commands).find(cmd => cmd.default.data.name === interaction.data.name && cmd.default.data.type === interaction.data.type);
    if (command) return await command.default.execute({ ctx, interaction, branch });
  }
}
