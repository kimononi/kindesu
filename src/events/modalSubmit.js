import { InteractionType } from 'discord_api_types/v10.ts';
import * as modals from '../modals/mod.js';

export const type = InteractionType.ModalSubmit;

export async function execute({ ctx, interaction, branch }) {
  const modal = Object.values(modals).find(modal => modal.custom_id === interaction.data.custom_id);
  if (modal) return await modal.execute({ ctx, interaction, branch });
};
