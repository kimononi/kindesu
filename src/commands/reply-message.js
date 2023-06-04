import { discord } from '../deps.js';

export default {
  data: {
    name: 'reply-message',
    description: '',
    type: discord.ApplicationCommandType.Message,
    dm_permission: false,
    default_member_permissions: discord.PermissionFlagsBits.Administrator
  },
  async execute({ ctx, interaction, branch }) {
    
  }
};
