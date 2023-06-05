import { discord } from '../deps.js';
import * as commands from '../commands/mod.js';

export default {
  type: discord.InteractionType.ApplicationCommandAutocomplete,
  async execute({ ctx, interaction, branch }) {
    const command = Object.values(commands).find(cmd => cmd.default.data.name === interaction.data.name && cmd.default.data.type === discord.ApplicationCommandType.ChatInput);
    if (command) return await command.default.execute({ ctx, interaction, branch });
  }
}
