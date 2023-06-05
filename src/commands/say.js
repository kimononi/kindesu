import { discord } from '../deps.js';

export default {
  data: {
    name: 'say',
    description: '🍥゛Kirim pesan sebagai bot.',
    type: discord.ApplicationCommandType.ChatInput,
    dm_permission: false,
    default_member_permissions: (discord.PermissionFlagsBits.Administrator).toString(),
    options: [{
      name: 'content',
      description: '🍥゛Kamu teh mau bilang apa?',
      type: discord.ApplicationCommandOptionType.String,
      required: true,
      autocomplete: true
    }]
  },
  async execute({ ctx, interaction, branch }) {
    if (interaction.type === discord.InteractionType.ApplicationCommandAutocomplete) {
      ctx.response.body = {
        type: discord.InteractionResponseType.ApplicationCommandAutocompleteResult,
        data: { choices: [] }
      };
    } else {
      
    }
  }
}
