import { InteractionType } from 'discord_api_types/v10.ts';
import * as components from '../components/mod.js';

export const type = InteractionType.MessageComponent;
  
export async function execute({ ctx, interaction, branch }) {
  const component = Object.values(components).find(component => component.custom_id === interaction.data.custom_id && component.type === interaction.data.type);
  if (component) return await component.execute({ ctx, interaction, branch });
};
