import {
  ApplicationCommandType,
  ComponentType,
  InteractionResponseType,
  PermissionFlagsBits,
  TextInputStyle
} from "discord_api_types/v10.ts";

export const data = {
  name: 'reply-message',
  description: '',
  type: ApplicationCommandType.Message,
  dm_permission: false,
  default_member_permissions: (PermissionFlagsBits.Administrator).toString()
};
  
export async function execute({ ctx, interaction, branch }) {
  const [targetId, target] = Object.entries(interaction.data.resolved.messages)[0];
    
  ctx.response.body = {
    type: InteractionResponseType.Modal,
    data: {
      title: '🍥゛Bales pesan (⁠*⁠´⁠ω⁠｀⁠*⁠)',
      custom_id: 'reply_message',
      components: [
        {
          type: ComponentType.ActionRow,
          components: [
            {
              type: ComponentType.TextInput,
              custom_id: targetId,
              label: `⌗  Bales pesan ny ${target.author.username} (⁠*⁠´⁠ω⁠｀⁠*⁠)`,
              placeholder: 'halo~',
              style: TextInputStyle.Paragraph
            }
          ]
        }
      ]
    }
  };
};
