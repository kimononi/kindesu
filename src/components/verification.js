import { InteractionResponseType } from "discord_api_types/v10.ts";

export const custom_id = "verification";

export async function execute({ ctx, branch, interaction }) {
  const formData = await fetch("https://iciepex-nori-quiz.deno.dev/")
};
