import { discord } from '../deps.js';

export default {
  data: {
    name: 'reply-message',
    description: '',
    type: discord.ApplicationCommandType.Message,
    dm_permission: false,
    default_member_permissions: (discord.PermissionFlagsBits.Administrator).toString()
  },
  async execute({ ctx, interaction, branch }) {
    const [targetId, target] = Object.entries(interaction.data.resolved.messages)[0];
    
    ctx.response.body = {
      type: discord.InteractionResponseType.Modal,
      data: {
        title: '🍥゛Bales pesan (⁠*⁠´⁠ω⁠｀⁠*⁠)',
        custom_id: 'reply_message',
        components: [
          {
            type: discord.ComponentType.ActionRow,
            components: [
              {
                type: discord.ComponentType.TextInput,
                custom_id: 'content',
                label: `⌗  Bales pesan ny ${target.author.username} (⁠*⁠´⁠ω⁠｀⁠*⁠)`,
                placeholder: 'halo~',
                style: discord.TextInputStyle.Paragraph
              }
            ]
          }
        ]
      }
    };
  }
};
