import { discord } from '../deps.js';

export default {
  data: {
    name: 'reply-message',
    description: '',
    type: discord.ApplicationCommandType.Message,
    default_member_permissions: discord.PermissionFlagsBits.Administrator
  },
  async execute({ ctx, interaction, branch }) {
    
  }
};
