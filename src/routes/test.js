import { discord } from '../deps.js';
import * as rawConfig from '../config.js';

export default {
  method: 'GET',
  path: '/test',
  async execute(ctx) {
    const isAllowed = await ctx.cookies.has('allowed');
    if (!isAllowed) return ctx.response.redirect('/');
    
    const branch = ctx.request.url.host.includes('--') ? ctx.request.url.host.split('--')[1].split('.deno.dev')[0].toUpperCase() : 'PROD';
    const config = rawConfig[branch];

    const testRequest = await fetch(discord.RouteBases.api + discord.Routes.channelMessages(config.verificationChannel), {
      method: 'POST',
      headers: {
        Authorization: `Bot ${Deno.env.get(`${branch}_TOKEN`)}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        content: `## Verifikasi! <:hutao_hug:1115203254771535903>\n** **\n> Sebelum verifikasi, pastikan kamu udah baca\n> <#969506184199540796> disini dan siap menerima hukuman apabila kamu melanggar peraturan\n** **\n* Saat verifikasi, kamu akan diberikan 3 buah pertanyaan, jika kamu berhasil maka kamu akan lolos dan bisa bergabung ke server ini, good luck🤞`,
        components: [{
          type: discord.ComponentType.ActionRow,
          components: [{
            type: discord.ComponentType.Button,
            custom_id: 'verification',
            label: 'Hajimeru~',
            style: discord.ButtonStyle.Secondary,
            emoji: { animated: true, id: '1115209084434649118', name: 'catto' }
          }]
        }]
      })
    });
    const testResult = await testRequest.json();

    ctx.response.body = JSON.stringify(testResult, null, '  ');
  }
}