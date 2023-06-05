import { discord } from '../deps.js';

export default {
  data: {
    name: 'say',
    description: '🍥゛Kirim pesan sebagai bot.',
    type: discord.ApplicationCommandType.ChatInput,
    dm_permission: false,
    default_member_permissions: (discord.PermissionFlagsBits.Administrator).toString()
  },
  async execute({ ctx, interaction, branch }) {
    
  }
}
