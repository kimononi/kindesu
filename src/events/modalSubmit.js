import { discord } from '../deps.js';
import * as modals from '../modals/mod.js';

export default {
  type: discord.InteractionType.ModalSubmit,
  async execute({ ctx, interaction, branch }) {
    const modal = Object.values(modals).find(modal => modal.default.custom_id === interaction.data.custom_id);
    if (modal) return await modal.default.execute({ ctx, interaction, branch });
  }
}
