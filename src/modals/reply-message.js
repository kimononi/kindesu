import { discord } from '../deps.js';

export default {
  custom_id: 'reply_message',
  async execute({ ctx, interaction, branch }) {
    const input = interaction.data.components[0].components[0];
    
    const replyRequest = await fetch(discord.RouteBases.api + discord.Routes.channelMessages(interaction.channel_id), {
      method: 'POST',
      headers: {
        Authorization: `Bot ${Deno.env.get(`${branch}_TOKEN`)}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        content: input.value,
        message_reference: { guild_id: interaction.guild_id, message_id: input.custom_id }
      })
    });
    const replyResult = await replyRequest.json();
    
    ctx.response.body = {
      type: discord.InteractionResponseType.ChannelMessageWithSource,
      data: {
        content: `🦦゛Pesan dibalas! Output ada dibawah:\n\`\`\`js\n${JSON.stringify(replyResult, null, ' ')}\`\`\``
      }
    }
  }
};